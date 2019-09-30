import React, { useState, useCallback, useEffect } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Container, MealsList } from './styles';
import { Button } from '~/components/Button';

import api from '~/services/api';

export default function Meal() {
  const [meals, setMeals] = useState([]);

  const loadMeals = useCallback(async () => {
    const response = await api.get(`/meals`);
    setMeals(response.data);
  }, []);

  useEffect(() => {
    loadMeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadMeals]);

  async function handleRemoveMeal(id) {
    try {
      await api.delete(`/meals/${id}`);
      loadMeals();
    } catch (error) {
      console.tron.log(error);
    }
  }

  return (
    <Container>
      <Link to="/meals/create">
        <Button onClick={() => {}}>
          <MdAddCircleOutline size="24" />
          Add
        </Button>
      </Link>
      <MealsList>
        {meals.map(meal => (
          <li key={meal.id}>
            <div>
              <a href={meal.link}>{meal.name}</a>
              <Button onClick={() => handleRemoveMeal(meal.id)} color="#FA6980">
                remover
              </Button>
            </div>
          </li>
        ))}
      </MealsList>
    </Container>
  );
}
