import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Profile from '~/pages/Profile';
import MealForm from '~/pages/Meal/MealForm';
import Meal from '../pages/Meal';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route exact path="/meals" component={Meal} isPrivate />
      <Route path="/meals/create" component={MealForm} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/*" component={() => <Redirect to="/" />} />
    </Switch>
  );
}
