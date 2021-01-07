import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = (darkMode: boolean) =>
  createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#009688',
      },
      secondary: {
        main: darkMode ? '#22db63' : '#005b53',
      },
    },
  });

export default customTheme;
