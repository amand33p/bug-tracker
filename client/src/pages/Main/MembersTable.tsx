import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProjectMember } from '../../redux/types';
import { selectAuthState } from '../../redux/slices/authSlice';
import { removeProjectMember } from '../../redux/slices/projectsSlice';
import ConfirmDialog from '../../components/ConfirmDialog';
import { formatDateInWords } from '../../utils/helperFuncs';

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core';
import { useTableStyles } from '../../styles/muiStyles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BlockIcon from '@material-ui/icons/Block';

const memberHeaders = ['ID', 'Username', 'Role', 'Joined'];

const MembersTable: React.FC<{
  members: ProjectMember[];
  adminId: string;
  projectId: string;
  isMobile: boolean;
}> = ({ members, adminId, projectId, isMobile }) => {
  const classes = useTableStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(selectAuthState);

  const isAdmin = adminId === user?.id;

  const handleRemoveMember = (memberId: string) => {
    dispatch(removeProjectMember(projectId, memberId));
  };

  return (
    <Paper className={classes.scrollableTable}>
      <Table stickyHeader size={isMobile ? 'small' : 'medium'}>
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
              <TableCell align="center">
                {m.member.username} {m.member.id === user?.id && '(You)'}
              </TableCell>
              <TableCell align="center">
                {m.member.id === adminId ? 'Admin' : 'Member'}
              </TableCell>
              <TableCell align="center">
                {formatDateInWords(m.joinedAt)}
              </TableCell>
              {isAdmin && (
                <TableCell align="center">
                  {m.member.id === user?.id ? (
                    <BlockIcon
                      color="secondary"
                      fontSize={isMobile ? 'default' : 'large'}
                    />
                  ) : (
                    <ConfirmDialog
                      title="Confirm Remove Member"
                      contentText={`Are you sure you want to remove ${m.member.username} from your project?`}
                      actionBtnText="Remove Member"
                      triggerBtn={{
                        type: 'icon',
                        iconSize: isMobile ? 'default' : 'large',
                        icon: HighlightOffIcon,
                        size: 'small',
                      }}
                      actionFunc={() => handleRemoveMember(m.member.id)}
                    />
                  )}
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
