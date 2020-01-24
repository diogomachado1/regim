import React from 'react';

import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Scope } from '@rocketseat/unform';
import { Container, UlIngredients, CloseButton } from './styles';
import InputCustom from '~/components/Input';

export default function ListIngredients({ ingredients, removeIngredient }) {
  const products = useSelector(state => state.product.products);

  const list = () => {
    return ingredients.map((item, i) => {
      const find = products.find(product => product.id === item.productId);
      if (find) {
        return (
          <li key={item.productId}>
            <Scope path={`ingredients.${i}`}>
              <span>{find.name}</span>
              <InputCustom name="amount" placeholder="Quantidade" />
              <InputCustom
                value={item.productId}
                onChange={() => item.productId}
                name="productId"
                type="number"
                hidden
              />
              <CloseButton
                onClick={() => removeIngredient({ id: item.productId })}
              >
                <MdClose size="20" />
              </CloseButton>
            </Scope>
          </li>
        );
      }
      removeIngredient({ id: item.productId });
    });
  };
  return (
    <Container>
      <UlIngredients>{ingredients && list()}</UlIngredients>
    </Container>
  );
}
