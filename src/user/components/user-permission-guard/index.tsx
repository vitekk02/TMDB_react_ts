import { isNull } from 'lodash/fp';
import React, {
  FunctionComponent, memo, PropsWithChildren, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { HOME_PATH } from '../../../consts';
import { Loader } from '../../../layout';
import { useGetUserInfo } from '../../model';
import { User } from '../../types/user';
import { LoggedInUserProvider } from '../logged-in-user-provider';

const UserPermissionGuardBase: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const isUserLoggenIn = !isNull(user);
  const isLoginScreen = window.location.pathname === '/';

  useEffect(() => {
    if (isUserLoggenIn && isLoginScreen) {
      navigate(HOME_PATH);
    }
  }, [isUserLoggenIn, navigate, isLoginScreen]);

  const {
    data, isError, error, isLoading,
  } = useGetUserInfo();

  useEffect(() => {
    setUser(data || null);
  }, [data]);

  if (isLoading) {
    return (
      <Loader loading withoutChildren message="Loading..." />
    );
  }
  if (isError) {
    return (
      <div>{error.message}</div>
    );
  }

  return (
    <LoggedInUserProvider user={user} setUser={setUser}>
      {children}
    </LoggedInUserProvider>
  );
};

export const UserPermissionGuard = memo(UserPermissionGuardBase);
