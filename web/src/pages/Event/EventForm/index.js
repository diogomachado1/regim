import { useParams } from 'react-router-dom';
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { Select } from '@rocketseat/unform';
import InputCustom from '~/components/Input';
import TextareaCustom from '~/components/Textarea';
import { ButtonTerciary } from '~/components/Button';

import { StyledForm, Buttons } from './styles';
import ListEventMeals from './ListEventMeals';
import ListMeals from './ListMeals';
import { getMealRequest } from '~/store/modules/meal/actions';
import {
  saveEventRequest,
  getOneEventRequest,
  getOneEventInSuccess,
} from '~/store/modules/event/actions';
import Loading from '~/components/Loading';
import { EventSchema } from '~/validators/eventValidator';
import DatePicker from '~/components/Datepicker';

export default function EventForm({ history }) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const meals = useSelector(state => state.meal.meals);
  const loadingMeal = useSelector(state => state.meal.loading);
  const event = useSelector(state => state.event.editEvent);
  const loadingEvent = useSelector(state => state.event.loading);
  const loading = useMemo(() => loadingEvent || loadingMeal, [
    loadingEvent,
    loadingMeal,
  ]);

  const [eventMeals, setEventMeals] = useState([]);

  const loadMeals = useCallback(async () => {
    dispatch(getMealRequest());
    if (id) {
      dispatch(getOneEventRequest(id));
    } else {
      dispatch(getOneEventInSuccess({}));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && event.eventMeals) {
      setEventMeals(event.eventMeals);
    }
  }, [event, id]);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  function addEventMeal(meal) {
    setEventMeals([...eventMeals, { mealId: meal.id, amount: 0 }]);
  }

  function removeEventMeal(meal) {
    setEventMeals([...eventMeals.filter(item => meal.id !== item.mealId)]);
  }

  function addOrRemoveEventMeal(meal) {
    if (eventMeals.find(item => meal.id === item.mealId)) {
      removeEventMeal(meal);
    } else {
      addEventMeal(meal);
    }
  }

  function handleSubmit(value) {
    dispatch(saveEventRequest({ id, ...value }));
  }
  return (
    <>
      <StyledForm
        onSubmit={handleSubmit}
        initialData={id ? event : {}}
        schema={EventSchema}
      >
        <div>
          <PerfectScrollbar>
            <InputCustom name="name" placeholder="Nome" />
            <DatePicker
              name="startDate"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
            />
            <DatePicker name="endDate" />
            <InputCustom name="duration" placeholder="Duração" />
            <Select
              name="repeatable"
              options={[
                { id: 'daily', title: 'Diario' },
                { id: 'weekly', title: 'Semanal' },
                { id: null, title: 'Sem repetir' },
              ]}
            />
            <ListEventMeals
              eventMeals={eventMeals}
              removeEventMeal={addOrRemoveEventMeal}
            />
          </PerfectScrollbar>
          <ListMeals
            meals={meals}
            eventMeals={eventMeals}
            addOrRemoveEventMeal={addOrRemoveEventMeal}
          />
        </div>
        <Buttons>
          <ButtonTerciary
            type="button"
            color="danger"
            onClick={() => {
              history.goBack();
            }}
          >
            Cancelar
          </ButtonTerciary>
          <ButtonTerciary color="success" type="submit">
            Salvar
          </ButtonTerciary>
        </Buttons>
      </StyledForm>
      {loading && <Loading />}
    </>
  );
}
