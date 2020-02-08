import React from 'react';

import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Container, UlIngredients, CloseButton } from './styles';
import InputCustom from '~/components/Input';

export default function ListIngredients({
  ingredients,
  removeIngredient,
  register,
  errors,
}) {
  const products = useSelector(state => state.product.products);

  const list = () => {
    return ingredients.map((item, i) => {
      const find = products.find(product => product.id === item.productId);
      if (find) {
        return (
          <li key={item.productId}>
            <span>{find.name}</span>
            <div>
              <InputCustom
                name={`ingredients[${i}].amount`}
                placeholder="Quantidade"
                register={register}
                error={
                  errors.ingredients &&
                  errors.ingredients[i] &&
                  errors.ingredients[i].amount
                }
              />
              <InputCustom
                value={item.productId}
                onChange={() => item.productId}
                name={`ingredients[${i}].productId`}
                type="number"
                hidden
                register={register}
                error={
                  errors.ingredients &&
                  errors.ingredients[i] &&
                  errors.ingredients[i].productId
                }
              />
            </div>
            <CloseButton
              onClick={() => removeIngredient({ id: item.productId })}
            >
              <MdClose size="20" />
            </CloseButton>
          </li>
        );
      }
      removeIngredient({ id: item.productId });
      return undefined;
    });
  };
  return (
    <Container>
      <UlIngredients>{ingredients && list()}</UlIngredients>
    </Container>
  );
}
