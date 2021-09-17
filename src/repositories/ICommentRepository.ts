import IComment, { IRawComment } from "../domains/comment";

export default interface ICommentRepository {
  store(postId: string, payload: IRawComment): Promise<unknown>;
  read(postId: string, id: string): Promise<IComment>;
  update(postId: string, payload: IRawComment, id: string): Promise<unknown>;
  delete(postId: string, id: string): Promise<unknown>;
  getAll(postId: string): Promise<IComment[]>;
}
