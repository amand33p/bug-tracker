import React, { useState } from 'react';
import { DialogTitle } from './CustomDialogTitle';
import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  MenuItem,
  SvgIconProps,
} from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';

interface NormalButtonType {
  type: 'normal';
  text: string;
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium' | 'large';
}

interface IconButtonType {
  type: 'icon';
  icon: (props: SvgIconProps) => JSX.Element;
  size?: 'small' | 'medium';
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

const FormDialog: React.FC<{
  title: string;
  triggerBtn: TriggerButtonDetails;
  children: React.ReactNode;
}> = ({ triggerBtn, children, title }) => {
  const classes = useDialogStyles();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const triggerButton = () => {
    if (triggerBtn.type === 'icon') {
      return (
        <IconButton
          color="primary"
          onClick={handleDialogOpen}
          size={triggerBtn.size || 'medium'}
        >
          <triggerBtn.icon />
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
    <div>
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
