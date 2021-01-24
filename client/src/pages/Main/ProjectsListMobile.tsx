import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ProjectState } from '../../redux/types';
import { selectAuthState } from '../../redux/slices/authSlice';
import ProjectsMenu from './ProjectsMenu';
import { formatDateTime, truncateString } from '../../utils/helperFuncs';

import { Divider, Typography, Link } from '@material-ui/core';
import { useMainPageStyles } from '../../styles/muiStyles';
import BugReportTwoToneIcon from '@material-ui/icons/BugReportTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const ProjectsListMobile: React.FC<{ projects: ProjectState[] }> = ({
  projects,
}) => {
  const classes = useMainPageStyles();
  const { user } = useSelector(selectAuthState);

  return (
    <div>
      <Divider />
      {projects.map((p, i) => (
        <div
          key={p.id}
          style={{ paddingBottom: i + 1 === projects.length ? '2em' : 0 }}
        >
          <div className={classes.listItemWrapper}>
            <Link
              component={RouterLink}
              to={`/projects/${p.id}`}
              color="secondary"
              variant="h6"
            >
              {truncateString(p.name, 30)}
              <OpenInNewIcon color="primary" className={classes.gotoIcon} />
            </Link>
            <Typography variant="body2" color="secondary">
              Admin: <strong>{p.createdBy.username}</strong>
            </Typography>
            <Typography variant="body2" color="secondary">
              Created: <strong>{formatDateTime(p.createdAt)}</strong>
            </Typography>
            <div className={classes.flexedWrapper}>
              <div className={classes.textIconsWrapper}>
                <div className={classes.iconText}>
                  <BugReportTwoToneIcon color="secondary" />
                  <Typography variant="subtitle1" color="secondary">
                    : {p.bugs.length}
                  </Typography>
                </div>
                <div className={classes.iconText}>
                  <PeopleAltTwoToneIcon color="secondary" />{' '}
                  <Typography variant="subtitle1" color="secondary">
                    : {p.members.length}
                  </Typography>
                </div>
              </div>
              <ProjectsMenu
                projectId={p.id}
                currentName={p.name}
                currentMembers={p.members.map((m) => m.member.id)}
                isAdmin={p.createdBy.id === user?.id}
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

export default ProjectsListMobile;
