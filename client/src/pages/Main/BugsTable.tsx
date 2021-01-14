import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { BugState } from '../../redux/types';
import { formatDateTime } from '../../utils/helperFuncs';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  IconButton,
  Paper,
} from '@material-ui/core';
import { useTableStyles } from '../../styles/muiStyles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const tableHeaders = [
  'Title',
  'Priority',
  'Status',
  'Added',
  'Updated',
  'Notes',
  'Actions',
];

const BugsTable: React.FC<{ bugs: BugState[] }> = ({ bugs }) => {
  const classes = useTableStyles();
  const history = useHistory();

  return (
    <Paper className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((t) => (
              <TableCell key={t} align="center">
                {t}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bugs.map((b) => (
            <TableRow key={b.id}>
              <TableCell
                align="center"
                onClick={() =>
                  history.push(`/projects/${b.projectId}/bugs/${b.id}`)
                }
                className={classes.clickableCell}
              >
                <Link
                  component={RouterLink}
                  to={`/projects/${b.projectId}/bugs/${b.id}`}
                  color="secondary"
                >
                  {b.title}
                </Link>
              </TableCell>
              <TableCell align="center">{b.priority}</TableCell>
              <TableCell align="center">
                {b.isResolved ? 'Closed' : 'Open'}
              </TableCell>
              <TableCell align="center">
                {formatDateTime(b.createdAt)} | By: {b.createdBy.username}
              </TableCell>
              <TableCell align="center">
                {!b.updatedAt || !b.updatedBy
                  ? 'n/a'
                  : `${formatDateTime(b.updatedAt)} | By: ${
                      b.updatedBy.username
                    }`}
              </TableCell>
              <TableCell align="center">{b.notes.length}</TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  onClick={() => console.log('table button clicked.')}
                >
                  <MoreHorizIcon color="primary" fontSize="large" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BugsTable;
