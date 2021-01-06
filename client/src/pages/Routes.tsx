import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';

const Routes = () => {
  const user = false; //placeholder

  return (
    <Switch>
      <Route exact path="/">
        <h1>home</h1>
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
