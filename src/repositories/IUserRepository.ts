import IUser, { IRawUser } from "../domains/user";
import { listenerType } from "./RepositoryState";

export default interface IUserRepository {
  store(payload: IRawUser): Promise<unknown>;
  getOne(id: string): Promise<IUser>;
  update(payload: IRawUser, id: string): Promise<unknown>;
  delete(id: string): Promise<unknown>;
  getAll(page?: number, limit?: number): Promise<IUser[]>;
  subscribe(listener: listenerType<IUser>): () => void;
}
