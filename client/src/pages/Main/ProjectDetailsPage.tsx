import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProjectById } from '../../redux/slices/projectsSlice';
import { selectAuthState } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import MembersTable from './MembersTable';
import FilterBar from '../../components/FilterBar';
import BugsCard from './BugsCard';
import { formatDateTime } from '../../utils/helperFuncs';

import {
  Paper,
  Typography,
  IconButton,
  Button,
  Collapse,
} from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupIcon from '@material-ui/icons/Group';

interface ParamTypes {
  projectId: string;
}

const ProjectDetailsPage = () => {
  const classes = useMainPageStyles();
  const { projectId } = useParams<ParamTypes>();
  const [filterValue, setFilterValue] = useState('');
  const [viewMembers, setViewMembers] = useState(false);
  const { user } = useSelector(selectAuthState);
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  if (!project) {
    return <div>404: Project not found.</div>;
  }

  const { name, members, createdAt, updatedAt, createdBy } = project;

  const isAdmin = createdBy.id === user?.id;

  const filteredMembers = members.filter((m) =>
    m.member.username.toLowerCase().includes(filterValue.toLowerCase())
  );

  const membersDataToDisplay = () => {
    if (filteredMembers.length === 0) {
      return <div>No matches found.</div>;
    } else {
      return (
        <div style={{ marginTop: '1em' }}>
          <MembersTable
            members={filteredMembers}
            adminId={createdBy.id}
            isAdmin={isAdmin}
          />
        </div>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.detailsHeader}>
        <div className={classes.iconHeader}>
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
            {members.length > 1 && (
              <Button
                color="secondary"
                variant="outlined"
                startIcon={
                  viewMembers ? <ExpandLessIcon /> : <ExpandMoreIcon />
                }
                onClick={() => setViewMembers(!viewMembers)}
                style={{ marginRight: '1em' }}
              >
                {viewMembers ? 'Hide Members' : 'View Members'}
              </Button>
            )}
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
          <Collapse
            in={viewMembers}
            timeout="auto"
            unmountOnExit
            className={classes.membersWrapper}
          >
            <div className={classes.membersBar}>
              <Typography
                variant="h5"
                color="secondary"
                className={classes.iconHeader}
              >
                <GroupIcon fontSize="large" style={{ marginRight: '0.2em' }} />
                Members
              </Typography>
              <FilterBar
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                label="Members"
                size="small"
              />
            </div>
            {membersDataToDisplay()}
          </Collapse>
        )}
      </Paper>
      <BugsCard projectId={projectId} />
    </div>
  );
};

export default ProjectDetailsPage;
