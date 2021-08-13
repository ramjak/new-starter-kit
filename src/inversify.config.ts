import { Container } from "inversify";
import AuthService from "./services/AuthService";
import IAuthService from "./services/IAuthService";
import TYPES from "./services/types";
import IPersistentStorage from "./services/IPersistentStorage";
import CookieService from "./services/CookieService";
import IRequestService from "./services/IRequestService";
import RequestService from "./services/RequestService";

const container = new Container();

container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
// .inSingletonScope();
container.bind<IPersistentStorage>(TYPES.PersistentService).to(CookieService);
// .inSingletonScope();
container.bind<IRequestService>(TYPES.RequestService).to(RequestService);
// .inSingletonScope();

export default container;
