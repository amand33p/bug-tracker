import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BugState } from '../../redux/types';
import { selectAuthState } from '../../redux/slices/authSlice';
import { formatDateTime, truncateString } from '../../utils/helperFuncs';

import { Divider, Typography, Link } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';

const BugsListMobile: React.FC<{ bugs: BugState[] }> = ({ bugs }) => {
  const classes = useMainPageStyles();
  const { user } = useSelector(selectAuthState);

  return <div>test</div>;
};

export default BugsListMobile;
