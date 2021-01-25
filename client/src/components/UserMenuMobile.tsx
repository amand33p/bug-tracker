import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UserState } from '../redux/types';
import DarkModeSwitch from './DarkModeSwitch';

import { IconButton, Menu, MenuItem, Avatar } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

interface UserMenu {
  isMobile: boolean;
  user: UserState | null;
  handleLogout: () => void;
}

const UserMenuMobile: React.FC<UserMenu> = ({
  isMobile,
  user,
  handleLogout,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useNavStyles();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleCloseMenu();
  };

  if (!isMobile) return null;

  return (
    <div>
      <DarkModeSwitch isMobile={isMobile} />
      {user ? (
        <IconButton onClick={handleOpenMenu} className={classes.userBtnMob}>
          <Avatar className={classes.avatar}>
            {user.username.slice(0, 1)}
          </Avatar>
          <MoreVertIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleOpenMenu}
          color="primary"
          className={classes.threeDotsBtn}
        >
          <MoreVertIcon color="primary" />
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        marginThreshold={0}
        elevation={1}
      >
        {user ? (
          <MenuItem onClick={handleLogoutClick}>
            <PowerSettingsNewIcon className={classes.menuIcon} />
            Logout: {user.username}
          </MenuItem>
        ) : (
          <div>
            <MenuItem
              component={RouterLink}
              to="/login"
              onClick={handleCloseMenu}
            >
              <ExitToAppIcon className={classes.menuIcon} />
              Log In
            </MenuItem>
            <MenuItem
              component={RouterLink}
              to="/signup"
              onClick={handleCloseMenu}
            >
              <PersonAddIcon className={classes.menuIcon} />
              Sign Up
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default UserMenuMobile;
