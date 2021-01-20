import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import bugService from '../../services/bugs';
import {
  BugState,
  BugSortValues,
  BugPayload,
  EditedBugData,
  ClosedReopenedBugData,
} from '../types';
import { History } from 'history';
import { getErrorMsg } from '../../utils/helperFuncs';

interface InitialBugState {
  bugs: { [projectId: string]: BugState[] };
  fetchLoading: boolean;
  fetchError: string | null;
  submitLoading: boolean;
  submitError: string | null;
  sortBy: BugSortValues;
}

const initialState: InitialBugState = {
  bugs: {},
  fetchLoading: false,
  fetchError: null,
  submitLoading: false,
  submitError: null,
  sortBy: 'newest',
};

const bugsSlice = createSlice({
  name: 'bugs',
  initialState,
  reducers: {
    setBugs: (
      state,
      action: PayloadAction<{ bugs: BugState[]; projectId: string }>
    ) => {
      state.bugs[action.payload.projectId] = action.payload.bugs;
      state.fetchLoading = false;
      state.fetchError = null;
    },
    addBug: (
      state,
      action: PayloadAction<{ bug: BugState; projectId: string }>
    ) => {
      if (action.payload.projectId in state.bugs) {
        state.bugs[action.payload.projectId].push(action.payload.bug);
      } else {
        state.bugs[action.payload.projectId] = [action.payload.bug];
      }
      state.submitLoading = false;
      state.submitError = null;
    },
    updateBug: (
      state,
      action: PayloadAction<{
        data: EditedBugData;
        bugId: string;
        projectId: string;
      }>
    ) => {
      state.bugs[action.payload.projectId] = state.bugs[
        action.payload.projectId
      ].map((b) =>
        b.id === action.payload.bugId ? { ...b, ...action.payload.data } : b
      );

      state.submitLoading = false;
      state.submitError = null;
    },
    removeBug: (
      state,
      action: PayloadAction<{ bugId: string; projectId: string }>
    ) => {
      state.bugs[action.payload.projectId] = state.bugs[
        action.payload.projectId
      ].filter((b) => b.id !== action.payload.bugId);
    },
    updateBugStatus: (
      state,
      action: PayloadAction<{
        data: ClosedReopenedBugData;
        bugId: string;
        projectId: string;
      }>
    ) => {
      state.bugs[action.payload.projectId] = state.bugs[
        action.payload.projectId
      ].map((b) =>
        b.id === action.payload.bugId ? { ...b, ...action.payload.data } : b
      );
    },
    setFetchBugsLoading: (state) => {
      state.fetchLoading = true;
      state.fetchError = null;
    },
    setFetchBugsError: (state, action: PayloadAction<string>) => {
      state.fetchLoading = false;
      state.fetchError = action.payload;
    },
    setSubmitBugLoading: (state) => {
      state.submitLoading = true;
      state.submitError = null;
    },
    setSubmitBugError: (state, action: PayloadAction<string>) => {
      state.submitLoading = false;
      state.submitError = action.payload;
    },
    clearSubmitBugError: (state) => {
      state.submitError = null;
    },
    sortBugsBy: (state, action: PayloadAction<BugSortValues>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setBugs,
  addBug,
  updateBug,
  removeBug,
  updateBugStatus,
  setFetchBugsLoading,
  setFetchBugsError,
  setSubmitBugLoading,
  setSubmitBugError,
  clearSubmitBugError,
  sortBugsBy,
} = bugsSlice.actions;

export const fetchBugsByProjectId = (projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setFetchBugsLoading());
      const projectBugs = await bugService.getBugs(projectId);
      dispatch(setBugs({ bugs: projectBugs, projectId }));
    } catch (e) {
      dispatch(setFetchBugsError(getErrorMsg(e)));
    }
  };
};

export const createNewBug = (
  projectId: string,
  bugData: BugPayload,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitBugLoading());
      const newBug = await bugService.createBug(projectId, bugData);
      dispatch(addBug({ bug: newBug, projectId }));
      closeDialog && closeDialog();
    } catch (e) {
      dispatch(setSubmitBugError(getErrorMsg(e)));
    }
  };
};

export const editBug = (
  projectId: string,
  bugId: string,
  bugData: BugPayload,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitBugLoading());
      const updatedBug = await bugService.updateBug(projectId, bugId, bugData);
      const {
        title,
        description,
        priority,
        updatedAt,
        updatedBy,
      } = updatedBug as EditedBugData;

      dispatch(
        updateBug({
          data: { title, description, priority, updatedAt, updatedBy },
          bugId,
          projectId,
        })
      );
      closeDialog && closeDialog();
    } catch (e) {
      dispatch(setSubmitBugError(getErrorMsg(e)));
    }
  };
};

export const deleteBug = (
  projectId: string,
  bugId: string,
  history: History
): AppThunk => {
  return async (dispatch) => {
    try {
      await bugService.deleteBug(projectId, bugId);
      history.push(`/projects/${projectId}`);
      dispatch(removeBug({ bugId, projectId }));
    } catch (e) {
      console.log(console.log(getErrorMsg(e)));
    }
  };
};

export const closeReopenBug = (
  projectId: string,
  bugId: string,
  action: 'close' | 'reopen'
): AppThunk => {
  return async (dispatch) => {
    try {
      let returnedData;
      if (action === 'close') {
        returnedData = await bugService.closeBug(projectId, bugId);
      } else {
        returnedData = await bugService.reopenBug(projectId, bugId);
      }
      const {
        isResolved,
        closedAt,
        closedBy,
        reopenedAt,
        reopenedBy,
      } = returnedData as ClosedReopenedBugData;
      dispatch(
        updateBugStatus({
          data: { isResolved, closedAt, closedBy, reopenedAt, reopenedBy },
          bugId,
          projectId,
        })
      );
    } catch (e) {
      console.log(console.log(getErrorMsg(e)));
    }
  };
};

export const selectBugsState = (state: RootState) => state.bugs;

export const selectBugsByProjectId = (state: RootState, projectId: string) => {
  return state.bugs.bugs?.[projectId];
};

export const selectBugById = (
  state: RootState,
  projectId: string,
  bugId: string
) => {
  return state.bugs.bugs?.[projectId].find((b) => b.id === bugId);
};

export default bugsSlice.reducer;
