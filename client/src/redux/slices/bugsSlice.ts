import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import bugService from '../../services/bugs';
import { BugState, BugSortValues } from '../types';
import { getErrorMsg } from '../../utils/helperFuncs';

interface InitialBugState {
  bugs: { [projectId: string]: BugState[] };
  loading: boolean;
  error: string | null;
  sortBy: BugSortValues;
}

const initialState: InitialBugState = {
  bugs: {},
  loading: false,
  error: null,
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
      state.loading = false;
      state.error = null;
    },
    setBugsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setBugsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearBugsError: (state) => {
      state.error = null;
    },
    sortBugsBy: (state, action: PayloadAction<BugSortValues>) => {
      state.sortBy = action.payload;
    },
  },
});

export const {
  setBugs,
  setBugsLoading,
  setBugsError,
  clearBugsError,
  sortBugsBy,
} = bugsSlice.actions;

export const fetchBugsByProjectId = (projectId: string): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setBugsLoading());
      const bugsData = await bugService.getBugs(projectId);
      dispatch(setBugs({ bugs: bugsData, projectId }));
    } catch (e) {
      dispatch(setBugsError(getErrorMsg(e)));
    }
  };
};

export const selectBugsState = (state: RootState) => state.bugs;

export const selectBugsByProjectId = (state: RootState, projectId: string) => {
  return state.bugs.bugs?.[projectId];
};

export default bugsSlice.reducer;
