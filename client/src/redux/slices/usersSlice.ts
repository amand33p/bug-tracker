import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import userService from '../../services/users';
import { User } from '../types';
import { getErrorMsg } from '../../utils/helperFuncs';

interface InitialBugState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
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
    setUsersError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setUsers, setUsersLoading, setUsersError } = usersSlice.actions;

export const fetchUsers = (): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(setUsersLoading());
      const usersData = await userService.getUsers();
      dispatch(setUsers(usersData));
    } catch (e) {
      dispatch(setUsersError(getErrorMsg(e)));
    }
  };
};

export const selectUsersState = (state: RootState) => state.users;

export default usersSlice.reducer;
