import React, { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Pagination as PaginationMd } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { TextField, Tooltip } from '@material-ui/core';
import { MdAdd } from 'react-icons/md';
import { Container, MealsList } from './styles';

import {
  getMealRequest,
  deleteMealRequest,
} from '~/store/modules/meal/actions';
import Loading from '~/components/Loading';
import Card from '~/components/Card';
import Avatar from '~/components/Avatar';
import { Pagination } from '../Event/styles';
import { CircleButton } from '~/components/Button/styles';

export default function Meal() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const meals = useSelector(state => state.meal.meals);
  const loading = useSelector(state => state.meal.loading);
  const count = useSelector(state => state.meal.count);

  const loadMeals = useCallback(async () => {
    dispatch(getMealRequest(page, search));
  }, [dispatch, page, search]);

  useEffect(() => {
    loadMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMeals]);

  async function handleRemoveMeal(id) {
    dispatch(deleteMealRequest({ id }, page, search));
  }

  return (
    <>
      <Container>
        <Pagination justify="space-between">
          <DebounceInput
            element={TextField}
            minLength={3}
            placeholder="Buscar...(Minimo 3 letras)"
            debounceTimeout={300}
            onChange={event => setSearch(event.target.value)}
          />
          <PaginationMd
            color="primary"
            count={Math.ceil(count / 10)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
          <Tooltip title="Criar" aria-label="Criar" placement="top">
            <Link to="/meals/create">
              <CircleButton color="success">
                <MdAdd size="18" />
              </CircleButton>
            </Link>
          </Tooltip>
        </Pagination>
        <MealsList>
          {meals.map(meal => (
            <Card
              key={meal.id}
              title={meal.name}
              Image={() => <Avatar image={meal.image} name={meal.name} />}
              editAction={() => history.push(`/meals/${meal.id}`)}
              removeAction={() => handleRemoveMeal(meal.id)}
            />
          ))}
        </MealsList>
      </Container>
      {loading && <Loading />}
    </>
  );
}
