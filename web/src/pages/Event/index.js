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
import Loading from '~/components/Loading';

export default function Event() {
  const dispatch = useDispatch();

  const events = useSelector(state => state.event.events);
  const loading = useSelector(state => state.event.loading);

  const loadEvents = useCallback(async () => {
    dispatch(getEventRequest());
  }, [dispatch]);

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadEvents]);

  async function handleRemoveEvent(id) {
    dispatch(deleteEventRequest({ id }));
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
        <EventsList>
          {events.map(meal => (
            <li key={meal.id}>
              <div>
                <span>{meal.eventStartDate}</span>
                <Link to={`/meals/${meal.id}`}>
                  <Button color="warning" onClick={() => {}}>
                    Editar
                  </Button>
                </Link>
                <Button
                  onClick={() => handleRemoveEvent(meal.id)}
                  color="danger"
                >
                  remover
                </Button>
              </div>
            </li>
          ))}
        </EventsList>
      </Container>
      {loading && <Loading />}
    </>
  );
}
