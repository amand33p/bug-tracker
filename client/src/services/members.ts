import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';

const baseUrl = `${backendUrl}/projects`;

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const addMembers = async (projectId: string, members: string[]) => {
  const response = await axios.post(
    `${baseUrl}/${projectId}/members`,
    { members },
    setConfig()
  );
  return response.data;
};

const removeMember = async (projectId: string, memberId: string) => {
  const response = await axios.delete(
    `${baseUrl}/${projectId}/members/${memberId}`,
    setConfig()
  );
  return response.data;
};

const leaveProject = async (projectId: string) => {
  const response = await axios.post(
    `${baseUrl}/${projectId}/members/leave`,
    null,
    setConfig()
  );
  return response.data;
};

const memberService = { addMembers, removeMember, leaveProject };

export default memberService;
