import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const UserMenuMobile: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useNavStyles();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (!isMobile) return null;

  return (
    <div>
      <IconButton
        onClick={handleOpenMenu}
        color="primary"
        className={classes.threeDotsBtn}
      >
        <MoreVertIcon color="secondary" />
      </IconButton>

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
        <MenuItem component={RouterLink} to="/login" onClick={handleCloseMenu}>
          <ExitToAppIcon className={classes.menuIcon} />
          Log In
        </MenuItem>
        <MenuItem component={RouterLink} to="/signup" onClick={handleCloseMenu}>
          <PersonAddIcon className={classes.menuIcon} />
          Sign Up
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenuMobile;
