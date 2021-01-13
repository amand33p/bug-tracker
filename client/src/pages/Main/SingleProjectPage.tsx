import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProjectById } from '../../redux/slices/projectsSlice';
import { RootState } from '../../redux/store';
import MembersTable from './MembersTable';
import { formatDateTime } from '../../utils/helperFuncs';

import { Paper, Typography } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';

interface ParamTypes {
  projectId: string;
}

const SingleProjectPage = () => {
  const classes = useMainPageStyles();
  const { projectId } = useParams<ParamTypes>();
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );

  if (!project) {
    return <div>404: Project not found.</div>;
  }

  const { name, members, createdAt, updatedAt, createdBy } = project;

  return (
    <div className={classes.root}>
      <Paper className={classes.detailsHeader}>
        <Typography variant="h4" color="secondary">
          <strong>{name}</strong>
        </Typography>
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
        {members.length > 1 && (
          <MembersTable members={members} adminId={createdBy.id} />
        )}
      </Paper>
    </div>
  );
};

export default SingleProjectPage;
