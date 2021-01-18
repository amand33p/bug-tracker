import axios from 'axios';
import backendUrl from '../backendUrl';
import storage from '../utils/localStorage';
import { NewProjectPayload } from '../redux/types';

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

const createProject = async (projectData: NewProjectPayload) => {
  const response = await axios.post(baseUrl, projectData, setConfig());
  return response.data;
};

const deleteProject = async (projectId: string) => {
  const response = await axios.delete(`${baseUrl}/${projectId}`, setConfig());
  return response.data;
};

const projectService = { getProjects, createProject, deleteProject };

export default projectService;
