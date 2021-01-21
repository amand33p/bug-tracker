import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ProjectsPage from './pages/Main/ProjectsPage';
import ProjectDetailsPage from './pages/Main/ProjectDetailsPage';
import BugDetailsPage from './pages/Main/BugsDetailsPage';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/slices/authSlice';

import { Container, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Routes = () => {
  const { user: isLoggedIn } = useSelector(selectAuthState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container disableGutters={isMobile}>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <ProjectsPage /> : <Redirect to="/signup" />}
        </Route>
        <Route exact path="/projects/:projectId">
          {isLoggedIn ? <ProjectDetailsPage /> : <Redirect to="/signup" />}
        </Route>
        <Route exact path="/projects/:projectId/bugs/:bugId">
          {isLoggedIn ? <BugDetailsPage /> : <Redirect to="/signup" />}
        </Route>
        <Route exact path="/login">
          {!isLoggedIn ? <LoginPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/signup">
          {!isLoggedIn ? <SignupPage /> : <Redirect to="/" />}
        </Route>
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
    </Container>
  );
};

export default Routes;
