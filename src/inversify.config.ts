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
import GraphQLService from "./services/GraphQLService";
import IGraphQLService from "./services/IGraphQLService";
import IPostRepository from "./repositories/IPostRepository";
import PostRepository from "./repositories/PostRepository";
import CommentRepository from "./repositories/CommentRepository";
import ICommentRepository from "./repositories/ICommentRepository";
import IUserRepository from "./repositories/IUserRepository";
import UserRepository from "./repositories/UserRepository";
import AdminRepository from "./repositories/AdminRepository";
import IAdminRepository from "./repositories/IAdminRepository";
import IFirebaseService from "./services/IFirebaseService";
import FirebaseService from "./services/FirebaseService";

const container = new Container();

// infra block
container.bind<IAuthService>(TYPES.AuthService).to(AuthService);
container
  .bind<IPersistentStorage>(TYPES.PersistentService)
  .toConstantValue(esCookie);
container.bind<IRequestService>(TYPES.RequestService).to(RequestService);
container
  .bind<IFirebaseService>(TYPES.FirebaseService)
  .to(FirebaseService)
  .inSingletonScope();
container.bind<IHttpService>(TYPES.HttpService).toConstantValue(axios);
container
  .bind<IGraphQLService>(TYPES.GraphQLService)
  .to(GraphQLService)
  .inSingletonScope();

// repository block
container.bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);
container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<IAdminRepository>(TYPES.AdminRepository).to(AdminRepository);
container
  .bind<ICommentRepository>(TYPES.CommentRepository)
  .to(CommentRepository);

export default container;
