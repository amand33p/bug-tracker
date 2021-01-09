import axios from 'axios';
import backendUrl from '../backendUrl';
import storage from '../utils/localStorage';

const baseUrl = `${backendUrl}/projects`;
const token = storage.loadUser()?.token;

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getProjects = async () => {
  const response = await axios.get(baseUrl, setConfig());
  return response.data;
};

const projectService = { getProjects };

export default projectService;
