import React from 'react';
import { Note } from '../../redux/types';

import { Paper, Typography, Divider, Button } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

const NotesCard: React.FC<{ notes: Note[] }> = ({ notes }) => {
  const classes = useMainPageStyles();

  return (
    <Paper className={classes.notesPaper}>
      <Typography variant="h5" color="secondary" className={classes.flexHeader}>
        <ForumOutlinedIcon fontSize="large" style={{ marginRight: '0.2em' }} />
        Notes
      </Typography>
    </Paper>
  );
};

export default NotesCard;
