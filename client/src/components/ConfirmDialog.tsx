import React, { useState } from 'react';

import {
  Button,
  IconButton,
  MenuItem,
  SvgIconProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

interface NormalButtonType {
  type: 'normal';
  text: string;
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
}

interface IconButtonType {
  type: 'icon';
  icon: (props: SvgIconProps) => JSX.Element;
}

interface MenuItemButtonType {
  type: 'menu';
  text: string;
  icon: (props: SvgIconProps) => JSX.Element;
}

type TriggerButtonDetails =
  | NormalButtonType
  | IconButtonType
  | MenuItemButtonType;

const ConfirmDialog: React.FC<{
  title: string;
  contentText: string;
  actionBtnText: string;
  triggerBtn: TriggerButtonDetails;
  handleConfirmedAction: () => void;
}> = ({
  title,
  contentText,
  actionBtnText,
  triggerBtn,
  handleConfirmedAction,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const triggerButton = () => {
    if (triggerBtn.type === 'normal') {
      return (
        <Button
          color="primary"
          variant="contained"
          size={triggerBtn.size || 'medium'}
          startIcon={<triggerBtn.icon />}
          onClick={handleDialogOpen}
        >
          {triggerBtn.text}
        </Button>
      );
    } else if (triggerBtn.type === 'icon') {
      return (
        <IconButton color="primary" onClick={handleDialogOpen}>
          <triggerBtn.icon />
        </IconButton>
      );
    } else {
      return (
        <MenuItem onClick={handleDialogOpen}>
          <triggerBtn.icon />
          {triggerBtn.text}
        </MenuItem>
      );
    }
  };

  return (
    <div>
      {triggerButton()}
      <Dialog open={dialogOpen} onClose={handleDialogOpen}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmedAction} color="primary" autoFocus>
            {actionBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
