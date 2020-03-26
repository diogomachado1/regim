import { useParams } from 'react-router-dom';
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import InputCustom from '~/components/Input';
import { ButtonTerciary } from '~/components/Button';

import { StyledForm, Buttons } from './styles';
import ListEventMeals from './ListEventMeals';
import ListMeals from './ListMeals';
import { getMealRequest } from '~/store/modules/meal/actions';
import {
  saveEventRequest,
  getOneEventRequest,
  getOneEventInSuccess,
  saveEventInSuccess,
} from '~/store/modules/event/actions';
import Loading from '~/components/Loading';
import { EventSchema } from '~/validators/eventValidator';
import DatePicker from '~/components/Datepicker';
import SelectCustom from '~/components/Select';

export default function EventForm({ history }) {
  const { register, handleSubmit, errors, reset, watch, setValue } = useForm({
    validationSchema: EventSchema,
    defaultValues: { repeatable: 'not' },
  });

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

  const repeatableWatch = watch('repeatable');

  useEffect(() => console.log(repeatableWatch), [repeatableWatch]);

  useEffect(() => {
    if (id && event.eventMeals) {
      setEventMeals(event.eventMeals);
      const { name, startDate, endDate, duration, repeatable } = event;
      reset({
        name,
        startDate,
        endDate,
        duration,
        repeatable,
        eventMeals: event.eventMeals,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

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

  function onSubmit(value) {
    dispatch(
      saveEventRequest({
        id,
        ...value,
        repeatable: value.repeatable === ' ' ? null : value.repeatable,
      })
    );
  }
  return (
    <>
      {!loading && (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <div>
            <PerfectScrollbar>
              <InputCustom
                name="name"
                placeholder="Nome"
                register={register}
                error={errors.name}
              />
              <SelectCustom
                name="repeatable"
                placeholder="Frequencia"
                register={register}
                error={errors.measure}
                options={[
                  { id: 'not', title: 'Sem repetir' },
                  { id: 'daily', title: 'Diario' },
                  { id: 'weekly', title: 'Semanal' },
                ]}
              />
              <DatePicker
                name="startDate"
                placeholder="Início"
                register={register}
                error={errors.startDate}
                watch={watch}
                setValue={setValue}
              />
              {repeatableWatch !== ' ' && (
                <DatePicker
                  name="endDate"
                  placeholder="Fim"
                  register={register}
                  error={errors.endDate}
                  watch={watch}
                  setValue={setValue}
                />
              )}
              <InputCustom
                name="duration"
                placeholder="Duração"
                register={register}
                error={errors.duration}
              />
              <ListEventMeals
                eventMeals={eventMeals}
                removeEventMeal={addOrRemoveEventMeal}
                register={register}
                errors={errors}
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
                dispatch(saveEventInSuccess());
                history.push('/events');
              }}
            >
              Cancelar
            </ButtonTerciary>
            <ButtonTerciary color="success" type="submit">
              Salvar
            </ButtonTerciary>
          </Buttons>
        </StyledForm>
      )}
      {loading && <Loading />}
    </>
  );
}
