import { Link as RouterLink } from 'react-router-dom';
import { BugState } from '../../redux/types';
import BugsMenu from './BugsMenu';
import { formatDateTime, truncateString } from '../../utils/helperFuncs';
import { priorityStyles, statusStyles } from '../../styles/customStyles';

import { Divider, Typography, Link } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import QuestionAnswerTwoToneIcon from '@material-ui/icons/QuestionAnswerTwoTone';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const BugsListMobile: React.FC<{ bugs: BugState[] }> = ({ bugs }) => {
  const classes = useMainPageStyles();

  return (
    <div>
      <Divider />
      {bugs.map((b, i) => (
        <div
          key={b.id}
          style={{ paddingBottom: i + 1 === bugs.length ? '2em' : 0 }}
        >
          <div className={classes.listItemWrapper}>
            <Link
              component={RouterLink}
              to={`/projects/${b.projectId}/bugs/${b.id}`}
              color="secondary"
              variant="h6"
            >
              {truncateString(b.title, 30)}
              <OpenInNewIcon color="primary" className={classes.gotoIcon} />
            </Link>
            <Typography
              variant="body2"
              color="secondary"
              className={classes.marginText}
            >
              Priority:{' '}
              <div
                style={{
                  ...priorityStyles(b.priority),
                  display: 'inline',
                  padding: '0.15em 0.4em',
                  textTransform: 'capitalize',
                }}
              >
                {b.priority}
              </div>
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              className={classes.marginText}
            >
              Status:{' '}
              <div
                style={{
                  ...statusStyles(b.isResolved),
                  display: 'inline',
                  padding: '0.20em 0.4em',
                }}
              >
                {b.isResolved ? 'Closed' : 'Open'}
              </div>
            </Typography>
            <Typography variant="body2" color="secondary">
              Created:{' '}
              <strong>
                {formatDateTime(b.createdAt)} ~ {b.createdBy.username}
              </strong>
            </Typography>
            <Typography variant="body2" color="secondary">
              Updated:{' '}
              <strong>
                {!b.updatedAt || !b.updatedBy
                  ? 'n/a'
                  : `${formatDateTime(b.updatedAt)} ~ ${b.updatedBy.username}`}
              </strong>
            </Typography>
            <div className={classes.flexedWrapper}>
              <div className={classes.iconText}>
                <QuestionAnswerTwoToneIcon color="secondary" />
                <Typography variant="subtitle1" color="secondary">
                  : {b.notes.length}
                </Typography>
              </div>
              <BugsMenu
                projectId={b.projectId}
                bugId={b.id}
                currentData={{
                  title: b.title,
                  description: b.description,
                  priority: b.priority,
                }}
                isResolved={b.isResolved}
                iconSize="default"
              />
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default BugsListMobile;
