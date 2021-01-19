import React, { useState } from 'react';

import {
  Button,
  IconButton,
  MenuItem,
  SvgIconProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@material-ui/core';

interface NormalButtonType {
  type: 'normal';
  text: string;
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
  style?: { [name: string]: string } | { [name: string]: number };
}

interface IconButtonType {
  type: 'icon';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium';
  iconSize?: 'small' | 'default' | 'large';
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
  actionFunc: () => void;
}> = ({ title, contentText, actionBtnText, triggerBtn, actionFunc }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleConfirmedAction = () => {
    actionFunc();
    handleDialogClose();
  };

  const triggerButton = () => {
    if (triggerBtn.type === 'icon') {
      return (
        <IconButton
          color="primary"
          onClick={handleDialogOpen}
          size={triggerBtn.size || 'medium'}
        >
          <triggerBtn.icon fontSize={triggerBtn.iconSize || 'default'} />
        </IconButton>
      );
    } else if (triggerBtn.type === 'menu') {
      return (
        <MenuItem onClick={handleDialogOpen}>
          <triggerBtn.icon />
          {triggerBtn.text}
        </MenuItem>
      );
    } else {
      return (
        <Button
          color="primary"
          variant="contained"
          size={triggerBtn.size || 'medium'}
          startIcon={<triggerBtn.icon />}
          onClick={handleDialogOpen}
          style={triggerBtn.style}
        >
          {triggerBtn.text}
        </Button>
      );
    }
  };

  return (
    <div style={{ display: 'inline' }}>
      {triggerButton()}
      <Dialog open={dialogOpen} onClose={handleDialogOpen}>
        <DialogTitle disableTypography>
          <Typography color="secondary" variant="h6">
            {title}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>{contentText}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            color="secondary"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmedAction}
            color="primary"
            variant="contained"
            size="small"
          >
            {actionBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;
