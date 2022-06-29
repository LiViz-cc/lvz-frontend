import React from 'react';

import { useAppSelector, useAppDispatch } from '../../utils/hooks';

import { login } from './userSlice';

export function User() {
  // The `state` arg is correctly typed as `RootState` already
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // omit rendering logic
}
