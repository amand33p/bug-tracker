import { makeStyles } from '@material-ui/core/styles';

export const useBodyStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100vW',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vH',
    },
  }),
  { index: 1 }
);

export const useNavStyles = makeStyles(
  (theme) => ({
    leftPortion: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
    },
    logoWrapper: {
      marginRight: '1em',
      display: 'flex',
      alignItems: 'center',
    },
    logoBtn: {
      textTransform: 'none',
      fontSize: '1.2em',
      padding: '0.1em',
      marginRight: '0.3em',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1em',
        marginLeft: '0.6em',
      },
    },
    svgImage: {
      width: '35px',
      marginRight: '5px',
      [theme.breakpoints.down('xs')]: {
        width: '30px',
      },
    },
    rightBtnWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    lastBtn: {
      marginLeft: '1em',
    },
    threeDotsBtn: {
      padding: '0.35em',
    },
    menuIcon: {
      marginRight: '8px',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    avatar: {
      width: theme.spacing(4.1),
      height: theme.spacing(4.1),
      marginRight: '0.4em',
      color: theme.palette.primary.main,
      backgroundColor: '#d3d3d3',
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(3.5),
        height: theme.spacing(3.5),
      },
    },
    btnsWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    userBtnMob: {
      padding: '0.1em',
    },
  }),
  { index: 1 }
);

export const useAuthPageStyles = makeStyles(
  (theme) => ({
    rootBackground: {
      backgroundColor: `${theme.palette.primary.main}10`,
      height: 'calc(100vH - 50px)',
    },
    root: {
      padding: '1.5em 3em',
      width: '320px',
      margin: 'auto',
      marginTop: '8%',
      [theme.breakpoints.down('xs')]: {
        width: 'auto',
        margin: '0.7em 0.7em',
        padding: '1em',
      },
    },
    form: {
      marginTop: '3em',
    },
    inputField: {
      marginBottom: '1.5em',
    },
    submitButton: {
      marginTop: '0.5em',
      height: '3.1em',
      fontSize: '1em',
      fontWeight: 500,
    },
    titleLogo: {
      display: 'block',
      width: '7em',
      margin: '0 auto',
      [theme.breakpoints.down('xs')]: {
        width: '6em',
      },
    },
    footerText: {
      marginTop: '1em',
      textAlign: 'center',
    },
    link: {
      cursor: 'pointer',
    },
  }),
  { index: 1 }
);
