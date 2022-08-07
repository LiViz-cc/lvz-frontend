/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { userConstants } from '../types';
import { login, signup } from '../../api/auth';
import { alertActions } from './alertActions';

export const userActions = {
  login,
  register,
};

function loginRedux(username: string, password: string) {
  return (dispatch: any) => {
    dispatch(request({ username }));

    login(username, password)
      .then(
        (user) => {
          dispatch(success(user));
        },
        (error) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request(user: any) { return { type: userConstants.LOGIN_REQUEST, user }; }
  function success(user: any) { return { type: userConstants.LOGIN_SUCCESS, user }; }
  function failure(error: any) { return { type: userConstants.LOGIN_FAILURE, error }; }
}

/* function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
} */

function register(user: string, password: string) {
  return (dispatch:any) => {
    dispatch(request(user));

    signup(user, password)
      .then(
        (user: any) => {
          dispatch(success(user));
          dispatch(alertActions.success('Registration successful'));
        },
        (error: any) => {
          dispatch(failure(error.toString()));
          dispatch(alertActions.error(error.toString()));
        },
      );
  };

  function request(user: string) { return { type: userConstants.REGISTER_REQUEST, user }; }
  function success(user: string) { return { type: userConstants.REGISTER_SUCCESS, user }; }
  function failure(error: any) { return { type: userConstants.REGISTER_FAILURE, error }; }
}

/* function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService.getAll()
      .then(
        (users: any) => dispatch(success(users)),
        (error: any) => dispatch(failure(error.toString())),
      );
  };

  function request() { return { type: userConstants.GETALL_REQUEST }; }
  function success(users: any) { return { type: userConstants.GETALL_SUCCESS, users }; }
  function failure(error: any) { return { type: userConstants.GETALL_FAILURE, error }; }
} */

// prefixed function name with underscore because delete is a reserved word in javascript
/* function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id)
      .then(
        (user) => dispatch(success(id)),
        (error) => dispatch(failure(id, error.toString())),
      );
  };

  function request(id) { return { type: userConstants.DELETE_REQUEST, id }; }
  function success(id) { return { type: userConstants.DELETE_SUCCESS, id }; }
  function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error }; }
} */
