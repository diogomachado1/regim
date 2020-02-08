import React, { useCallback, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Container, MealsList } from './styles';
import { Button } from '~/components/Button';

import {
  getMealRequest,
  deleteMealRequest,
} from '~/store/modules/meal/actions';
import Loading from '~/components/Loading';

export default function Meal() {
  const dispatch = useDispatch();

  const meals = useSelector(state => state.meal.meals);
  const loading = useSelector(state => state.meal.loading);

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
    <>
      <Container>
        <Link to="/meals/create">
          <Button color="success" onClick={() => {}}>
            <MdAddCircleOutline size="24" />
            Add
          </Button>
        </Link>
        <MealsList>
          {meals.map(meal => (
            <li key={meal.id}>
              <div>
                <span>{meal.name}</span>
                <Link to={`/meals/${meal.id}`}>
                  <Button color="warning" onClick={() => {}}>
                    Editar
                  </Button>
                </Link>
                <Button
                  onClick={() => handleRemoveMeal(meal.id)}
                  color="danger"
                >
                  remover
                </Button>
              </div>
            </li>
          ))}
        </MealsList>
      </Container>
      {loading && <Loading />}
    </>
  );
}
