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
  return useSWRMutation<UserWithToken, ResponseError, string, LoginRequest>(
    `${BACKEND_URL}/auth/login`,
    post
  );
}

export type SignupRequest = {
  email: string;
  password: string;
  username: string;
};

export function useSignup() {
  return useSWRMutation<User, ResponseError, string, SignupRequest>(
    `${BACKEND_URL}/auth/signup`,
    post
  );
}

export function useCreateAnonymous() {
  return useSWRMutation<UserWithToken, ResponseError, string>(
    `${BACKEND_URL}/auth/create_anonymous`,
    post
  );
}
