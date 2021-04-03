import cookieService from './CookieService';
import AuthService from './AuthService';
import IAuthService from './IAuthService';
import IPersistentStorage from './IPersistentStorage';
import IRequestService from './IRequestService';
import RequestService from './RequestService';

export interface IServices {
  getCookieService: () => IPersistentStorage;
  getAuthService: () => IAuthService;
  getRequestService: () => IRequestService;
}

// todo: change this into singleton
function makeServices(): IServices {
  let authService: IAuthService;
  let requestService: IRequestService;

  const getCookieService = () => {
    return cookieService;
  };

  const getAuthService = () => {
    if (!authService) {
      authService = new AuthService(getCookieService());
    }
    return authService;
  };

  const getRequestService = () => {
    if (!requestService) {
      requestService = new RequestService(getAuthService());
    }
    return requestService;
  };

  return {
    getCookieService,
    getAuthService,
    getRequestService,
  };
}

export default makeServices;
