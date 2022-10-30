import axios from 'axios';

import { apiKey } from '../../consts';
import { User } from '../types/user';
import { UserBase } from '../types/userBase';

const CREATE_TOKEN_URL = `https://api.themoviedb.org/3/authentication/token/new${apiKey}`;
const AUTH_URL = `https://api.themoviedb.org/3/authentication/token/validate_with_login${apiKey}`;
const GET_SESSION_ID = `https://api.themoviedb.org/3/authentication/session/new${apiKey}`;
const GET_USER_DETAIL = `https://api.themoviedb.org/3/account${apiKey}`;

export const getUser = async (): Promise<User> => {
  const userStr = localStorage.getItem('userId');
  if (userStr === null) {
    throw new Error('User is not stored in storage');
  }
  const response = await axios.get(`${GET_USER_DETAIL}&session_id=${userStr}`);

  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Couldnt get user information');
};

export const createNewToken = async () => {
  const response = await axios.get(CREATE_TOKEN_URL);

  return response.data;
};

export const authenticateUser = async (user: UserBase): Promise<string> => {
  const response = await axios.post(AUTH_URL, user);

  if (response.data.success === true) {
    return response.data.request_token;
  }
  throw new Error('Could not authenticate user');
};

export const getSessionId = async (requestToken: string): Promise<string> => {
  const response = await axios.post(GET_SESSION_ID, {
    request_token: requestToken,
  });
  if (response.data.success === true) {
    return response.data.session_id;
  }
  throw new Error('Could not get session ID');
};
