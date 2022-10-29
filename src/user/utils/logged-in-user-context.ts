import { createContext } from 'react';

import { User } from '../types/user';

export interface LoggedInUserContextProps {
    user: User | null;
    setUser: ((user: User | null) => void) | null;
}

export const LoggedInUserContext = createContext<LoggedInUserContextProps>({
  user: null,
  setUser: null,
});
