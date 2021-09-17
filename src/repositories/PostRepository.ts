import { inject, injectable } from "inversify";
import IPost, { IRawPost } from "../domains/post";
import TYPES from "../services/types";
import IRequestService from "../services/IRequestService";
import IPostRepository from "./IPostRepository";

@injectable()
export default class PostRepository implements IPostRepository {
  @inject(TYPES.RequestService)
  private readonly requestService: IRequestService;

  public delete(id: string): Promise<unknown> {
    return this.requestService.delete(`/posts/${id}`);
  }

  public getAll(): Promise<IPost[]> {
    return this.requestService.get<IPost[]>("/posts");
  }

  public read(id: string): Promise<IPost> {
    return this.requestService.get<IPost>(`/posts/${id}`);
  }

  public store(payload: IRawPost): Promise<unknown> {
    return this.requestService.post("/posts", payload);
  }

  public update(payload: IRawPost, id: string): Promise<unknown> {
    return this.requestService.put(`/posts/${id}`, payload);
  }
}
