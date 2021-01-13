import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ProjectsPage from './pages/Main/ProjectsPage';
import SingleProjectPage from './pages/Main/SingleProjectPage';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/slices/authSlice';

import { Container, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

const Routes = () => {
  const { user } = useSelector(selectAuthState);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container disableGutters={isMobile}>
      <Switch>
        <Route exact path="/">
          {user ? <ProjectsPage /> : <Redirect to="/signup" />}
        </Route>
        <Route exact path="/projects/:projectId">
          {user ? <SingleProjectPage /> : <Redirect to="/signup" />}
        </Route>
        <Route exact path="/login">
          {!user ? <LoginPage /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/signup">
          {!user ? <SignupPage /> : <Redirect to="/" />}
        </Route>
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
    </Container>
  );
};

export default Routes;
