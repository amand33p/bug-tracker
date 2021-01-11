import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  selectProjectsState,
} from '../../redux/slices/projectsSlice';
import ProjectsTable from './ProjectsTable';
import ProjectActionBar from './ProjectActionBar';

import { Paper, Typography } from '@material-ui/core';
import { useProjectsPageStyles } from '../../styles/muiStyles';

const ProjectsPage = () => {
  const classes = useProjectsPageStyles();
  const dispatch = useDispatch();
  const { projects, status, error } = useSelector(selectProjectsState);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(filterValue)
  );

  return (
    <div className={classes.root}>
      <Paper>
        <Typography variant="h5" color="secondary">
          Projects
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <ProjectActionBar
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
        <ProjectsTable projects={filteredProjects} />
      </Paper>
    </div>
  );
};

export default ProjectsPage;
