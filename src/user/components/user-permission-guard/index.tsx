import { isNull } from 'lodash/fp';
import React, {
  FunctionComponent, memo, PropsWithChildren, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { HOME_PATH, LOGIN_PATHNAME } from '../../../consts';
import { Loader } from '../../../layout';
import { useGetUserInfo } from '../../model';
import { User } from '../../types/user';
import { LoggedInUserProvider } from '../logged-in-user-provider';

const UserPermissionGuardBase: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const isUserLoggenIn = !isNull(user);
  const isLoginScreen = window.location.pathname === '/login';

  useEffect(() => {
    if (!isUserLoggenIn && !isLoginScreen) {
      navigate(LOGIN_PATHNAME);
    }
    if (isUserLoggenIn && isLoginScreen) {
      navigate(HOME_PATH);
    }
  }, [isUserLoggenIn, navigate, isLoginScreen]);

  const {
    data, isLoading,
  } = useGetUserInfo();

  useEffect(() => {
    setUser(data || null);
  }, [data]);

  if (isLoading) {
    return (
      <Loader loading withoutChildren message="Loading..." />
    );
  }
  return (
    <LoggedInUserProvider user={user} setUser={setUser}>
      {children}
    </LoggedInUserProvider>
  );
};

export const UserPermissionGuard = memo(UserPermissionGuardBase);
