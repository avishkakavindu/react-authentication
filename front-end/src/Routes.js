import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './auth/PrivateRoute';
import { UserInfoPage } from './pages/UserInfoPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path='/' exact>
          <UserInfoPage />
        </PrivateRoute>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route path='/signup'>
          <SignUpPage />
        </Route>
      </Switch>
    </Router>
  );
};
