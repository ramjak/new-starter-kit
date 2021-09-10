import { Container } from "inversify";
import * as esCookie from "es-cookie";
import axios from "axios";
import AuthService from "./services/AuthService";
import IAuthService from "./services/IAuthService";
import TYPES from "./services/types";
import IPersistentStorage from "./services/IPersistentStorage";
import IRequestService from "./services/IRequestService";
import RequestService from "./services/RequestService";
import IHttpService from "./services/IHttpService";

const container = new Container();

// infra block
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
// .inSingletonScope();
container
  .bind<IPersistentStorage>(TYPES.PersistentService)
  .toConstantValue(esCookie);
// .inSingletonScope();
container.bind<IRequestService>(TYPES.RequestService).to(RequestService);
// .inSingletonScope();
container.bind<IHttpService>(TYPES.HttpService).toConstantValue(axios);

export default container;
