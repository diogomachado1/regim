import React from 'react';

import { Container, UlIngredients } from './styles';

export default function ListIngredients({ ingredients, removeIngredient }) {
  return (
    <Container>
      <UlIngredients>
        {ingredients &&
          ingredients.map(item => (
            <li key={item.productId}>
              <button type="button" onClick={() => removeIngredient(item)}>
                <span>{item.product.name}</span>
              </button>
            </li>
          ))}
      </UlIngredients>
    </Container>
  );
}
