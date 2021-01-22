import React, { useState } from 'react';
import { DialogTitle } from './CustomDialogTitle';
import HideOnScroll from './HideOnScroll';
import { TriggerButtonTypes } from './types';

import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  MenuItem,
  Fab,
} from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';

const FormDialog: React.FC<{
  title: string;
  triggerBtn: TriggerButtonTypes;
  children: React.ReactNode;
}> = ({ triggerBtn, children, title }) => {
  const classes = useDialogStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
    triggerBtn.type === 'menu' && triggerBtn.closeMenu();
  };

  const triggerButton = () => {
    if (triggerBtn.type === 'icon') {
      return (
        <IconButton
          color={triggerBtn.color || 'primary'}
          onClick={handleDialogOpen}
          size={triggerBtn.size || 'medium'}
          className={triggerBtn.className}
          style={triggerBtn.style}
        >
          <triggerBtn.icon fontSize={triggerBtn.iconSize || 'default'} />
        </IconButton>
      );
    } else if (triggerBtn.type === 'menu') {
      return (
        <MenuItem onClick={handleDialogOpen}>
          <triggerBtn.icon style={triggerBtn.iconStyle} />
          {triggerBtn.text}
        </MenuItem>
      );
    } else if (triggerBtn.type === 'fab') {
      return (
        <HideOnScroll>
          <Fab
            variant={triggerBtn.variant || 'round'}
            size={triggerBtn.size || 'large'}
            color={triggerBtn.color || 'primary'}
            className={classes.fab}
            onClick={handleDialogOpen}
          >
            <triggerBtn.icon
              style={{
                marginRight: triggerBtn.variant === 'extended' ? '0.3em' : 0,
              }}
            />
            {triggerBtn.variant === 'extended' && triggerBtn.text}
          </Fab>
        </HideOnScroll>
      );
    } else if (triggerBtn.type === 'round') {
      return (
        <Button
          color={triggerBtn.color || 'primary'}
          variant={triggerBtn.variant || 'contained'}
          size={triggerBtn.size || 'medium'}
          onClick={handleDialogOpen}
          style={triggerBtn.style}
          className={classes.roundIconButton}
        >
          <triggerBtn.icon />
        </Button>
      );
    } else {
      return (
        <Button
          color={triggerBtn.color || 'primary'}
          variant={triggerBtn.variant || 'contained'}
          size={triggerBtn.size || 'medium'}
          startIcon={<triggerBtn.icon />}
          onClick={handleDialogOpen}
          style={triggerBtn.style}
          className={triggerBtn.className}
        >
          {triggerBtn.text}
        </Button>
      );
    }
  };

  const proppedChildren = React.isValidElement(children)
    ? React.cloneElement(children, {
        closeDialog: handleDialogClose,
      })
    : children;

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleDialogClose}>{title}</DialogTitle>
        <DialogContent>{proppedChildren}</DialogContent>
      </Dialog>
    </div>
  );
};

export default FormDialog;
