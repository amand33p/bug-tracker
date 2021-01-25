import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UserState } from '../redux/types';
import DarkModeSwitch from './DarkModeSwitch';

import { Button, Avatar, Typography } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

interface UserMenu {
  isMobile: boolean;
  user: UserState | null;
  handleLogout: () => void;
}

const UserButtonsDesktop: React.FC<UserMenu> = ({
  isMobile,
  user,
  handleLogout,
}) => {
  const classes = useNavStyles();

  if (isMobile) return null;

  return (
    <div>
      {user ? (
        <div className={classes.btnsWrapper}>
          <div className={classes.userInfo}>
            <Avatar className={classes.avatar}>
              {user.username.slice(0, 1)}
            </Avatar>
            <Typography color="secondary" variant="body1">
              {user.username}
            </Typography>
          </div>
          <Button
            color="secondary"
            variant="outlined"
            size="small"
            className={classes.lastBtn}
            onClick={handleLogout}
            startIcon={<PowerSettingsNewIcon />}
          >
            Log Out
          </Button>
          <DarkModeSwitch isMobile={isMobile} />
        </div>
      ) : (
        <div>
          <Button
            color="secondary"
            variant="outlined"
            size="small"
            component={RouterLink}
            to="/login"
            startIcon={<ExitToAppIcon />}
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
            startIcon={<PersonAddIcon />}
          >
            Sign Up
          </Button>
          <DarkModeSwitch isMobile={isMobile} />
        </div>
      )}
    </div>
  );
};

export default UserButtonsDesktop;
