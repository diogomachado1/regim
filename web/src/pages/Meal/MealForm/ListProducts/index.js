import React from 'react';

import { MdAddCircleOutline, MdClose, MdEdit } from 'react-icons/md';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch } from 'react-redux';
import {
  Container,
  AddButtonContainer,
  DivProducts,
  CloseButton,
  EditButton,
} from './styles';
import { Button } from '~/components/Button';
import { deleteProductRequest } from '~/store/modules/product/actions';

export default function ListProducts({
  products,
  ingredients,
  addOrRemoveIngredient,
  openProductModal,
}) {
  const dispatch = useDispatch();
  return (
    <Container>
      <AddButtonContainer>
        <Button
          type="button"
          onClick={() => {
            openProductModal();
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
                <CloseButton
                  onClick={() => {
                    dispatch(deleteProductRequest(item));
                  }}
                >
                  <MdClose size="14" />
                </CloseButton>
                <EditButton
                  onClick={() => {
                    openProductModal(item);
                  }}
                >
                  <MdEdit size="14" />
                </EditButton>
              </li>
            ))}
        </PerfectScrollbar>
      </DivProducts>
    </Container>
  );
}
