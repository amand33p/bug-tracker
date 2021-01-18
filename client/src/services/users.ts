import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';

const baseUrl = `${backendUrl}/users`;

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getUsers = async () => {
  const response = await axios.get(baseUrl, setConfig());
  return response.data;
};

const userService = { getUsers };

export default userService;
