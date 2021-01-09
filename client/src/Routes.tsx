import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useSelector } from 'react-redux';
import { selectAuthState } from './features/authSlice';

const Routes = () => {
  const { user } = useSelector(selectAuthState);

  return (
    <Switch>
      <Route exact path="/">
        {user ? <h1>home</h1> : <Redirect to="/signup" />}
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
