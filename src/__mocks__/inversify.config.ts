import { Container } from "inversify";
import IAuthService from "../services/IAuthService";
import TYPES from "../services/types";
import AuthService from "../services/AuthService";
import IPersistentStorage from "../services/IPersistentStorage";

const persistentServiceMock: IPersistentStorage = {
  get: (key) => {
    switch (key) {
      case AuthService.AUTH_KEYS.token:
        return "123";
      case AuthService.AUTH_KEYS.username:
        return "test";
      case AuthService.AUTH_KEYS.email:
        return "test@email.com";
      default:
    }
  },
  remove: jest.fn(),
  set: jest.fn(),
};

const authServiceMock: IAuthService = {
  getAuthData: () => ({
    username: "test",
    token: "123",
    email: "test@email.com",
  }),
  login: jest.fn(),
  logout: jest.fn(),
};

const container = new Container();

// infra block
container
  .bind<IAuthService>(TYPES.AuthService)
  .toConstantValue(authServiceMock);
// .inSingletonScope();
container
  .bind<IPersistentStorage>(TYPES.PersistentService)
  .toConstantValue(persistentServiceMock);
// .inSingletonScope();
// container.bind<IRequestService>(TYPES.RequestService).to(RequestService);
// .inSingletonScope();
// container.bind<IHttpService>(TYPES.HttpService).toConstantValue(axios);

export default container;
