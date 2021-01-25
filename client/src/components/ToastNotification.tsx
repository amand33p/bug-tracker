import { useDispatch, useSelector } from 'react-redux';
import {
  clearNotification,
  selectNotifState,
} from '../redux/slices/notificationSlice';

import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 75,
    },
  },
}));

const ToastNotification = () => {
  const classes = useStyles();
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
      className={classes.snackbar}
    >
      <Alert onClose={clearNotif} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
