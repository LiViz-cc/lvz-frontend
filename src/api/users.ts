import type { AxiosResponse } from 'axios';
import getServer from './getServer';
import type { UserRaw, ObjectId, User } from '../models';
import { polishUserRaw } from '../models';

export const getUserById = (id: ObjectId) => getServer()
  .get<UserRaw>(`/users/${id}`)
  .then((response) => {
    const userRaw = response.data;
    const user = polishUserRaw(userRaw);
    return { ...response, data: user } as AxiosResponse<User, any>;
  });

export const updateUserPassword = (
  id: ObjectId,
  old_password: string,
  new_password: string,
) => getServer()
  .post<UserRaw>(`/users/${id}`, { old_password, new_password })
  .then((response) => {
    const userRaw = response.data;
    const user = polishUserRaw(userRaw);
    return { ...response, data: user } as AxiosResponse<User, any>;
  });
