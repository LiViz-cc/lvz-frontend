import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { get, post } from './fetcher';
import { ResponseError } from './error';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type User = {
  id: string;
  email: string;
  createdTime: number;
  modifiedTime: number;
  username: string;
};

export function useUser(id: string) {
  return useSWR<User, ResponseError>(`${BACKEND_URL}/users/${id}`, get);
}

export type UserChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export function useUserChangePassword(id: string) {
  const { trigger, ...rest } = useSWRMutation<
    User,
    ResponseError,
    string,
    UserChangePasswordRequest
  >(`${BACKEND_URL}/users/${id}/password`, post);

  return {
    userChangePassword: async (oldPassword: string, newPassword: string) => {
      await trigger({ oldPassword, newPassword });
    },
    ...rest,
  };
}

export type UserChangeUsernameRequest = {
  username: string;
  password: string;
};

export function useUserChangeUsername(id: string) {
  const { trigger, ...rest } = useSWRMutation<
    User,
    ResponseError,
    string,
    UserChangeUsernameRequest
  >(`${BACKEND_URL}/users/${id}/username`, post);

  return {
    userChangePassword: async (username: string, password: string) => {
      await trigger({ username, password });
    },
    ...rest,
  };
}

export type UserAuthenticateRequest = {
  username: string;
  password: string;
  email: string;
};

export function useUserAuthenticate(id: string) {
  const { trigger, ...rest } = useSWRMutation<
    User,
    ResponseError,
    string,
    UserAuthenticateRequest
  >(`${BACKEND_URL}/users/${id}/username`, post);

  return {
    userAuthenticate: async (
      username: string,
      password: string,
      email: string
    ) => {
      await trigger({ username, password, email });
    },
    ...rest,
  };
}
