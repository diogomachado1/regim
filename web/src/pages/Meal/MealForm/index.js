import React, { useCallback, useEffect, useState } from 'react';
import InputCustom from '~/components/Input';
import TextareaCustom from '~/components/Textarea';
import { ButtonTerciary, Button } from '~/components/Button';
import { MealFormContainer, ProductList, IngredientList } from './styles';
import api from '~/services/api';

export default function MealForm({ history }) {
  const [products, setProducts] = useState([]);

  const loadProducts = useCallback(async () => {
    const response = await api.get(`/products`);
    setProducts(response.data);
  }, []);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]);

  function handleSubmit(value) {
    console.tron.log(value);
  }

  return (
    <MealFormContainer onSubmit={handleSubmit}>
      <InputCustom name="name" placeholder="Nome" />
      <TextareaCustom name="description" placeholder="Descrição" />
      <IngredientList />
      <div>
        <ProductList>
          {products.map(product => (
            <li key={product.id}>
              <div>
                <a href={product.link}>{product.name}</a>
                <Button onClick={() => {}} color="#FA6980">
                  remover
                </Button>
              </div>
            </li>
          ))}
        </ProductList>
        <div>
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
        </div>
      </div>
    </MealFormContainer>
  );
}
