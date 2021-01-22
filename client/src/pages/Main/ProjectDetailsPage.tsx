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

import {
  Paper,
  Typography,
  Button,
  IconButton,
  Divider,
  useMediaQuery,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useMainPageStyles } from '../../styles/muiStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

interface ParamTypes {
  projectId: string;
}

const ProjectDetailsPage = () => {
  const classes = useMainPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { projectId } = useParams<ParamTypes>();
  const history = useHistory();
  const dispatch = useDispatch();
  const [viewMembers, setViewMembers] = useState(false);
  const { user } = useSelector(selectAuthState);
  const projectInState = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  if (!projectInState) {
    return <div>404: Project not found.</div>;
  }

  const { id, name, members, createdAt, updatedAt, createdBy } = projectInState;

  const isAdmin = createdBy.id === user?.id;

  const handleDeleteProject = () => {
    dispatch(deleteProject(id, history));
  };

  const handleLeaveProject = () => {
    dispatch(leaveProjectMembership(id, history));
  };

  const showMembersBtn = () => {
    if (members.length < 2) return null;

    if (isMobile) {
      return (
        <IconButton
          color="secondary"
          onClick={() => setViewMembers(!viewMembers)}
          style={{ marginRight: '1em' }}
          className={classes.iconButton}
        >
          {!viewMembers ? <PeopleAltTwoToneIcon /> : <PeopleAltIcon />}
        </IconButton>
      );
    } else {
      return (
        <Button
          color="secondary"
          variant="outlined"
          startIcon={viewMembers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setViewMembers(!viewMembers)}
          style={{ marginRight: '1em' }}
        >
          {viewMembers ? 'Hide Members' : 'View Members'}
        </Button>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.detailsHeader}>
        <div className={classes.flexHeader}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
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
          {showMembersBtn()}
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
