import React from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

const FilterBar: React.FC<{
  filterValue: string;
  setFilterValue: (filterValue: string) => void;
  label: string;
}> = ({ filterValue, setFilterValue, label }) => {
  return (
    <div>
      <div>
        <TextField
          value={filterValue}
          fullWidth
          type="text"
          label={`Search ${label}`}
          variant="outlined"
          onChange={(e) => setFilterValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" fontSize="large" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="start">
                {filterValue !== '' ? (
                  <IconButton onClick={() => setFilterValue('')} size="small">
                    <ClearIcon color="primary" fontSize="large" />
                  </IconButton>
                ) : (
                  <div></div>
                )}
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default FilterBar;
