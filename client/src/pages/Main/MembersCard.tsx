import React, { useState } from 'react';
import MembersTable from './MembersTable';
import FilterBar from '../../components/FilterBar';
import { ProjectMember } from '../../redux/types';
import InfoText from '../../components/InfoText';

import { Typography, Collapse } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';

const MembersCard: React.FC<{
  members: ProjectMember[];
  viewMembers: boolean;
  adminId: string;
  projectId: string;
  isMobile: boolean;
}> = ({ members, viewMembers, adminId, projectId, isMobile }) => {
  const classes = useMainPageStyles();
  const [filterValue, setFilterValue] = useState('');

  const filteredMembers = members.filter((m) =>
    m.member.username.toLowerCase().includes(filterValue.toLowerCase())
  );

  const membersDataToDisplay = () => {
    if (filteredMembers.length === 0) {
      return (
        <InfoText text="No matches found." variant={isMobile ? 'h6' : 'h5'} />
      );
    } else {
      return (
        <div style={{ marginTop: '1em' }}>
          <MembersTable
            members={filteredMembers}
            adminId={adminId}
            projectId={projectId}
            isMobile={isMobile}
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
          variant={isMobile ? 'h6' : 'h5'}
          color="secondary"
          className={classes.flexHeader}
        >
          <PeopleAltOutlinedIcon
            fontSize={isMobile ? 'default' : 'large'}
            style={{ marginRight: '0.2em' }}
          />
          Members
        </Typography>
        <div className={classes.filterMembersInput}>
          <FilterBar
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            label="Members"
            size="small"
          />
        </div>
      </div>
      {membersDataToDisplay()}
    </Collapse>
  );
};

export default MembersCard;
