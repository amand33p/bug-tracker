import React from 'react';

import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const SortBar: React.FC<{
  sortBy: string;
  handleSortChange: (e: React.ChangeEvent<{ value: unknown }>) => void;
  menuItems: { value: string; label: string }[];
}> = ({ sortBy, handleSortChange, menuItems }) => {
  return (
    <FormControl variant="outlined">
      <InputLabel id="sort-label">Age</InputLabel>
      <Select
        labelId="sort-label"
        value={sortBy}
        onChange={handleSortChange}
        label="Sort By"
      >
        {menuItems.map((m) => (
          <MenuItem key={m.value} value={m.value}>
            {m.label}
          </MenuItem>
        ))}
        {/*<MenuItem value={"newest"}>Newest</MenuItem>
        <MenuItem value={"oldest"}>Oldest</MenuItem>
        <MenuItem value={"a-z"}>Alphabetically (A - Z)</MenuItem>
        <MenuItem value={"z-a"}>Reverse Alpha (Z - A)</MenuItem>
        <MenuItem value={"most-bugs"}>Most Bugs</MenuItem>
        <MenuItem value={"least-bugs"}>Least Bugs</MenuItem>
        <MenuItem value={"most-members"}>Thirty</MenuItem>
  <MenuItem value={"least-members"}>Thirty</MenuItem>*/}
      </Select>
    </FormControl>
  );
};

export default SortBar;
