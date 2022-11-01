import React, {
  FunctionComponent, memo, useCallback, useContext, useEffect, useState,
} from 'react';

import { Loader } from '../../layout';
import { LoginForm } from '../components/login-form';
import {
  authenticateUser, createNewToken, getSessionId, getUser,
} from '../model/api';
import { UserBase } from '../types/userBase';
import { LoggedInUserContext } from '../utils/logged-in-user-context';

const LoginBase: FunctionComponent = () => {
  const { setUser } = useContext(LoggedInUserContext);

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = useCallback((login: UserBase) => {
    setLoading(true);
    createNewToken().then((data) => {
      const newLogin = login;
      newLogin.request_token = data.request_token;
      authenticateUser(login).then((data2) => {
        setSessionId(data2);
      });
    });
  }, []);
  useEffect(() => {
    if (sessionId !== null) {
      const test = getSessionId(sessionId);
      test.then((result) => {
        localStorage.setItem('userId', result);
        getUser().then((data) => {
          if (setUser !== null) {
            setUser(data);
            setLoading(false);
          }
        });
      });
    }
  }, [sessionId, setUser]);
  if (loading) {
    return (
      <Loader withoutChildren loading />
    );
  }
  return (
    <LoginForm onSubmit={onSubmit} />
  );
};

export const Login = memo(LoginBase);
