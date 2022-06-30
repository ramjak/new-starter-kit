import IAdmin, { IRawAdmin } from "../domains/admin";
import { listenerType } from "./RepositoryState";

export default interface IAdminRepository {
  store(payload: IRawAdmin): Promise<unknown>;
  getOne(id: string): Promise<IAdmin>;
  update(payload: IRawAdmin, id: string): Promise<unknown>;
  delete(id: string): Promise<unknown>;
  getAll(page?: number, limit?: number): Promise<IAdmin[]>;
  subscribe(listener: listenerType<IAdmin>): () => void;
}
