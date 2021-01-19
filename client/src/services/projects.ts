import axios from 'axios';
import backendUrl from '../backendUrl';
import { setConfig } from './auth';
import { ProjectPayload } from '../redux/types';

const baseUrl = `${backendUrl}/projects`;

const getProjects = async () => {
  const response = await axios.get(baseUrl, setConfig());
  return response.data;
};

const createProject = async (projectData: ProjectPayload) => {
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
