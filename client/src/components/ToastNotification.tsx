import { useDispatch, useSelector } from 'react-redux';
import {
  clearNotification,
  selectNotifState,
} from '../redux/slices/notificationSlice';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ToastNotification = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector(selectNotifState);

  const clearNotif = () => {
    dispatch(clearNotification());
  };

  if (!message || !type) return null;

  return (
    <Snackbar
      open={!!message}
      onClose={clearNotif}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={clearNotif} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
