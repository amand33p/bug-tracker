import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import ProjectsPage from './pages/Projects/ProjectsPage';
import { useSelector } from 'react-redux';
import { selectAuthState } from './redux/slices/authSlice';

const Routes = () => {
  const { user } = useSelector(selectAuthState);

  return (
    <Switch>
      <Route exact path="/">
        {user ? <ProjectsPage /> : <Redirect to="/signup" />}
      </Route>
      <Route exact path="/login">
        {!user ? <LoginPage /> : <Redirect to="/" />}
      </Route>
      <Route exact path="/signup">
        {!user ? <SignupPage /> : <Redirect to="/" />}
      </Route>
    </Switch>
  );
};

export default Routes;
