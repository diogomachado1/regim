import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import InputCustom from '~/components/Input';
import { ButtonTerciary } from '~/components/Button';

import { StyledForm, Buttons } from './styles';
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
import List from '~/components/List';
import AutoCompleteDebounce from '~/components/AutoCompleteDebounce';

export default function EventForm() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    errors,
    reset,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    validationSchema: EventSchema,
    defaultValues: { repeatable: 'not' },
  });
  useEffect(() => {
    console.tron.log(errors);
  }, [errors]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'eventMeals',
  });

  const dispatch = useDispatch();
  const { id } = useParams();

  const event = useSelector(state => state.event.editEvent);
  const loading = useSelector(state => state.event.loading);

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
      reset(event);
    }
  }, [event, id, reset]);

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);
  function removeMeal(index) {
    remove(index);
  }

  function verifyMeal(meal) {
    return getValues({ nest: true }).eventMeals?.find(item => {
      return Number(item.mealId) === meal.id;
    });
  }

  function addMeal(meal) {
    if (meal && !verifyMeal(meal)) {
      console.tron.log({ mealId: meal.id, meal });
      append({ mealId: meal.id, meal });
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
              <div className="regim-date-group">
                <DatePicker
                  name="startDate"
                  placeholder="Início"
                  register={register}
                  error={errors.startDate}
                  watch={watch}
                  setValue={setValue}
                />
                <DatePicker
                  name="endDate"
                  placeholder="Fim"
                  register={register}
                  error={errors.endDate}
                  watch={watch}
                  setValue={setValue}
                />
              </div>
              <InputCustom
                name="duration"
                placeholder="Duração"
                register={register}
                error={errors.duration}
              />
              <AutoCompleteDebounce
                entity="meal"
                list="meals"
                placeholder="Adicionar Refeição"
                request={getMealRequest}
                onSelect={e => addMeal(e)}
              />
              <List
                entity="eventMeals"
                entityChild="meal"
                items={fields}
                removeItem={removeMeal}
                register={register}
                errors={errors}
              />
            </PerfectScrollbar>
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
