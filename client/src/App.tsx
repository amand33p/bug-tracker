import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoLogin } from './redux/slices/authSlice';
import { selectThemeState, toggleDarkMode } from './redux/slices/themeSlice';
import NavBar from './components/NavBar';
import Routes from './Routes';
import ToastNotification from './components/ToastNotification';
import storage from './utils/localStorage';

import { Paper } from '@material-ui/core';
import customTheme from './styles/customTheme';
import { useBodyStyles } from './styles/muiStyles';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector(selectThemeState);
  const classes = useBodyStyles(darkMode)();

  useEffect(() => {
    dispatch(autoLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadedDarkMode = storage.loadDarkMode();
    if (loadedDarkMode && !darkMode) {
      dispatch(toggleDarkMode());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <Paper className={classes.root} elevation={0}>
        <NavBar />
        <Routes />
        <ToastNotification />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
