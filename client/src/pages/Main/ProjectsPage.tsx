import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProjectsState } from '../../redux/slices/projectsSlice';
import ProjectsTable from './ProjectsTable';
import ProjectActionCard from './ProjectsActionCard';
import ProjectsListMobile from './ProjectsListMobile';
import sortProjects from '../../utils/sortProjects';
import LoadingSpinner from '../../components/LoadingSpinner';
import InfoText from '../../components/InfoText';

import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useMainPageStyles } from '../../styles/muiStyles';
import AssignmentIcon from '@material-ui/icons/Assignment';

const ProjectsPage = () => {
  const classes = useMainPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { projects, fetchStatus, fetchError, sortBy } = useSelector(
    selectProjectsState
  );
  const [filterValue, setFilterValue] = useState('');

  const filteredSortedProjects = sortProjects(
    projects.filter((p) =>
      p.name.toLowerCase().includes(filterValue.toLowerCase())
    ),
    sortBy
  );

  const projectsDataToDisplay = () => {
    if (fetchStatus === 'loading') {
      return (
        <LoadingSpinner
          marginTop={isMobile ? '4em' : '9em'}
          size={isMobile ? 60 : 80}
        />
      );
    } else if (fetchStatus === 'succeeded' && projects.length === 0) {
      return (
        <InfoText
          text="No Projects added yet."
          variant={isMobile ? 'h6' : 'h5'}
        />
      );
    } else if (fetchStatus === 'failed' && fetchError) {
      return (
        <InfoText
          text={`Error: ${fetchError}`}
          variant={isMobile ? 'h6' : 'h5'}
        />
      );
    } else if (
      fetchStatus === 'succeeded' &&
      projects.length !== 0 &&
      filteredSortedProjects.length === 0
    ) {
      return (
        <InfoText text="No matches found." variant={isMobile ? 'h6' : 'h5'} />
      );
    } else {
      return (
        <div className={classes.projectsListTable}>
          {!isMobile ? (
            <ProjectsTable projects={filteredSortedProjects} />
          ) : (
            <ProjectsListMobile projects={filteredSortedProjects} />
          )}
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
          <Typography variant={isMobile ? 'h6' : 'h5'} color="secondary">
            All Projects
          </Typography>
          <Typography
            variant={isMobile ? 'caption' : 'subtitle1'}
            color="secondary"
          >
            List of all the created or joined projects.
          </Typography>
        </div>
      </Paper>
      <Paper className={classes.projectsPaper}>
        <ProjectActionCard
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          isMobile={isMobile}
        />
        {projectsDataToDisplay()}
      </Paper>
    </div>
  );
};

export default ProjectsPage;
