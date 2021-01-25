import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import authReducer from './slices/authSlice';
import projectsReducer from './slices/projectsSlice';
import bugsReducer from './slices/bugsSlice';
import usersReducer from './slices/usersSlice';
import notificationReducer from './slices/notificationSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    bugs: bugsReducer,
    users: usersReducer,
    notification: notificationReducer,
    theme: themeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
