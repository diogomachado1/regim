import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputCustom from '~/components/Input';
import TextareaCustom from '~/components/Textarea';
import { ButtonTerciary } from '~/components/Button';

import { StyledForm, Buttons } from './styles';
import api from '~/services/api';
import ListIngredients from './ListIngredients';
import ListProducts from './ListProducts';
import ProductModalForm from './ProductModalForm';
import {
  openProductForm,
  closeProductForm,
  getProductRequest,
} from '~/store/modules/product/actions';

export default function MealForm({ history }) {
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products);
  const showProductModal = useSelector(state => state.product.openForm);
  const [editProduct, setEditProduct] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const loadProducts = useCallback(async () => {
    dispatch(getProductRequest());
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    console.log(products);
  }, [products]);

  function addIngredient(product) {
    setIngredients([
      ...ingredients,
      { product, productId: product.id, amount: 0 },
    ]);
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

  function handleSubmit(value) {
    console.log(value);
  }
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <InputCustom name="name" placeholder="Nome" />
          <TextareaCustom name="description" placeholder="Descrição" />
          <ListIngredients
            ingredients={ingredients}
            removeIngredient={addOrRemoveIngredient}
          />
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
    </>
  );
}
