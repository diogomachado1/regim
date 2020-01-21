import React from 'react';

import { MdAddCircleOutline } from 'react-icons/md';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Container, AddButtonContainer, DivProducts } from './styles';
import { Button } from '~/components/Button';
import api from '~/services/api';

export default function ListProducts({
  products,
  ingredients,
  addOrRemoveIngredient,
  openProductModal,
}) {
  return (
    <Container>
      <AddButtonContainer>
        <Button
          onClick={() => {
            openProductModal({});
          }}
        >
          <MdAddCircleOutline size="24" />
        </Button>
      </AddButtonContainer>
      <DivProducts>
        <PerfectScrollbar>
          {products &&
            products.map(item => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => addOrRemoveIngredient(item)}
                >
                  <span
                    className={
                      ingredients.find(
                        ingredient => item.id === ingredient.productId
                      )
                        ? 'actived'
                        : ''
                    }
                  />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
        </PerfectScrollbar>
      </DivProducts>
    </Container>
  );
}
