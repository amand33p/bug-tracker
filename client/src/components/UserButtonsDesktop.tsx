import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';

const UserButtonsDesktop: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const classes = useNavStyles();

  if (isMobile) return null;

  return (
    <div>
      <Button
        color="secondary"
        variant="outlined"
        size="small"
        component={RouterLink}
        to="/login"
      >
        Log In
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        size="small"
        className={classes.lastBtn}
        component={RouterLink}
        to="/signup"
      >
        Sign UP
      </Button>
    </div>
  );
};

export default UserButtonsDesktop;
