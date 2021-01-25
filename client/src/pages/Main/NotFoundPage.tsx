import { Paper, Typography } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import Error404 from '../../svg/error-404.svg';

const NotFoundPage = () => {
  const classes = useMainPageStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.notFoundPaper}>
        <div className={classes.notFoundWrapper}>
          <img src={Error404} alt="404" className={classes.error404Image} />
          <Typography
            color="secondary"
            variant="h6"
            className={classes.error404Text}
          >
            ERROR: Page Not Found!
          </Typography>
        </div>
      </Paper>
    </div>
  );
};

export default NotFoundPage;
