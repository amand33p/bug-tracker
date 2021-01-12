import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  selectProjectsState,
} from '../../redux/slices/projectsSlice';
import ProjectsTable from './ProjectsTable';
import ProjectActionBar from './ProjectActionBar';
import sortProjects from '../../utils/sortProjects';

import { Paper, Typography } from '@material-ui/core';
import { useProjectsPageStyles } from '../../styles/muiStyles';
import AssignmentIcon from '@material-ui/icons/Assignment';

const ProjectsPage = () => {
  const classes = useProjectsPageStyles();
  const dispatch = useDispatch();
  const { projects, status, error, sortBy } = useSelector(selectProjectsState);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProjects());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const filteredSortedProjects = sortProjects(
    projects.filter((p) => p.name.toLowerCase().includes(filterValue)),
    sortBy
  );

  const dataToDisplay = () => {
    if (status === 'loading') {
      return <div>Loading...</div>;
    } else if (status === 'succeeded' && projects.length === 0) {
      return <div>No Projects added yet.</div>;
    } else if (status === 'failed' && error) {
      return <div>{error}</div>;
    } else if (
      status === 'succeeded' &&
      projects.length !== 0 &&
      filteredSortedProjects.length === 0
    ) {
      return <div>No matches found.</div>;
    } else {
      return <ProjectsTable projects={filteredSortedProjects} />;
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.headerPaper}>
        <AssignmentIcon
          fontSize="large"
          color="primary"
          className={classes.headerIcon}
        />
        <div>
          <Typography variant="h5" color="secondary">
            All Projects
          </Typography>
          <Typography variant="body2" color="secondary">
            Projects you created or joined.
          </Typography>
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <ProjectActionBar
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
        {dataToDisplay()}
      </Paper>
    </div>
  );
};

export default ProjectsPage;
