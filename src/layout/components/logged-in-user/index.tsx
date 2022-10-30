import { Button } from 'antd';
import React, {
  FunctionComponent, memo, useCallback, useContext,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { LoggedInUserContext } from '../../../user/utils/logged-in-user-context';
import './styles.scss';

const LoggedInUserBase: FunctionComponent = () => {
  const { user, setUser } = useContext(LoggedInUserContext);
  const navigate = useNavigate();

  const goToLogin = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const logoutUser = useCallback(() => {
    if (setUser) {
      setUser(null);
      localStorage.removeItem('userId');
      goToLogin();
    }
  }, [goToLogin, setUser]);

  const watchlist = useCallback(() => {
    navigate('/watchlist');
  }, [navigate]);

  const home = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <div className="loggedInUser">
      {user ? (
        <>
          <div className="d-inline-block">
            {user.username}
          </div>
          <div className="d-inline-block px-2">
            <Button onClick={logoutUser}>Logout</Button>
          </div>
          <div className="d-inline-block px-2">
            <Button onClick={watchlist}>Watchlist</Button>
          </div>
          <div className="d-inline-block px-2">
            <Button onClick={home}>Home</Button>
          </div>
        </>
      ) : (
        <div className="px-2">
          <Button onClick={goToLogin}>Login</Button>
        </div>
      )}
    </div>
  );
};

export const LoggedInUser = memo(LoggedInUserBase);
