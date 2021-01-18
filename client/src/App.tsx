import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin } from './redux/slices/authSlice';
import { fetchUsers, selectUsersState } from './redux/slices/usersSlice';
import NavBar from './components/NavBar';
import Routes from './Routes';

import customTheme from './styles/customTheme';
import { useBodyStyles } from './styles/muiStyles';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const classes = useBodyStyles();
  const dispatch = useDispatch();
  const { status: usersStatus } = useSelector(selectUsersState);
  const darkMode = false; //placeholder

  useEffect(() => {
    dispatch(autoLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <div className={classes.root}>
        <NavBar />
        <Routes />
      </div>
    </ThemeProvider>
  );
};

export default App;
