import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useCallback } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';

import { InputAdornment } from '@material-ui/core';
import InputCustom from '~/components/Input';
import { ButtonTerciary } from '~/components/Button';
import { StyledForm, Buttons } from './styles';
import { getProductRequest } from '~/store/modules/product/actions';
import {
  saveMealRequest,
  getOneMealRequest,
  getOneMealInSuccess,
} from '~/store/modules/meal/actions';
import Loading from '~/components/Loading';
import { MealSchema } from '~/validators/mealValidator';
import AutoCompleteDebounce from '~/components/AutoCompleteDebounce';
import ImagePicker from '~/components/imagePicker';
import List from '~/components/List';
import { measureUpper } from '~/utils/getMeasure';

export default function MealForm() {
  const history = useHistory();

  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    errors,
    reset,
    getValues,
    setValue,
    control,
  } = useForm({
    validationSchema: MealSchema,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const meal = useSelector(state => state.meal.editMeal);
  const loading = useSelector(state => state.meal.loading);

  useEffect(() => {
    reset(meal);
  }, [meal, reset]);

  const loadMeal = useCallback(() => {
    if (id) {
      dispatch(getOneMealRequest(id));
    } else {
      dispatch(getOneMealInSuccess({}));
    }
  }, [dispatch, id]);

  useEffect(() => {
    loadMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function removeIngredient(index) {
    remove(index);
  }

  function verifyIngredient(product) {
    return getValues({ nest: true })?.ingredient?.find(ingredient => {
      return Number(ingredient.productId) === product.id;
    });
  }

  function addIngredient(event) {
    console.tron.log(verifyIngredient(event));
    if (event && !verifyIngredient(event)) {
      append({ productId: event.id, product: event });
    }
  }

  function onSumit(value) {
    dispatch(saveMealRequest({ id, ...value }));
  }
  return (
    <>
      {loading === false ? (
        <StyledForm
          onSubmit={handleSubmit(onSumit)}
          initialData={id ? meal : {}}
          schema={MealSchema}
        >
          <div>
            <PerfectScrollbar>
              <ImagePicker
                register={register}
                name="imageId"
                setValue={setValue}
                defaultValue={meal.image}
              />
              <InputCustom
                name="name"
                placeholder="Nome"
                register={register}
                error={errors.name}
              />
              <InputCustom
                name="description"
                placeholder="Descrição"
                multiline
                rowsMax="4"
                register={register}
                error={errors.description}
              />
              <AutoCompleteDebounce
                entity="product"
                list="products"
                placeholder="Adicionar Ingrediente"
                request={getProductRequest}
                onSelect={e => addIngredient(e)}
              />
              <List
                entity="ingredients"
                entityChild="product"
                items={fields}
                InputProps={e => ({
                  endAdornment: (
                    <InputAdornment position="end">
                      {measureUpper[e.product.measure]}
                    </InputAdornment>
                  ),
                })}
                removeItem={removeIngredient}
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
                history.push('/meals');
              }}
            >
              Cancelar
            </ButtonTerciary>
            <ButtonTerciary color="success" type="submit">
              Salvar
            </ButtonTerciary>
          </Buttons>
        </StyledForm>
      ) : (
        <Loading />
      )}
    </>
  );
}
