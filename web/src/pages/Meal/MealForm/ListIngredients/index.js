import React from 'react';

import { MdClose } from 'react-icons/md';
import { Container, UlIngredients, CloseButton } from './styles';
import InputCustom from '~/components/Input';

export default function ListIngredients({
  ingredients,
  removeIngredient,
  register,
  errors,
}) {
  const list = () => {
    return ingredients.map((item, i) => {
      return (
        <li key={item.productId}>
          <span>{item.product.name}</span>
          <div>
            <InputCustom
              name={`ingredients[${i}].amount`}
              placeholder="Quantidade"
              register={register}
              error={errors?.ingredients?.[i]?.amount}
            />
            <InputCustom
              value={item.productId}
              onChange={() => item.productId}
              name={`ingredients[${i}].productId`}
              type="number"
              hidden
              register={register}
              error={errors?.ingredients?.[i]?.productId}
            />
          </div>
          <CloseButton onClick={() => removeIngredient({ id: item.productId })}>
            <MdClose size="20" />
          </CloseButton>
        </li>
      );
    });
  };
  return (
    <Container>
      <UlIngredients>{list()}</UlIngredients>
    </Container>
  );
}
