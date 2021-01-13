import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProjectById } from '../../redux/slices/projectsSlice';
import { selectAuthState } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import MembersTable from './MembersTable';
import { formatDateTime } from '../../utils/helperFuncs';

import { Paper, Typography, IconButton, Button } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';

interface ParamTypes {
  projectId: string;
}

const SingleProjectPage = () => {
  const classes = useMainPageStyles();
  const { projectId } = useParams<ParamTypes>();
  const { user } = useSelector(selectAuthState);
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  if (!project) {
    return <div>404: Project not found.</div>;
  }

  const { name, members, createdAt, updatedAt, createdBy } = project;

  const isAdmin = createdBy.id === user?.id;

  return (
    <div className={classes.root}>
      <Paper className={classes.detailsHeader}>
        <div className={classes.projectName}>
          <Typography variant="h4" color="secondary">
            <strong>{name}</strong>
          </Typography>
          {isAdmin && (
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
          )}
        </div>
        <Typography variant="subtitle2" color="secondary">
          Admin: <em>{createdBy.username}</em>
        </Typography>
        <Typography variant="subtitle2" color="secondary">
          Created At: <em>{formatDateTime(createdAt)}</em>
        </Typography>
        {createdAt !== updatedAt && (
          <Typography variant="subtitle2" color="secondary">
            Updated At: <em>{formatDateTime(updatedAt)}</em>
          </Typography>
        )}
        {isAdmin && (
          <div className={classes.btnsWrapper}>
            <Button
              color="primary"
              variant="contained"
              startIcon={<DeleteOutlineIcon />}
              style={{ marginRight: '1em' }}
            >
              Delete Project
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<GroupAddOutlinedIcon />}
            >
              Add Members
            </Button>
          </div>
        )}
        {members.length > 1 && (
          <div style={{ marginTop: '1.5em' }}>
            <Typography variant="h6" color="secondary">
              Members
            </Typography>
            <MembersTable
              members={members}
              adminId={createdBy.id}
              isAdmin={isAdmin}
            />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default SingleProjectPage;
