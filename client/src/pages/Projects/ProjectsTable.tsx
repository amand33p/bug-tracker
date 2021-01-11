import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { ProjectState } from '../../redux/types';
import { formatDateTime } from '../../utils/helperFuncs';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
} from '@material-ui/core';
import { useTableStyles } from '../../styles/muiStyles';

const ProjectsTable: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useTableStyles();
  const history = useHistory();

  const tableHeaders = [
    'Name',
    'Bugs',
    'Members',
    'Owner',
    'Created',
    'Updated',
  ];

  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow>
            {tableHeaders.map((t) => (
              <TableCell key={t}>{t}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((p) => (
            <TableRow
              key={p.id}
              onClick={() => history.push(`/projects/${p.id}`)}
            >
              <TableCell>
                <Link
                  component={RouterLink}
                  to={`/projects/${p.id}`}
                  color="secondary"
                >
                  {p.name}
                </Link>
              </TableCell>
              <TableCell>{p.bugs.length}</TableCell>
              <TableCell>{p.members.length}</TableCell>
              <TableCell>{p.createdBy.username}</TableCell>
              <TableCell>{formatDateTime(p.createdAt)}</TableCell>
              <TableCell>
                {p.createdAt !== p.updatedAt
                  ? formatDateTime(p.updatedAt)
                  : 'n/a'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
