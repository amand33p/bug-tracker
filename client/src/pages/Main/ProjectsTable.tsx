import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProjectState } from '../../redux/types';
import { selectAuthState } from '../../redux/slices/authSlice';
import { formatDateTime } from '../../utils/helperFuncs';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  IconButton,
} from '@material-ui/core';
import { useTableStyles } from '../../styles/muiStyles';
import BlockIcon from '@material-ui/icons/Block';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const tableHeaders = ['Name', 'Bugs', 'Members', 'Admin', 'Created', 'Actions'];

const ProjectsTable: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useTableStyles();
  const history = useHistory();
  const { user } = useSelector(selectAuthState);

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
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
          {projects.map((p) => (
            <TableRow key={p.id}>
              <TableCell
                align="center"
                onClick={() => history.push(`/projects/${p.id}`)}
              >
                <Link
                  component={RouterLink}
                  to={`/projects/${p.id}`}
                  color="secondary"
                >
                  {p.name}
                </Link>
              </TableCell>
              <TableCell align="center">{p.bugs.length}</TableCell>
              <TableCell align="center">{p.members.length}</TableCell>
              <TableCell align="center">{p.createdBy.username}</TableCell>
              <TableCell align="center">
                {formatDateTime(p.createdAt)}
              </TableCell>
              <TableCell align="center">
                {p.createdBy.id === user?.id ? (
                  <IconButton
                    size="small"
                    onClick={() => console.log('table button clicked.')}
                  >
                    <MoreHorizIcon color="primary" fontSize="large" />
                  </IconButton>
                ) : (
                  <BlockIcon color="secondary" fontSize="large" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
