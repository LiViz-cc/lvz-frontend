import getServer from './getServer';
import type { LoginResponseRaw, UserRaw } from '../models';
import { polishLoginResponseRaw, polishUserRaw } from '../models';

export const login = (email: string, password: string) => getServer()
  .post<LoginResponseRaw>('/auth/login', { email, password })
  .then((response) => {
    const loginResponseRaw = response.data;
    const loginResponse = polishLoginResponseRaw(loginResponseRaw);
    return { data: loginResponse, response };
  });

export const signup = (email: string, password: string) => getServer()
  .post<UserRaw>('/auth/signin', { email, password })
  .then((response) => {
    const userRaw = response.data;
    const user = polishUserRaw(userRaw);
    return { data: user, response };
  });
