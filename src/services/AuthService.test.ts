import "reflect-metadata";
import container from "../__mocks__/inversify.config";
import IPersistentStorage from "./IPersistentStorage";
import TYPES from "./types";
import IAuthService from "./IAuthService";
import AuthService from "./AuthService";

describe("AuthService", () => {
  container.unbind(TYPES.AuthService);
  container.bind<IAuthService>(TYPES.AuthService).to(AuthService);

  const authService = container.get<IAuthService>(TYPES.AuthService);
  const persistentServiceMock = container.get<IPersistentStorage>(
    TYPES.PersistentService
  );

  it("save token with correct option on login", async () => {
    const authData = {
      username: "test",
      token: "123",
      email: "test@email.com",
    };
    await authService.login(authData);
    expect(persistentServiceMock.set).toHaveBeenCalledWith(
      AuthService.AUTH_KEYS.token,
      authData.token,
      { expires: AuthService.DAY_AFTER_EXPIRED }
    );
    expect(persistentServiceMock.set).toHaveBeenCalledWith(
      AuthService.AUTH_KEYS.username,
      authData.username,
      { expires: AuthService.DAY_AFTER_EXPIRED }
    );
    expect(persistentServiceMock.set).toHaveBeenCalledWith(
      AuthService.AUTH_KEYS.email,
      authData.email,
      { expires: AuthService.DAY_AFTER_EXPIRED }
    );
  });

  it("destroy any auth data on logout", async () => {
    await authService.logout();
    expect(persistentServiceMock.remove).toHaveBeenCalledWith(
      AuthService.AUTH_KEYS.token
    );
    expect(persistentServiceMock.remove).toHaveBeenCalledWith(
      AuthService.AUTH_KEYS.username
    );
    expect(persistentServiceMock.remove).toHaveBeenCalledWith(
      AuthService.AUTH_KEYS.email
    );
  });

  it("can get auth data", () => {
    const result = authService.getAuthData();
    expect(result).toEqual({
      username: "test",
      token: "123",
      email: "test@email.com",
    });
  });
});
