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

const getBugs = async (projectId: string) => {
  const response = await axios.get(`${baseUrl}/${projectId}/bugs`, setConfig());
  return response.data;
};

const bugService = { getBugs };

export default bugService;
