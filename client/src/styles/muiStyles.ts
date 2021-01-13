import { makeStyles } from '@material-ui/core/styles';

export const useBodyStyles = makeStyles(
  (theme) => ({
    root: {
      width: '100vW',
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      minHeight: '100vH',
      backgroundColor: '#00968810',
    },
  }),
  { index: 1 }
);

export const useTableStyles = makeStyles(
  (theme) => ({
    table: {
      '& thead th': {
        fontWeight: '600',
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.light,
      },
      '& tbody tr:hover': {
        backgroundColor: '#d3d3d330',
        cursor: 'pointer',
      },
    },
    scrollableTable: {
      '& thead th': {
        fontWeight: '600',
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.light,
      },
      overflowY: 'auto',
      maxHeight: '350px',
    },
  }),
  { index: 1 }
);

export const useMainPageStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '1em 0',
    },
    headerPaper: {
      padding: '0.8em 1.5em',
      marginBottom: '1em',
      display: 'flex',
      alignItems: 'center',
    },
    headerIcon: {
      fontSize: '4.5em',
      marginRight: '0.2em',
    },
    projectsPaper: {
      padding: '1.5em',
      minHeight: '685px',
      marginBottom: '0.5em',
    },
    detailsHeader: {
      padding: '1em 1.5em',
      marginBottom: '1em',
    },
    projectName: {
      display: 'flex',
      alignItems: 'center',
    },
    btnsWrapper: {
      margin: '1em 0',
    },
    membersPaper: {
      padding: '1.2em 1.5em',
    },
    membersBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
  { index: 1 }
);

export const useActionCardStyles = makeStyles(
  (theme) => ({
    inputs: {
      display: 'flex',
      minWidth: '100%',
      justifyContent: 'space-between',
      marginBottom: '1.5em',
    },
    searchBarWrapper: {
      width: '70%',
    },
    sortBarWrapper: {
      width: '25%',
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
