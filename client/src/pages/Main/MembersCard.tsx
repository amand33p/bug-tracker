import React, { useState } from 'react';
import MembersTable from './MembersTable';
import FilterBar from '../../components/FilterBar';
import { ProjectMember } from '../../redux/types';

import { Typography, Collapse } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

const MembersCard: React.FC<{
  members: ProjectMember[];
  viewMembers: boolean;
  adminId: string;
  projectId: string;
}> = ({ members, viewMembers, adminId, projectId }) => {
  const classes = useMainPageStyles();
  const [filterValue, setFilterValue] = useState('');

  const filteredMembers = members.filter((m) =>
    m.member.username.toLowerCase().includes(filterValue.toLowerCase())
  );

  const membersDataToDisplay = () => {
    if (filteredMembers.length === 0) {
      return <div>No matches found.</div>;
    } else {
      return (
        <div style={{ marginTop: '1em' }}>
          <MembersTable
            members={filteredMembers}
            adminId={adminId}
            projectId={projectId}
          />
        </div>
      );
    }
  };

  return (
    <Collapse
      in={viewMembers}
      timeout="auto"
      unmountOnExit
      className={classes.membersWrapper}
    >
      <div className={classes.flexInput}>
        <Typography
          variant="h5"
          color="secondary"
          className={classes.flexHeader}
        >
          <PeopleAltOutlinedIcon
            fontSize="large"
            style={{ marginRight: '0.2em' }}
          />
          Members
        </Typography>
        <FilterBar
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          label="Members"
          size="small"
        />
      </div>
      {membersDataToDisplay()}
    </Collapse>
  );
};

export default MembersCard;
