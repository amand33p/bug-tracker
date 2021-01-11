import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  selectProjectsState,
} from '../../redux/slices/projectsSlice';
import ProjectsTable from './ProjectsTable';

import { Paper, Typography } from '@material-ui/core';
import { useProjectsPageStyles } from '../../styles/muiStyles';

const ProjectsPage = () => {
  const classes = useProjectsPageStyles();
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector(selectProjectsState);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h5" color="secondary">
          Projects
        </Typography>
      </Paper>
      <Paper>
        <ProjectsTable projects={projects} />
      </Paper>
    </div>
  );
};

export default ProjectsPage;
