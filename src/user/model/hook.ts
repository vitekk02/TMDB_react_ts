import { useQuery } from 'react-query';

import { User } from '../types/user';
import { getUser } from './api';

export const useGetUserInfo = () => useQuery<User, Error>(
  'user',
  getUser,
  { staleTime: 30000 },
);
