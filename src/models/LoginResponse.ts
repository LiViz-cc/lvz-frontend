import type { UserRaw, User } from './User';
import { polishUserRaw } from './User';

interface LoginResponseCommon {
  token: string;
}

export interface LoginResponseRaw extends LoginResponseCommon {
  user: UserRaw;
}

export interface LoginResponse extends LoginResponseCommon {
  user: User;
}

export const polishLoginResponseRaw = (loginResponseRaw: LoginResponseRaw) => {
  const loginResponse: LoginResponse = {
    token: loginResponseRaw.token,
    user: polishUserRaw(loginResponseRaw.user),
  };
  return loginResponse;
};
