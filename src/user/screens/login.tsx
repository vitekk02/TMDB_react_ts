import React, {
  FunctionComponent, memo, useCallback, useContext, useEffect, useState,
} from 'react';

import { LoginForm } from '../components/login-form';
import {
  authenticateUser, createNewToken, getSessionId, getUser,
} from '../model/api';
import { UserBase } from '../types/userBase';
import { LoggedInUserContext } from '../utils/logged-in-user-context';

const LoginBase: FunctionComponent = () => {
  const { setUser } = useContext(LoggedInUserContext);

  const token = createNewToken();
  const [sessionId, setSessionId] = useState<string | null>(null);

  const onSubmit = useCallback((login: UserBase) => {
    token.then((data) => {
      const newLogin = login;
      newLogin.request_token = data.request_token;
      authenticateUser(login).then((data2) => {
        console.log(data2);
        setSessionId(data2);
      });
    });
  }, [token]);
  useEffect(() => {
    if (sessionId !== null) {
      console.log(sessionId);
      const test = getSessionId(sessionId);
      test.then((result) => {
        localStorage.setItem('userId', result);
        getUser().then((data) => {
          if (setUser !== null) {
            setUser(data);
            console.log('1');
          }
        });
      });
    }
  }, [sessionId, setUser]);
  return (
    <LoginForm onSubmit={onSubmit} />
  );
};

export const Login = memo(LoginBase);
