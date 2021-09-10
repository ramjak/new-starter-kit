import { IUser } from "../contexts/UserContext";

export default interface IAuthService {
  isLoading: boolean;
  errorMessage: string;
  login(authData: IUser): Promise<void>;
  getAuthData(): IUser | null;
  logout(): Promise<void>;
}
