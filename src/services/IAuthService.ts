import { IUser } from "../contexts/UserContext";

export default interface IAuthService {
  login(authData: IUser): Promise<void>;
  getAuthData(): IUser | null;
  logout(): Promise<void>;
}
