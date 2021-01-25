import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../store';
import { NotifPayload } from '../types';

interface InitialNotifState {
  message: string | null;
  type: 'success' | 'error' | null;
}

const initialState: InitialNotifState = {
  message: null,
  type: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<NotifPayload>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = null;
      state.type = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

let timeoutID: number = 0;

export const notify = (notifData: NotifPayload): AppThunk => {
  return (dispatch) => {
    window.clearTimeout(timeoutID);
    dispatch(setNotification(notifData));

    timeoutID = window.setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const selectNotifState = (state: RootState) => state.notification;

export default notificationSlice.reducer;
