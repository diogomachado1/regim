import React from 'react';

import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Scope, Input } from '@rocketseat/unform';
import { Container, UlIngredients, CloseButton } from './styles';
import InputCustom from '~/components/Input';

export default function ListIngredients({ eventMeals, removeEventMeal }) {
  const meals = useSelector(state => state.meal.meals);

  const list = () => {
    return eventMeals.map((item, i) => {
      const find = meals.find(meal => meal.id === item.mealId);
      if (find) {
        return (
          <li key={item.mealId}>
            <Scope key={i} path={`eventMeals[${i}]`}>
              <span>{find.name}</span>
              <div>
                <InputCustom name="amount" placeholder="Quantidade" />
                <InputCustom
                  value={item.mealId}
                  onChange={() => item.mealId}
                  name="mealId"
                  type="number"
                  hidden
                />
              </div>
              <CloseButton onClick={() => removeEventMeal({ id: item.mealId })}>
                <MdClose size="20" />
              </CloseButton>
            </Scope>
          </li>
        );
      }
      removeEventMeal({ id: item.mealId });
    });
  };
  return (
    <Container>
      <UlIngredients>{eventMeals && list()}</UlIngredients>
    </Container>
  );
}
