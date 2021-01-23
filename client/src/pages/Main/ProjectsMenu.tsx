import { useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  deleteProject,
  leaveProjectMembership,
} from '../../redux/slices/projectsSlice';
import ConfirmDialog from '../../components/ConfirmDialog';
import FormDialog from '../../components/FormDialog';
import ProjectForm from './ProjectForm';

import { Menu, IconButton, MenuItem } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

interface ProjectsMenuProps {
  projectId: string;
  currentName: string;
  currentMembers: string[];
  isAdmin: boolean;
  iconSize?: 'small' | 'default' | 'large';
}

const ProjectsMenu: React.FC<ProjectsMenuProps> = ({
  projectId,
  currentName,
  currentMembers,
  isAdmin,
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

  const handleDeleteProject = () => {
    dispatch(deleteProject(projectId, history));
  };

  const handleLeaveProject = () => {
    dispatch(leaveProjectMembership(projectId, history));
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
          to={`/projects/${projectId}`}
        >
          <OpenInNewIcon style={{ marginRight: '10px' }} />
          Project Details
        </MenuItem>
        {!isAdmin && (
          <ConfirmDialog
            title="Confirm Leave Project"
            contentText="Are you sure you want to leave the project's membership?"
            actionBtnText="Leave Project"
            triggerBtn={{
              type: 'menu',
              text: 'Leave Project',
              icon: ExitToAppOutlinedIcon,
              iconStyle: { marginRight: '10px' },
              closeMenu: handleCloseMenu,
            }}
            actionFunc={handleLeaveProject}
          />
        )}
        {isAdmin && (
          <div>
            <FormDialog
              triggerBtn={{
                type: 'menu',
                icon: EditOutlinedIcon,
                text: 'Edit Name',
                iconStyle: { marginRight: '10px' },
                closeMenu: handleCloseMenu,
              }}
              title="Edit the project name"
            >
              <ProjectForm
                editMode="name"
                currentName={currentName}
                projectId={projectId}
              />
            </FormDialog>
            <FormDialog
              triggerBtn={{
                type: 'menu',
                text: 'Add Members',
                icon: GroupAddOutlinedIcon,
                iconStyle: { marginRight: '10px' },
                closeMenu: handleCloseMenu,
              }}
              title="Add members to project"
            >
              <ProjectForm
                editMode="members"
                currentMembers={currentMembers}
                projectId={projectId}
              />
            </FormDialog>
            <ConfirmDialog
              title="Confirm Delete Project"
              contentText="Are you sure you want to permanently delete your project?"
              actionBtnText="Delete Project"
              triggerBtn={{
                type: 'menu',
                text: 'Delete Project',
                icon: DeleteOutlineIcon,
                iconStyle: { marginRight: '10px' },
                closeMenu: handleCloseMenu,
              }}
              actionFunc={handleDeleteProject}
            />
          </div>
        )}
      </Menu>
    </div>
  );
};

export default ProjectsMenu;
