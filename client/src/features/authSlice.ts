import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import authService from '../services/auth';
import storage from '../utils/localStorage';
import { UserCredentials, UserState } from './types';

interface InitialState {
  user: UserState | null;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  authSuccess,
  authPending,
  authFailure,
  removeUser,
  clearError,
  setError,
} = authSlice.actions;

export const login = (credentials: UserCredentials): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(authPending());
      const userData = await authService.login(credentials);
      dispatch(authSuccess(userData));
    } catch (e) {
      dispatch(authFailure(e.response.data.message));
    }
  };
};

export const signup = (credentials: UserCredentials): AppThunk => {
  return async (dispatch) => {
    try {
      dispatch(authPending());
      const userData = await authService.signup(credentials);
      dispatch(authSuccess(userData));
    } catch (e) {
      dispatch(authFailure(e.response.data.message));
    }
  };
};

export const logout = (): AppThunk => {
  return (dispatch) => {
    dispatch(removeUser());
    storage.removeUser();
  };
};

export const selectAuthState = (state: RootState) => state.auth;

export default authSlice.reducer;
