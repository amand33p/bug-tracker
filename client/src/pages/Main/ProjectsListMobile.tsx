import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProjectState } from '../../redux/types';
import { selectAuthState } from '../../redux/slices/authSlice';
import { formatDateTime, truncateString } from '../../utils/helperFuncs';

import { Divider, Typography, Link } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import BugReportTwoToneIcon from '@material-ui/icons/BugReportTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const ProjectsListMobile: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useMainPageStyles();
  const history = useHistory();
  const { user } = useSelector(selectAuthState);

  return (
    <div>
      <Divider />
      {projects.map((p) => (
        <div key={p.id}>
          <div className={classes.listItemWrapper}>
            <Link
              component={RouterLink}
              to={`/projects/${p.id}`}
              color="secondary"
              variant="h6"
            >
              {truncateString(p.name, 30)}
            </Link>
            <Typography variant="body2" color="secondary">
              Admin: <strong>{p.createdBy.username}</strong>
            </Typography>
            <Typography variant="body2" color="secondary">
              Created: <strong>{formatDateTime(p.createdAt)}</strong>
            </Typography>
            <div className={classes.countWrapper}>
              <div className={classes.iconText}>
                <BugReportTwoToneIcon color="primary" />
                <Typography variant="subtitle1" color="secondary">
                  : {p.bugs.length}
                </Typography>
              </div>
              <div className={classes.iconText}>
                <PeopleAltTwoToneIcon color="primary" />{' '}
                <Typography variant="subtitle1" color="secondary">
                  : {p.members.length}
                </Typography>
              </div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default ProjectsListMobile;
