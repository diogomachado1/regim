import React, { useState, useCallback, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Container, MealsList } from './styles';
import { Button } from '~/components/Button';

import {
  getMealRequest,
  deleteMealRequest,
} from '~/store/modules/meal/actions';

export default function Meal() {
  const dispatch = useDispatch();

  const meals = useSelector(state => state.meal.meals);

  const loadMeals = useCallback(async () => {
    dispatch(getMealRequest());
  }, [dispatch]);

  useEffect(() => {
    loadMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMeals]);

  async function handleRemoveMeal(id) {
    dispatch(deleteMealRequest({ id }));
  }

  return (
    <Container>
      <Link to="/meals/create">
        <Button onClick={() => {}}>
          <MdAddCircleOutline size="24" />
          Add
        </Button>
      </Link>
      <MealsList>
        {meals.map(meal => (
          <li key={meal.id}>
            <div>
              <a href={meal.link}>{meal.name}</a>
              <Button onClick={() => handleRemoveMeal(meal.id)} color="#FA6980">
                remover
              </Button>
            </div>
          </li>
        ))}
      </MealsList>
    </Container>
  );
}
