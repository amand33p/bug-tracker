import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';
import { NewProjectPayload } from '../redux/types';

const baseUrl = `${backendUrl}/projects`;

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

const editProjectName = async (projectId: string, newName: string) => {
  const response = await axios.put(
    `${baseUrl}/${projectId}`,
    { name: newName },
    setConfig()
  );
  return response.data;
};

const projectService = {
  getProjects,
  createProject,
  deleteProject,
  editProjectName,
};

export default projectService;
