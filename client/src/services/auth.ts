import axios from 'axios';
import backendUrl from '../backendUrl';

interface Credentials {
  username: string;
  password: string;
}

const login = async (credentials: Credentials) => {
  const response = await axios.post(`${backendUrl}/login`, credentials);
  return response.data;
};

const signup = async (credentials: Credentials) => {
  const response = await axios.post(`${backendUrl}/signup`, credentials);
  return response.data;
};

const authService = { login, signup };

export default authService;
