import React from 'react';
import { useSelector } from 'react-redux';
import { ProjectMember } from '../../redux/types';
import { selectAuthState } from '../../redux/slices/authSlice';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from '@material-ui/core';
import { useTableStyles } from '../../styles/muiStyles';
import ClearIcon from '@material-ui/icons/Clear';

const memberHeaders = ['ID', 'Username', 'Joined At', 'Role'];

const MembersTable: React.FC<{ members: ProjectMember[]; adminId: string }> = ({
  members,
  adminId,
}) => {
  const classes = useTableStyles();
  const { user } = useSelector(selectAuthState);

  return (
    <div className={classes.root}>
      <Typography variant="h6" color="secondary">
        Members
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {memberHeaders.map((m) => (
              <TableCell key={m} align="center">
                {m}
              </TableCell>
            ))}
            {user?.id === adminId && (
              <TableCell align="center">Remove</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell align="center">{m.id}</TableCell>
              <TableCell align="center">{m.member.username}</TableCell>
              <TableCell align="center">Placeholder</TableCell>
              <TableCell align="center">
                {m.member.id === adminId ? 'Admin' : 'Member'}
              </TableCell>
              {user?.id === adminId && (
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => console.log('table button clicked.')}
                  >
                    <ClearIcon color="primary" fontSize="large" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MembersTable;
