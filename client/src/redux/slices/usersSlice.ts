import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import userService from '../../services/users';
import { User } from '../types';
import { notify } from './notificationSlice';
import { getErrorMsg } from '../../utils/helperFuncs';

interface InitialBugState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded';
  error: string | null;
}

const initialState: InitialBugState = {
  users: [],
  status: 'idle',
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setUsersLoading: (state) => {
      state.status = 'loading';
      state.error = null;
    },
  },
});

export const { setUsers, setUsersLoading } = usersSlice.actions;

export const fetchUsers = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setUsersLoading());
      const allUsers = await userService.getUsers();
      dispatch(setUsers(allUsers));
    } catch (e) {
      dispatch(notify(getErrorMsg(e), 'error'));
    }
  };
};

export const selectUsersState = (state: RootState) => state.users;

export default usersSlice.reducer;
