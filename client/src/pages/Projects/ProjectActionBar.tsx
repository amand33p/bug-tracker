import React, { useState } from 'react';
import FilterBar from '../../components/FilterBar';
import SortBar from '../../components/SortBar';

import { Button } from '@material-ui/core';
import { useProjectActionBarStyles } from '../../styles/muiStyles';
import AddIcon from '@material-ui/icons/Add';

type SortBy =
  | 'newest'
  | 'oldest'
  | 'a-z'
  | 'z-a'
  | 'most-bugs'
  | 'least-bugs'
  | 'most-members'
  | 'least-members';

const menuItems = [{ value: 'newest', label: 'Newest' }];

const ProjectActionBar: React.FC<{
  filterValue: string;
  setFilterValue: (filterValue: string) => void;
}> = ({ filterValue, setFilterValue }) => {
  const classes = useProjectActionBarStyles();
  const [sortBy, setSortBy] = useState<SortBy>('newest');

  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(e.target.value as SortBy);
  };

  return (
    <div>
      <div className={classes.inputs}>
        <div className={classes.searchBarWrapper}>
          <FilterBar
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            label="Projects"
          />
        </div>
        <SortBar
          sortBy={sortBy}
          handleSortChange={handleSortChange}
          menuItems={menuItems}
        />
      </div>
      <Button
        size="large"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Add Project
      </Button>
    </div>
  );
};

export default ProjectActionBar;
