import React from 'react';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { Container, DivProducts } from './styles';

export default function ListProducts({
  meals,
  eventMeals,
  addOrRemoveEventMeal,
}) {
  return (
    <Container>
      <DivProducts>
        <PerfectScrollbar>
          {meals &&
            meals.map(item => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => addOrRemoveEventMeal(item)}
                >
                  <span
                    className={
                      eventMeals.find(
                        itemEventMeal => item.id === itemEventMeal.mealId
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
