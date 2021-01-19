import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import projectService from '../../services/projects';
import memberService from '../../services/members';
import {
  ProjectState,
  ProjectSortValues,
  ProjectPayload,
  ProjectMember,
} from '../types';
import { History } from 'history';
import { getErrorMsg } from '../../utils/helperFuncs';

interface InitialProjectsState {
  projects: ProjectState[];
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  fetchError: string | null;
  submitLoading: boolean;
  submitError: string | null;
  sortBy: ProjectSortValues;
}

const initialState: InitialProjectsState = {
  projects: [],
  fetchStatus: 'idle',
  fetchError: null,
  submitLoading: false,
  submitError: null,
  sortBy: 'newest',
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<ProjectState[]>) => {
      state.projects = action.payload;
      state.fetchStatus = 'succeeded';
      state.fetchError = null;
    },
    setFetchProjectsLoading: (state) => {
      state.fetchStatus = 'loading';
      state.fetchError = null;
    },
    setFetchProjectsError: (state, action: PayloadAction<string>) => {
      state.fetchStatus = 'failed';
      state.fetchError = action.payload;
    },
    addProject: (state, action: PayloadAction<ProjectState>) => {
      state.projects.push(action.payload);
      state.submitLoading = false;
      state.submitError = null;
    },
    setSubmitProjectLoading: (state) => {
      state.submitLoading = true;
      state.submitError = null;
    },
    setSubmitProjectError: (state, action: PayloadAction<string>) => {
      state.submitLoading = false;
      state.submitError = action.payload;
    },
    clearSubmitProjectError: (state) => {
      state.submitError = null;
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter((p) => p.id !== action.payload);
    },
    updateProjectName: (
      state,
      action: PayloadAction<{
        data: { name: string; updatedAt: Date };
        projectId: string;
      }>
    ) => {
      state.projects = state.projects.map((p) =>
        p.id === action.payload.projectId ? { ...p, ...action.payload.data } : p
      );
      state.submitLoading = false;
      state.submitError = null;
    },
    addMembers: (
      state,
      action: PayloadAction<{ members: ProjectMember[]; projectId: string }>
    ) => {
      state.projects = state.projects.map((p) =>
        p.id === action.payload.projectId
          ? { ...p, members: action.payload.members }
          : p
      );
      state.submitLoading = false;
      state.submitError = null;
    },
    removeMember: (
      state,
      action: PayloadAction<{ memberId: string; projectId: string }>
    ) => {
      const project = state.projects.find(
        (p) => p.id === action.payload.projectId
      );

      if (project) {
        const updatedMembers = project.members.filter(
          (m) => m.member.id !== action.payload.memberId
        );
        state.projects = state.projects.map((p) =>
          p.id === action.payload.projectId
            ? { ...p, members: updatedMembers }
            : p
        );
      }
    },
    sortProjectsBy: (state, action: PayloadAction<ProjectSortValues>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setProjects,
  setFetchProjectsLoading,
  setFetchProjectsError,
  addProject,
  setSubmitProjectLoading,
  setSubmitProjectError,
  clearSubmitProjectError,
  removeProject,
  updateProjectName,
  addMembers,
  removeMember,
  sortProjectsBy,
} = projectsSlice.actions;

export const fetchProjects = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setFetchProjectsLoading());
      const allProjects = await projectService.getProjects();
      dispatch(setProjects(allProjects));
    } catch (e) {
      dispatch(setFetchProjectsError(getErrorMsg(e)));
    }
  };
};

export const createNewProject = (
  projectData: ProjectPayload,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitProjectLoading());
      const newProject = await projectService.createProject(projectData);
      dispatch(addProject(newProject));
      closeDialog && closeDialog();
    } catch (e) {
      dispatch(setSubmitProjectError(getErrorMsg(e)));
    }
  };
};

export const deleteProject = (
  projectId: string,
  history: History
): AppThunk => {
  return async (dispatch) => {
    try {
      await projectService.deleteProject(projectId);
      history.push('/');
      dispatch(removeProject(projectId));
    } catch (e) {
      console.log(console.log(getErrorMsg(e)));
    }
  };
};

export const editProjectName = (
  projectId: string,
  name: string,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitProjectLoading());
      const updatedProject = await projectService.editProjectName(
        projectId,
        name
      );
      dispatch(
        updateProjectName({
          data: {
            name: updatedProject.name,
            updatedAt: updatedProject.updatedAt,
          },
          projectId,
        })
      );
      closeDialog && closeDialog();
    } catch (e) {
      dispatch(setSubmitProjectError(getErrorMsg(e)));
    }
  };
};

export const addProjectMembers = (
  projectId: string,
  members: string[],
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitProjectLoading());
      const updatedMembers = await memberService.addMembers(projectId, members);
      dispatch(addMembers({ members: updatedMembers, projectId }));
      closeDialog && closeDialog();
    } catch (e) {
      dispatch(setSubmitProjectError(getErrorMsg(e)));
    }
  };
};

export const removeProjectMember = (
  projectId: string,
  memberId: string
): AppThunk => {
  return async (dispatch) => {
    try {
      await memberService.removeMember(projectId, memberId);
      dispatch(removeMember({ memberId, projectId }));
    } catch (e) {
      console.log(console.log(getErrorMsg(e)));
    }
  };
};

export const leaveProjectMembership = (
  projectId: string,
  history: History
): AppThunk => {
  return async (dispatch) => {
    try {
      await memberService.leaveProject(projectId);
      history.push('/');
      dispatch(removeProject(projectId));
    } catch (e) {
      console.log(console.log(getErrorMsg(e)));
    }
  };
};

export const selectProjectsState = (state: RootState) => state.projects;

export const selectProjectById = (state: RootState, projectId: string) => {
  return state.projects.projects.find((p) => p.id === projectId);
};

export default projectsSlice.reducer;
