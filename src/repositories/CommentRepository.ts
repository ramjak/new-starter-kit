import { inject, injectable } from "inversify";
import TYPES from "../services/types";
import IRequestService from "../services/IRequestService";
import ICommentRepository from "./ICommentRepository";
import IComment, { IRawComment } from "../domains/comment";

@injectable()
export default class CommentRepository implements ICommentRepository {
  @inject(TYPES.RequestService)
  private readonly requestService: IRequestService;

  public delete(postId: string, id: string): Promise<unknown> {
    return this.requestService.delete(`/posts/${postId}/comments/${id}`);
  }

  public getAll(postId: string): Promise<IComment[]> {
    return this.requestService.get(`/posts/${postId}/comments`);
  }

  public read(postId: string, id: string): Promise<IComment> {
    return this.requestService.get(`/posts/${postId}/comments/${id}`);
  }

  public store(postId: string, payload: IRawComment): Promise<unknown> {
    return this.requestService.post(`/posts/${postId}/comments`, payload);
  }

  public update(
    postId: string,
    payload: IRawComment,
    id: string
  ): Promise<unknown> {
    return this.requestService.put(`/posts/${postId}/comments/${id}`, payload);
  }
}
