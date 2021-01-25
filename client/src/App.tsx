import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { autoLogin } from './redux/slices/authSlice';
import NavBar from './components/NavBar';
import Routes from './Routes';
import ToastNotification from './components/ToastNotification';

import customTheme from './styles/customTheme';
import { useBodyStyles } from './styles/muiStyles';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const classes = useBodyStyles();
  const dispatch = useDispatch();
  const darkMode = false; //placeholder

  useEffect(() => {
    dispatch(autoLogin());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <div className={classes.root}>
        <NavBar />
        <Routes />
        <ToastNotification />
      </div>
    </ThemeProvider>
  );
};

export default App;
