import React from 'react';

import { MdClose } from 'react-icons/md';
import { Container, UlIngredients, CloseButton } from './styles';
import InputCustom from '~/components/Input';
import NumberInput from '~/components/Input/number';
import Avatar from '~/components/Avatar';

export default function List({
  items,
  removeItem,
  register,
  errors,
  entity,
  entityChild,
  InputProps,
}) {
  const list = () => {
    return items.map((item, i) => {
      return (
        <li key={item.id}>
          <Avatar
            image={item[entityChild].image}
            name={item[entityChild].name}
          />
          <span className="regim-ingredient-name">
            {item[entityChild].name}
          </span>
          <div className="regim-input-amount">
            <NumberInput
              defaultValue={item.amount}
              name={`${entity}[${i}].amount`}
              placeholder="Quantidade"
              InputProps={InputProps?.(item)}
              size="small"
              register={register}
              error={errors?.[entity]?.[i]?.amount}
            />
            <InputCustom
              value={item[`${entityChild}Id`]}
              onChange={() => item[`${entityChild}Id`]}
              name={`${entity}[${i}].[${entityChild}Id]`}
              type="number"
              hidden
              register={register}
              error={errors?.[entity]?.[i]?.[`${entityChild}Id`]}
            />
          </div>
          <CloseButton
            onClick={() => {
              removeItem(i);
            }}
          >
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
