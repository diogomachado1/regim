import { useParams } from 'react-router-dom';
import React, { useEffect, useCallback, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import InputCustom from '~/components/Input';
import { ButtonTerciary } from '~/components/Button';
import { StyledForm, Buttons } from './styles';
import ListIngredients from './ListIngredients';
import { getProductRequest } from '~/store/modules/product/actions';
import {
  saveMealRequest,
  getOneMealRequest,
  getOneMealInSuccess,
} from '~/store/modules/meal/actions';
import Loading from '~/components/Loading';
import { MealSchema } from '~/validators/mealValidator';
import AutoCompleteDebounce from '~/components/AutoCompleteDebounce';

export default function MealForm({ history }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: MealSchema,
  });

  const meal = useSelector(state => state.meal.editMeal);
  const loading = useSelector(state => state.meal.loading);
  const [ingredients, setIngredients] = useState([]);

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

  function removeIngredient(product) {
    const newIngredient = ingredients.filter(
      ingredient => ingredient.productId !== product.id
    );
    setIngredients(newIngredient);
  }

  function onSumit(value) {
    dispatch(saveMealRequest({ id, ...value }));
  }
  return (
    <>
      <StyledForm
        onSubmit={handleSubmit(onSumit)}
        initialData={id ? meal : {}}
        schema={MealSchema}
      >
        <div>
          <PerfectScrollbar>
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
            <ListIngredients
              ingredients={ingredients}
              removeIngredient={removeIngredient}
              register={register}
              errors={errors}
            />
            <AutoCompleteDebounce
              entity="product"
              list="products"
              request={getProductRequest}
              onSelect={e => {
                if (e) {
                  setIngredients([
                    ...ingredients,
                    { productId: e.id, amount: 0, product: e },
                  ]);
                }
              }}
            />
          </PerfectScrollbar>
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
