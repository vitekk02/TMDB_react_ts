import React, {
  FunctionComponent, memo, PropsWithChildren, useMemo,
} from 'react';

import { LoggedInUserContext, LoggedInUserContextProps } from '../../utils/logged-in-user-context';

const LoggedInUserProviderBase: FunctionComponent<PropsWithChildren<LoggedInUserContextProps>> = (props) => {
  const { setUser, user, children } = props;

  const value: LoggedInUserContextProps = useMemo(() => ({
    user,
    setUser,
  }), [setUser, user]);

  return (
    <LoggedInUserContext.Provider value={value}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export const LoggedInUserProvider = memo(LoggedInUserProviderBase);
