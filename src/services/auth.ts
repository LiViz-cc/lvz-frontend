import useSWRMutation from 'swr/mutation';
import { post } from './fetcher';
import { ResponseError } from './error';
import { User } from './user';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: {
    jwtToken: string;
  };
};

export function useLogin() {
  const { trigger, ...rest } = useSWRMutation<
    LoginResponse,
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

export type SignupResponse = User;

export function useSignup() {
  const { trigger, ...rest } = useSWRMutation<
    SignupResponse,
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
