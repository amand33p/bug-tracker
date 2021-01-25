import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import bugService from '../../services/bugs';
import noteService from '../../services/notes';
import {
  BugState,
  BugSortValues,
  BugPayload,
  EditedBugData,
  ClosedReopenedBugData,
  Note,
  BugFilterValues,
} from '../types';
import { notify } from './notificationSlice';
import { History } from 'history';
import { getErrorMsg } from '../../utils/helperFuncs';

interface InitialBugState {
  bugs: { [projectId: string]: BugState[] };
  fetchLoading: boolean;
  fetchError: string | null;
  submitLoading: boolean;
  submitError: string | null;
  sortBy: BugSortValues;
  filterBy: BugFilterValues;
}

const initialState: InitialBugState = {
  bugs: {},
  fetchLoading: false,
  fetchError: null,
  submitLoading: false,
  submitError: null,
  sortBy: 'newest',
  filterBy: 'all',
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
    addNote: (
      state,
      action: PayloadAction<{ note: Note; bugId: string; projectId: string }>
    ) => {
      state.bugs[action.payload.projectId] = state.bugs[
        action.payload.projectId
      ].map((b) =>
        b.id === action.payload.bugId
          ? { ...b, notes: [...b.notes, action.payload.note] }
          : b
      );
      state.submitLoading = false;
      state.submitError = null;
    },
    updateNote: (
      state,
      action: PayloadAction<{
        data: { body: string; updatedAt: Date };
        noteId: number;
        bugId: string;
        projectId: string;
      }>
    ) => {
      const bug = state.bugs[action.payload.projectId].find(
        (b) => b.id === action.payload.bugId
      );

      if (bug) {
        const updatedNotes = bug.notes.map((n) =>
          n.id === action.payload.noteId ? { ...n, ...action.payload.data } : n
        );

        state.bugs[action.payload.projectId] = state.bugs[
          action.payload.projectId
        ].map((b) =>
          b.id === action.payload.bugId ? { ...b, notes: updatedNotes } : b
        );

        state.submitLoading = false;
        state.submitError = null;
      }
    },
    removeNote: (
      state,
      action: PayloadAction<{
        noteId: number;
        bugId: string;
        projectId: string;
      }>
    ) => {
      const bug = state.bugs[action.payload.projectId].find(
        (b) => b.id === action.payload.bugId
      );

      if (bug) {
        const updatedNotes = bug.notes.filter(
          (n) => n.id !== action.payload.noteId
        );

        state.bugs[action.payload.projectId] = state.bugs[
          action.payload.projectId
        ].map((b) =>
          b.id === action.payload.bugId ? { ...b, notes: updatedNotes } : b
        );
      }
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
    filterBugsBy: (state, action: PayloadAction<BugFilterValues>) => {
      state.filterBy = action.payload;
    },
  },
});

export const {
  setBugs,
  addBug,
  updateBug,
  removeBug,
  updateBugStatus,
  addNote,
  updateNote,
  removeNote,
  setFetchBugsLoading,
  setFetchBugsError,
  setSubmitBugLoading,
  setSubmitBugError,
  clearSubmitBugError,
  sortBugsBy,
  filterBugsBy,
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
      dispatch(notify('New bug added!', 'success'));
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
      dispatch(notify('Successfully updated the bug!', 'success'));
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
      dispatch(notify('Deleted the bug.', 'success'));
    } catch (e) {
      dispatch(notify(getErrorMsg(e), 'error'));
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
      dispatch(
        notify(
          `${action === 'close' ? 'Closed' : 'Re-opened'} the bug!`,
          'success'
        )
      );
    } catch (e) {
      dispatch(notify(getErrorMsg(e), 'error'));
    }
  };
};

export const createNote = (
  projectId: string,
  bugId: string,
  noteBody: string,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitBugLoading());
      const newNote = await noteService.createNote(projectId, bugId, noteBody);
      dispatch(addNote({ note: newNote, bugId, projectId }));
      dispatch(notify('New note added!', 'success'));
      closeDialog && closeDialog();
    } catch (e) {
      dispatch(setSubmitBugError(getErrorMsg(e)));
    }
  };
};

export const editNote = (
  projectId: string,
  bugId: string,
  noteId: number,
  noteBody: string,
  closeDialog?: () => void
): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitBugLoading());
      const returnedData = await noteService.editNote(
        projectId,
        noteId,
        noteBody
      );
      const { body, updatedAt } = returnedData as Note;
      dispatch(
        updateNote({ data: { body, updatedAt }, noteId, bugId, projectId })
      );
      dispatch(notify('Updated the note!', 'success'));
      closeDialog && closeDialog();
    } catch (e) {
      dispatch(setSubmitBugError(getErrorMsg(e)));
    }
  };
};

export const deleteNote = (
  projectId: string,
  bugId: string,
  noteId: number
): AppThunk => {
  return async (dispatch) => {
    try {
      await noteService.deleteNote(projectId, noteId);
      dispatch(removeNote({ noteId, bugId, projectId }));
      dispatch(notify('Deleted the note.', 'success'));
    } catch (e) {
      dispatch(notify(getErrorMsg(e), 'error'));
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
