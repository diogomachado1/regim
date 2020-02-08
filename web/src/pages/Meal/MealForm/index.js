import { useParams } from 'react-router-dom';
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import InputCustom from '~/components/Input';
import { ButtonTerciary } from '~/components/Button';
import { StyledForm, Buttons } from './styles';
import ListIngredients from './ListIngredients';
import ListProducts from './ListProducts';
import ProductModalForm from './ProductModalForm';
import {
  openProductForm,
  closeProductForm,
  getProductRequest,
} from '~/store/modules/product/actions';
import {
  saveMealRequest,
  getOneMealRequest,
  getOneMealInSuccess,
} from '~/store/modules/meal/actions';
import Loading from '~/components/Loading';
import { MealSchema } from '~/validators/mealValidator';

export default function MealForm({ history }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: MealSchema,
  });

  const products = useSelector(state => state.product.products);
  const meal = useSelector(state => state.meal.editMeal);
  const loadingMeal = useSelector(state => state.meal.loading);
  const loadingProduct = useSelector(state => state.product.loading);
  const loading = useMemo(() => loadingMeal || loadingProduct, [
    loadingMeal,
    loadingProduct,
  ]);

  const showProductModal = useSelector(state => state.product.openForm);
  const [editProduct, setEditProduct] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const loadProducts = useCallback(async () => {
    dispatch(getProductRequest());
  }, [dispatch]);

  const loadMeal = useCallback(() => {
    if (id) {
      dispatch(getOneMealRequest(id));
    } else {
      dispatch(getOneMealInSuccess({}));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && meal.ingredients) {
      setIngredients(meal.ingredients);
    }
    reset(meal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meal, id]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    loadMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addIngredient(product) {
    setIngredients([...ingredients, { productId: product.id, amount: 0 }]);
  }

  function removeIngredient(product) {
    setIngredients([
      ...ingredients.filter(item => product.id !== item.productId),
    ]);
  }

  function openProductModal(product) {
    dispatch(openProductForm());
    setEditProduct(product);
  }

  function closeProductModal() {
    dispatch(closeProductForm());
    setEditProduct({});
    loadProducts();
  }

  function addOrRemoveIngredient(product) {
    if (ingredients.find(item => product.id === item.productId)) {
      removeIngredient(product);
    } else {
      addIngredient(product);
    }
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
              removeIngredient={addOrRemoveIngredient}
              register={register}
              errors={errors}
            />
          </PerfectScrollbar>
          <ListProducts
            products={products}
            ingredients={ingredients}
            addOrRemoveIngredient={addOrRemoveIngredient}
            openProductModal={openProductModal}
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

      {showProductModal && (
        <ProductModalForm
          product={editProduct}
          closeProductModal={closeProductModal}
        />
      )}
      {loading && <Loading />}
    </>
  );
}
