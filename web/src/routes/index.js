import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgetPasswordRequest from '~/pages/ForgetPasswordRequest';
import ConfirmEmail from '~/pages/ConfirmEmail';

import Profile from '~/pages/Profile';
import Meal from '../pages/Meal';
import MealForm from '~/pages/Meal/MealForm';
import Product from '../pages/Product';
import PublicProduct from '../pages/PublicProduct';
import Event from '~/pages/Event';
import EventForm from '~/pages/Event/EventForm';
import List from '~/pages/List';
import ForgetPasswordForm from '~/pages/ForgetPassword';
import ProductForm from '~/pages/Product/ProductForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/forgetPasswordRequest" component={ForgetPasswordRequest} />
      <Route path="/forgetPassword/:hash" component={ForgetPasswordForm} />
      <Route path="/confirmEmail/:hash" component={ConfirmEmail} />

      <Route exact path="/meals" component={Meal} isPrivate />
      <Route path="/meals/create" component={MealForm} isPrivate />
      <Route path="/meals/:id" component={MealForm} isPrivate />
      <Route exact path="/products" component={Product} isPrivate />
      <Route path="/products/create" component={ProductForm} isPrivate />
      <Route path="/products/:id" component={ProductForm} isPrivate />
      <Route
        exact
        path="/public_products"
        component={PublicProduct}
        isPrivate
      />
      <Route exact path="/events" component={Event} isPrivate />
      <Route path="/events/create" component={EventForm} isPrivate />
      <Route path="/events/:id" component={EventForm} isPrivate />
      <Route exact path="/list" component={List} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/*" component={() => <Redirect to="/" />} />
    </Switch>
  );
}
