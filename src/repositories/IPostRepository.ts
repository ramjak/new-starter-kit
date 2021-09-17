import IPost, { IRawPost } from "../domains/post";

export default interface IPostRepository {
  store(payload: IRawPost): Promise<unknown>;
  read(id: string): Promise<IPost>;
  update(payload: IRawPost, id: string): Promise<unknown>;
  delete(id: string): Promise<unknown>;
  getAll(): Promise<IPost[]>;
}
