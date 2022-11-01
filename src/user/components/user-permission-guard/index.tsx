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

  const {
    data, isLoading,
  } = useGetUserInfo();

  useEffect(() => {
    setUser(data || null);
  }, [data]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (!isUserLoggenIn && !isLoginScreen) {
      navigate(LOGIN_PATHNAME);
    }
    if (isUserLoggenIn && isLoginScreen) {
      navigate(HOME_PATH);
    }
    // eslint-disable-next-line
  }, [isUserLoggenIn, navigate, isLoginScreen]);

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
