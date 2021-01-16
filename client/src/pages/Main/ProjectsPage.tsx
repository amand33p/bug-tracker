import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjects,
  selectProjectsState,
} from '../../redux/slices/projectsSlice';
import ProjectsTable from './ProjectsTable';
import ProjectActionCard from './ProjectsActionCard';
import sortProjects from '../../utils/sortProjects';

import { Paper, Typography } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import AssignmentIcon from '@material-ui/icons/Assignment';

const ProjectsPage = () => {
  const classes = useMainPageStyles();
  const dispatch = useDispatch();
  const { projects, fetchStatus, fetchError, sortBy } = useSelector(
    selectProjectsState
  );
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (fetchStatus === 'idle') {
      dispatch(fetchProjects());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSortedProjects = sortProjects(
    projects.filter((p) =>
      p.name.toLowerCase().includes(filterValue.toLowerCase())
    ),
    sortBy
  );

  const projectsDataToDisplay = () => {
    if (fetchStatus === 'loading') {
      return <div>Loading...</div>;
    } else if (fetchStatus === 'succeeded' && projects.length === 0) {
      return <div>No Projects added yet.</div>;
    } else if (fetchStatus === 'failed' && fetchError) {
      return <div>{fetchError}</div>;
    } else if (
      fetchStatus === 'succeeded' &&
      projects.length !== 0 &&
      filteredSortedProjects.length === 0
    ) {
      return <div>No matches found.</div>;
    } else {
      return (
        <div style={{ marginTop: '1.5em' }}>
          <ProjectsTable projects={filteredSortedProjects} />
        </div>
      );
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
      <Paper className={classes.projectsPaper}>
        <ProjectActionCard
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
        {projectsDataToDisplay()}
      </Paper>
    </div>
  );
};

export default ProjectsPage;
