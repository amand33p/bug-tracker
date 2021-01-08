import { useEffect } from 'react';
import NavBar from './components/NavBar';
import Routes from './pages/Routes';

import customTheme from './styles/customTheme';
import { useBodyStyles } from './styles/muiStyles';
import { Paper } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const classes = useBodyStyles();
  const darkMode = false; //placeholder

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <Paper className={classes.root} elevation={0}>
        <NavBar />
        <Routes />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
