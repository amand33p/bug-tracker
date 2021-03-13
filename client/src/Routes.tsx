import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ProjectsPage from './pages/Main/ProjectsPage';
import ProjectDetailsPage from './pages/Main/ProjectDetailsPage';
import BugDetailsPage from './pages/Main/BugsDetailsPage';
import NotFoundPage from './pages/Main/NotFoundPage';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/slices/authSlice';
import storage from './utils/localStorage';

import { Container, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Routes = () => {
  const { user } = useSelector(selectAuthState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const isLoggedIn = storage.loadUser() || user;

  return (
    <Container disableGutters={isMobile}>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <ProjectsPage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/projects/:projectId">
          {isLoggedIn ? <ProjectDetailsPage /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/projects/:projectId/bugs/:bugId">
          {user ? <BugDetailsPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          {!isLoggedIn ? <LoginPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/signup">
          {!isLoggedIn ? <SignupPage /> : <Redirect to="/" />}
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </Container>
  );
};

export default Routes;
