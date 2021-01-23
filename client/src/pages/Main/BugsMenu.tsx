import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBug, closeReopenBug } from '../../redux/slices/bugsSlice';
import { BugPayload } from '../../redux/types';
import ConfirmDialog from '../../components/ConfirmDialog';
import FormDialog from '../../components/FormDialog';
import BugForm from './BugForm';
import NoteForm from './NoteForm';

import { Menu, IconButton, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import RedoIcon from '@material-ui/icons/Redo';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

interface BugsMenuProps {
  projectId: string;
  bugId: string;
  currentData: BugPayload;
  isResolved: boolean;
  iconSize?: 'small' | 'default' | 'large';
}

const BugsMenu: React.FC<BugsMenuProps> = ({
  projectId,
  bugId,
  currentData,
  isResolved,
  iconSize,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteBug = () => {
    dispatch(deleteBug(projectId, bugId, history));
  };

  const handleCloseBug = () => {
    dispatch(closeReopenBug(projectId, bugId, 'close'));
  };

  const handleReopenBug = () => {
    dispatch(closeReopenBug(projectId, bugId, 'reopen'));
  };

  return (
    <div>
      <IconButton onClick={handleOpenMenu} size="small">
        <MoreHorizIcon color="primary" fontSize={iconSize || 'large'} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        marginThreshold={8}
        elevation={4}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem
          onClick={handleCloseMenu}
          component={RouterLink}
          to={`/projects/${projectId}/bugs/${bugId}`}
        >
          <OpenInNewIcon style={{ marginRight: '10px' }} />
          Bug Details
        </MenuItem>
        {isResolved ? (
          <ConfirmDialog
            title="Re-open the Bug"
            contentText="Are you sure you want to re-open the bug?"
            actionBtnText="Re-open Bug"
            triggerBtn={{
              type: 'menu',
              text: 'Re-open Bug',
              icon: RedoIcon,
              iconStyle: { marginRight: '10px' },
              closeMenu: handleCloseMenu,
            }}
            actionFunc={handleReopenBug}
          />
        ) : (
          <ConfirmDialog
            title="Close the Bug"
            contentText="Are you sure you want to close the bug?"
            actionBtnText="Close Bug"
            triggerBtn={{
              type: 'menu',
              text: 'Close Bug',
              icon: DoneOutlineIcon,
              iconStyle: { marginRight: '10px' },
              closeMenu: handleCloseMenu,
            }}
            actionFunc={handleCloseBug}
          />
        )}
        <FormDialog
          triggerBtn={{
            type: 'menu',
            text: 'Update Bug',
            icon: EditOutlinedIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          title="Edit the bug details"
        >
          <BugForm
            isEditMode={true}
            projectId={projectId}
            bugId={bugId}
            currentData={currentData}
          />
        </FormDialog>
        <ConfirmDialog
          title="Confirm Delete Bug"
          contentText="Are you sure you want to permanently delete the bug?"
          actionBtnText="Delete Bug"
          triggerBtn={{
            type: 'menu',
            text: 'Delete Bug',
            icon: DeleteOutlineIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          actionFunc={handleDeleteBug}
        />
        <FormDialog
          triggerBtn={{
            type: 'menu',
            text: 'Leave A Note',
            icon: CommentOutlinedIcon,
            iconStyle: { marginRight: '10px' },
            closeMenu: handleCloseMenu,
          }}
          title="Post a note"
        >
          <NoteForm isEditMode={false} projectId={projectId} bugId={bugId} />
        </FormDialog>
      </Menu>
    </div>
  );
};

export default BugsMenu;
