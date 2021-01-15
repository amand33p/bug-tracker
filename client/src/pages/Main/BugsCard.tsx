import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBugsByProjectId,
  selectBugsByProjectId,
  selectBugsState,
} from '../../redux/slices/bugsSlice';
import { RootState } from '../../redux/store';
import BugsTable from './BugsTable';
import BugsActionCard from './BugsActionCard';
import sortBugs from '../../utils/sortBugs';

import { Paper, Typography } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';

const BugsCard: React.FC<{ projectId: string }> = ({ projectId }) => {
  const classes = useMainPageStyles();
  const dispatch = useDispatch();
  const bugs = useSelector((state: RootState) =>
    selectBugsByProjectId(state, projectId)
  );
  const { loading, error, sortBy } = useSelector(selectBugsState);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    if (!bugs) {
      dispatch(fetchBugsByProjectId(projectId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredSortedProjects =
    bugs &&
    sortBugs(
      bugs.filter((b) =>
        b.title.toLowerCase().includes(filterValue.toLowerCase())
      ),
      sortBy
    );

  const bugsDataToDisplay = () => {
    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error}</div>;
    } else if (!bugs || bugs.length === 0) {
      return <div>No bugs added yet.</div>;
    } else if (filteredSortedProjects.length === 0) {
      return <div>No matches found.</div>;
    } else {
      return <BugsTable bugs={bugs} />;
    }
  };

  return (
    <Paper className={classes.bugsPaper}>
      <Typography variant="h5" color="secondary" className={classes.flexHeader}>
        <BugReportOutlinedIcon
          fontSize="large"
          style={{ marginRight: '0.2em' }}
        />
        Bugs
      </Typography>
      <div style={{ margin: '1.5em 0' }}>
        <BugsActionCard
          filterValue={filterValue}
          setFilterValue={setFilterValue}
        />
      </div>
      {bugsDataToDisplay()}
    </Paper>
  );
};

export default BugsCard;
