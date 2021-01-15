import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectBugById } from '../../redux/slices/bugsSlice';
import { RootState } from '../../redux/store';
import { formatDateTime } from '../../utils/helperFuncs';

import { Paper, Typography, Divider, Button } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import RedoIcon from '@material-ui/icons/Redo';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

interface ParamTypes {
  projectId: string;
  bugId: string;
}

const BugsDetailsPage = () => {
  const classes = useMainPageStyles();
  const { projectId, bugId } = useParams<ParamTypes>();
  const bug = useSelector((state: RootState) =>
    selectBugById(state, projectId, bugId)
  );

  if (!bug) {
    return (
      <div>
        Bug not found. If not invalid ID, try to re-fetch from bugs page.
      </div>
    );
  }

  const {
    title,
    description,
    priority,
    isResolved,
    createdBy,
    createdAt,
    updatedBy,
    updatedAt,
    closedBy,
    closedAt,
    reopenedBy,
    reopenedAt,
  } = bug;

  return (
    <div className={classes.root}>
      <Paper className={classes.detailsHeader}>
        <Typography variant="h4" color="secondary">
          Bug: <strong>{title}</strong>
        </Typography>
        <Divider style={{ margin: '0.5em 0' }} />
        <Typography color="secondary" variant="h6">
          {description}
        </Typography>
        <Typography color="secondary" variant="subtitle2">
          Status:{' '}
          <strong>
            {reopenedAt ? 'Re-opened' : isResolved ? 'Closed' : 'Open'}
          </strong>
        </Typography>
        <Typography color="secondary" variant="subtitle2">
          Priority: <strong>{priority}</strong>
        </Typography>
        <Typography color="secondary" variant="subtitle2">
          Created: <em>{formatDateTime(createdAt)}</em>{' '}
          <em> -- {createdBy.username}</em>
        </Typography>
        <div className={classes.btnsWrapper}>
          {isResolved ? (
            <Button
              color="primary"
              variant="contained"
              startIcon={<RedoIcon />}
            >
              Re-Open Bug
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              startIcon={<DoneOutlineIcon />}
            >
              Close Bug
            </Button>
          )}
          <Button
            color="primary"
            variant="contained"
            startIcon={<EditOutlinedIcon />}
            style={{ marginLeft: '1em' }}
          >
            Update Bug Info
          </Button>
          <Button
            color="primary"
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
            style={{ marginLeft: '1em' }}
          >
            Delete Project
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default BugsDetailsPage;
