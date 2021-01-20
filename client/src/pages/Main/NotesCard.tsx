import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuthState } from '../../redux/slices/authSlice';
import { selectProjectById } from '../../redux/slices/projectsSlice';
import { Note } from '../../redux/types';
import { RootState } from '../../redux/store';
import SortBar from '../../components/SortBar';
import sortNotes from '../../utils/sortNotes';
import { formatTimeAgo } from '../../utils/helperFuncs';

import { Paper, Typography, Button, Avatar, Divider } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';

export type NoteSortValues = 'newest' | 'oldest' | 'updated';

const menuItems = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'updated', label: 'Recently Updated' },
];

const NotesCard: React.FC<{ notes: Note[]; projectId: string }> = ({
  notes,
  projectId,
}) => {
  const classes = useMainPageStyles();
  const { user } = useSelector(selectAuthState);
  const project = useSelector((state: RootState) =>
    selectProjectById(state, projectId)
  );
  const [sortBy, setSortBy] = useState<NoteSortValues>('newest');

  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(e.target.value as NoteSortValues);
  };

  const sortedNotes = sortNotes(notes, sortBy);

  return (
    <Paper className={classes.notesPaper}>
      <div className={classes.flexInput}>
        <Typography
          variant="h5"
          color="secondary"
          className={classes.flexHeader}
        >
          <ForumOutlinedIcon
            fontSize="large"
            style={{ marginRight: '0.2em' }}
          />
          Notes
        </Typography>
        <div style={{ width: '25%' }}>
          <SortBar
            sortBy={sortBy}
            handleSortChange={handleSortChange}
            menuItems={menuItems}
            label="Notes"
            size="small"
          />
        </div>
      </div>
      <Button
        color="primary"
        variant="contained"
        startIcon={<CommentIcon />}
        style={{ marginTop: '1em' }}
      >
        Leave a Note
      </Button>
      <div className={classes.notesWrapper}>
        {sortedNotes.map((n) => (
          <div key={n.id}>
            <div className={classes.singleNote}>
              <Avatar className={classes.avatar}>
                {n.author.username.slice(0, 1)}
              </Avatar>
              <div>
                <Typography color="secondary" variant="caption">
                  {n.author.username}
                </Typography>
                <Typography color="secondary" variant="caption">
                  <em> • {formatTimeAgo(n.createdAt)} ago</em>
                </Typography>
                {n.updatedAt !== n.createdAt && (
                  <Typography color="secondary" variant="caption">
                    {' '}
                    • updated <em>{formatTimeAgo(n.updatedAt)} ago</em>
                  </Typography>
                )}
                <Typography
                  color="secondary"
                  variant="subtitle1"
                  className={classes.noteBody}
                >
                  {n.body}
                </Typography>
                <div className={classes.notesBtnWrapper}>
                  {n.author.id === user?.id && (
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                  )}
                  {(n.author.id === user?.id ||
                    user?.id === project?.createdBy.id) && (
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      style={{ marginLeft: '1em' }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </Paper>
  );
};

export default NotesCard;
