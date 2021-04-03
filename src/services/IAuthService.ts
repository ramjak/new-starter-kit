export type onTokenChangeType = (token: string) => any;
export default interface IAuthService {
  onTokenChange: onTokenChangeType;
  deleteToken(): void;
  getToken(): string;
  refreshToken(): void;
  saveToken(token: string): void;
}
