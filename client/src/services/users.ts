import axios from 'axios';
import backendUrl from '../backendUrl';
import storage from '../utils/localStorage';

const baseUrl = `${backendUrl}/users`;
const token = storage.loadUser()?.token;

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
