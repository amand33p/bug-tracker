import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = (darkMode: boolean) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#25D366',
      },
      secondary: {
        main: darkMode ? '#22db63' : '#136f36',
      },
    },
  });

export default customTheme;
