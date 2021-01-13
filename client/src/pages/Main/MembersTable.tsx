import React from 'react';
import { ProjectMember } from '../../redux/types';
import { formatDateInWords } from '../../utils/helperFuncs';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
} from '@material-ui/core';
import { useTableStyles } from '../../styles/muiStyles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const memberHeaders = ['ID', 'Username', 'Role', 'Joined'];

const MembersTable: React.FC<{
  members: ProjectMember[];
  adminId: string;
  isAdmin: boolean;
}> = ({ members, adminId, isAdmin }) => {
  const classes = useTableStyles();

  return (
    <Paper className={classes.scrollableTable}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {memberHeaders.map((m) => (
              <TableCell key={m} align="center">
                {m}
              </TableCell>
            ))}
            {isAdmin && <TableCell align="center">Remove</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell align="center">{m.id}</TableCell>
              <TableCell align="center">{m.member.username}</TableCell>
              <TableCell align="center">
                {m.member.id === adminId ? 'Admin' : 'Member'}
              </TableCell>
              <TableCell align="center">
                {formatDateInWords(m.joinedAt)}
              </TableCell>
              {isAdmin && (
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => console.log('table button clicked.')}
                  >
                    <HighlightOffIcon color="primary" fontSize="large" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MembersTable;
