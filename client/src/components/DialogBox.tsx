import React, { useState } from 'react';
import { DialogTitle } from './MuiCustomDialogTitle';
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

const DialogBox: React.FC<{
  title: 'string';
  triggerBtn: TriggerButtonDetails;
  children: React.ReactNode;
}> = ({ triggerBtn, children, title }) => {
  const classes = useDialogStyles();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const triggerButton = () => {
    if (triggerBtn.type === 'normal') {
      return (
        <Button
          startIcon={<triggerBtn.icon color="primary" />}
          onClick={handleModalOpen}
        >
          {triggerBtn.text}
        </Button>
      );
    } else if (triggerBtn.type === 'icon') {
      return (
        <IconButton color="primary" onClick={handleModalOpen}>
          <triggerBtn.icon />
        </IconButton>
      );
    } else {
      return (
        <MenuItem onClick={handleModalOpen}>
          <triggerBtn.icon />
          {triggerBtn.text}
        </MenuItem>
      );
    }
  };

  return (
    <div>
      {triggerButton()}
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleModalClose}>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogBox;
