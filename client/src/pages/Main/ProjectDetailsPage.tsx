import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProjectById,
  deleteProject,
  leaveProjectMembership,
} from '../../redux/slices/projectsSlice';
import { selectAuthState } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import ProjectForm from './ProjectForm';
import MembersCard from './MembersCard';
import BugsCard from './BugsCard';
import ConfirmDialog from '../../components/ConfirmDialog';
import FormDialog from '../../components/FormDialog';
import { formatDateTime } from '../../utils/helperFuncs';

import { Paper, Typography, Button, Divider } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

interface ParamTypes {
  projectId: string;
}

const ProjectDetailsPage = () => {
  const classes = useMainPageStyles();
  const { projectId } = useParams<ParamTypes>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [viewMembers, setViewMembers] = useState(false);
  const { user } = useSelector(selectAuthState);
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  if (!project) {
    return <div>404: Project not found.</div>;
  }

  const { id, name, members, createdAt, updatedAt, createdBy } = project;

  const isAdmin = createdBy.id === user?.id;

  const handleDeleteProject = () => {
    dispatch(deleteProject(id, history));
  };

  const handleLeaveProject = () => {
    dispatch(leaveProjectMembership(id, history));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.detailsHeader}>
        <div className={classes.flexHeader}>
          <Typography
            variant="h4"
            color="secondary"
            style={{ marginRight: '0.2em' }}
          >
            <strong>{name}</strong>
          </Typography>
          {isAdmin && (
            <FormDialog
              triggerBtn={{ type: 'icon', icon: EditIcon, size: 'small' }}
              title="Edit the project name"
            >
              <ProjectForm editMode="name" currentName={name} projectId={id} />
            </FormDialog>
          )}
        </div>
        <Divider style={{ margin: '0.5em 0' }} />
        <Typography variant="subtitle2" color="secondary">
          Admin: <strong>{createdBy.username}</strong>
        </Typography>
        <Typography variant="subtitle2" color="secondary">
          Created At: <em>{formatDateTime(createdAt)}</em>
        </Typography>
        {createdAt !== updatedAt && (
          <Typography variant="subtitle2" color="secondary">
            Updated At: <em>{formatDateTime(updatedAt)}</em>
          </Typography>
        )}
        <div className={classes.btnsWrapper}>
          {members.length > 1 && (
            <Button
              color="secondary"
              variant="outlined"
              startIcon={viewMembers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              onClick={() => setViewMembers(!viewMembers)}
              style={{ marginRight: '1em' }}
            >
              {viewMembers ? 'Hide Members' : 'View Members'}
            </Button>
          )}
          {!isAdmin && (
            <ConfirmDialog
              title="Confirm Leave Project"
              contentText="Are you sure you want to leave the project's membership?"
              actionBtnText="Leave Project"
              triggerBtn={{
                type: 'normal',
                text: 'Leave Project',
                icon: ExitToAppOutlinedIcon,
              }}
              actionFunc={handleLeaveProject}
            />
          )}
          {isAdmin && (
            <>
              <FormDialog
                triggerBtn={{
                  type: 'normal',
                  text: 'Add Members',
                  icon: GroupAddOutlinedIcon,
                  style: { marginRight: '1em' },
                }}
                title="Add members to the project"
              >
                <ProjectForm
                  editMode="members"
                  currentMembers={members.map((m) => m.member.id)}
                  projectId={id}
                />
              </FormDialog>
              <ConfirmDialog
                title="Confirm Delete Project"
                contentText="Are you sure you want to permanently delete your project?"
                actionBtnText="Delete Project"
                triggerBtn={{
                  type: 'normal',
                  text: 'Delete Project',
                  icon: DeleteOutlineIcon,
                }}
                actionFunc={handleDeleteProject}
              />
            </>
          )}
        </div>
        {members.length > 1 && (
          <MembersCard
            members={members}
            viewMembers={viewMembers}
            adminId={createdBy.id}
            projectId={id}
          />
        )}
      </Paper>
      <BugsCard projectId={projectId} />
    </div>
  );
};

export default ProjectDetailsPage;
