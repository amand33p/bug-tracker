import { makeStyles } from '@material-ui/core/styles';

export const useBodyStyles = (darkMode: boolean) =>
  makeStyles(
    (theme) => ({
      root: {
        width: '100vW',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: '100vH',
        backgroundColor: darkMode ? '#333' : '#00968810',
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
    },
    clickableCell: {
      '&:hover': {
        backgroundColor: theme.palette.primary.main + '15',
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

export const useDialogStyles = makeStyles(
  (theme) => ({
    dialogWrapper: {
      paddingBottom: 20,
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        padding: 0,
      },
    },
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      zIndex: 1000,
    },
    roundIconButton: {
      minWidth: 0,
      padding: '0.65em',
      borderRadius: '2em',
    },
  }),
  { index: 1 }
);

export const useFormStyles = makeStyles(
  (theme) => ({
    submitBtn: {
      marginTop: '1.5em',
      height: '3.2em',
    },
    avatar: {
      color: theme.palette.primary.main,
      backgroundColor: '#d3d3d3',
    },
    fieldMargin: {
      marginTop: '1.5em',
    },
    radioGroupForm: {
      marginTop: '0.8em',
      width: '100%',
    },
    radioGroup: {
      display: 'flex',
      alignItems: 'center',
    },
    radioGroupLabel: {
      marginRight: '2em',
    },
    formControlLabels: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '80%',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        width: 'auto',
      },
    },
  }),
  { index: 1 }
);

export const useMainPageStyles = makeStyles(
  (theme) => ({
    root: {
      padding: '1em 0',
      [theme.breakpoints.down('xs')]: {
        padding: '0.5em 0.5em',
      },
    },
    headerPaper: {
      padding: '0.8em 1.5em',
      marginBottom: '1em',
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        padding: '0.3em 0.5em',
        marginBottom: '0.5em',
      },
    },
    headerIcon: {
      fontSize: '4.5em',
      marginRight: '0.2em',
      [theme.breakpoints.down('xs')]: {
        fontSize: '3em',
        marginRight: '0.3em',
      },
    },
    projectsPaper: {
      padding: '1.5em',
      minHeight: 'calc(100vH - 244px)',
      [theme.breakpoints.down('xs')]: {
        padding: '0.7em 0.3em',
        minHeight: 'calc(100vH - 160px)',
      },
    },
    projectsListTable: {
      marginTop: '1.5em',
      [theme.breakpoints.down('xs')]: {
        marginTop: 0,
      },
    },
    detailsHeader: {
      padding: '1.2em 1.5em',
      marginBottom: '1em',
      [theme.breakpoints.down('xs')]: {
        padding: '0.5em 0.7em',
        marginBottom: '0.5em',
      },
    },
    flexHeader: {
      display: 'flex',
      alignItems: 'center',
    },
    btnsWrapper: {
      margin: '1em 0',
      [theme.breakpoints.down('xs')]: {
        margin: '0.5em 0',
      },
    },
    membersWrapper: {
      marginTop: '1em',
    },
    filterMembersInput: {
      [theme.breakpoints.down('xs')]: {
        width: '55%',
      },
    },
    flexInput: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      [theme.breakpoints.down('xs')]: {
        marginTop: '0.3em',
      },
    },
    bugsPaper: {
      padding: '1.5em',
      minHeight: 'calc(100vH - 356px)',
      [theme.breakpoints.down('xs')]: {
        padding: '0.5em 0.7em',
        minHeight: 'calc(100vH - 256px)',
      },
    },
    bugsActionCard: {
      margin: '1.5em 0',
      [theme.breakpoints.down('xs')]: {
        margin: '0.5em 0',
      },
    },
    notesPaper: {
      padding: '1.5em',
      minHeight: 'calc(100vH - 420px)',
      [theme.breakpoints.down('xs')]: {
        padding: '0.5em 0.7em',
        minHeight: 'calc(100vH - 320px)',
      },
    },
    notesWrapper: {
      margin: '1.5em 0',
    },
    sortNotesInput: {
      width: '22%',
      [theme.breakpoints.down('xs')]: {
        width: '55%',
      },
    },
    singleNote: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '0.3em',
      marginTop: '0.8em',
    },
    noteBody: {
      marginTop: '0.2em',
    },
    avatar: {
      width: theme.spacing(4.8),
      height: theme.spacing(4.8),
      marginRight: '0.4em',
      marginTop: '0.3em',
      color: theme.palette.primary.main,
      backgroundColor: '#d3d3d3',
    },
    notesBtnWrapper: {
      margin: '0.5em 0',
    },
    iconText: {
      verticalAlign: 'middle',
      display: 'inline-flex',
    },
    textIconsWrapper: {
      display: 'flex',
      width: '100px',
      justifyContent: 'space-between',
    },
    listItemWrapper: {
      padding: '0.4em 0.3em',
    },
    flexedWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '0.3em',
    },
    roundIconButton: {
      minWidth: 0,
      padding: '0.65em',
      borderRadius: '2em',
    },
    gotoIcon: {
      fontSize: '0.7em',
      marginLeft: '0.4em',
    },
    marginText: {
      marginBottom: '0.35em',
    },
    notFoundPaper: {
      padding: '1.5em',
      minHeight: 'calc(100vH - 130px)',
      [theme.breakpoints.down('xs')]: {
        padding: '0.5em 0.7em',
        minHeight: 'calc(100vH - 80px)',
      },
    },
    error404Image: {
      width: '250px',
      display: 'block',
      margin: '0 auto',
      [theme.breakpoints.down('xs')]: {
        width: '150px',
      },
    },
    error404Text: {
      fontSize: '2.2em',
      textAlign: 'center',
      marginTop: '1em',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5em',
      },
    },
    notFoundWrapper: {
      marginTop: '6em',
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
      [theme.breakpoints.down('xs')]: {
        marginBottom: '0.7em',
      },
    },
    searchBarWrapper: {
      width: '70%',
      [theme.breakpoints.down('xs')]: {
        width: '55%',
      },
    },
    sortBarWrapper: {
      width: '25%',
      [theme.breakpoints.down('xs')]: {
        width: '42%',
      },
    },
    flexWrapper: {
      display: 'flex',
      minWidth: '100%',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        justifyContent: 'flex-start',
        marginLeft: '0.2em',
      },
    },
  }),
  { index: 1 }
);

export const useNavStyles = makeStyles(
  (theme) => ({
    container: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
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
    backBtn: {
      [theme.breakpoints.down('xs')]: {
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
      marginRight: '10px',
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
      width: '330px',
      margin: 'auto',
      marginTop: '16vH',
      [theme.breakpoints.down('xs')]: {
        width: 'auto',
        margin: '0.5em 0.5em',
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
