/* eslint-disable @typescript-eslint/no-use-before-define */
import { alertConstants } from '../types';

export const alertActions = {
  success,
  error,
  clear,
};

function success(message:any) {
  return { type: alertConstants.SUCCESS, message };
}

function error(message:any) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}
