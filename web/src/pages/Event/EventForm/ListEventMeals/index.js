import React from 'react';

import { useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
import { Container, UlEventMeals, CloseButton } from './styles';
import InputCustom from '~/components/Input';

export default function ListEventMeals({
  eventMeals,
  removeEventMeal,
  register,
  errors,
}) {
  const meals = useSelector(state => state.meal.meals);

  const list = () => {
    return eventMeals.map((item, i) => {
      const find = meals.find(meal => meal.id === item.mealId);
      if (find) {
        return (
          <li key={item.mealId}>
            <span>{find.name}</span>
            <div>
              <InputCustom
                name={`eventMeals[${i}].amount`}
                placeholder="Quantidade"
                register={register}
                error={
                  errors.eventMeals &&
                  errors.eventMeals[i] &&
                  errors.eventMeals[i].amount
                }
              />
              <InputCustom
                value={item.mealId}
                onChange={() => item.mealId}
                name={`eventMeals[${i}].mealId`}
                type="number"
                hidden
                register={register}
                error={
                  errors.eventMeals &&
                  errors.eventMeals[i] &&
                  errors.eventMeals[i].mealId
                }
              />
            </div>
            <CloseButton onClick={() => removeEventMeal({ id: item.mealId })}>
              <MdClose size="20" />
            </CloseButton>
          </li>
        );
      }
      removeEventMeal({ id: item.mealId });
      return undefined;
    });
  };
  return (
    <Container>
      <UlEventMeals>{eventMeals && list()}</UlEventMeals>
    </Container>
  );
}
