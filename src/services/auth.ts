import useSWRMutation from 'swr/mutation';
import { post } from './fetcher';
import { ResponseError } from './error';
import { User } from './user';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type LoginRequest = {
  email: string;
  password: string;
};

export type UserWithToken = {
  user: User;
  token: {
    jwtToken: string;
  };
};

export function useLogin() {
  const { trigger, ...rest } = useSWRMutation<
    UserWithToken,
    ResponseError,
    string,
    LoginRequest
  >(`${BACKEND_URL}/auth/login`, post);

  return {
    login: async (email: string, password: string) => {
      await trigger({ email, password });
    },
    ...rest,
  };
}

export type SignupRequest = {
  email: string;
  password: string;
  username: string;
};

export function useSignup() {
  const { trigger, ...rest } = useSWRMutation<
    User,
    ResponseError,
    string,
    SignupRequest
  >(`${BACKEND_URL}/auth/signup`, post);

  return {
    signup: async (email: string, password: string, username: string) => {
      await trigger({ email, password, username });
    },
    ...rest,
  };
}

export function useCreateAnonymous() {
  const { trigger, ...rest } = useSWRMutation<
    UserWithToken,
    ResponseError,
    string
  >(`${BACKEND_URL}/auth/create_anonymous`, post);

  return {
    createAnonymous: trigger,
    ...rest,
  };
}
