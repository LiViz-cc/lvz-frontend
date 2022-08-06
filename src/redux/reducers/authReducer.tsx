import { userConstants } from '../types';

const user: string = JSON.parse(localStorage.getItem('user') ?? '') ?? '';
const initialState = user ? { loggedIn: true, user } : { loggedIn: false };

export function authentication(action: any, state = initialState) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
