import React from 'react';
import { Form } from '@rocketseat/unform';
import InputCustom from '~/components/Input';
import TextareaCustom from '~/components/Textarea';
import { ButtonTerciary } from '~/components/Button';

// import { Container } from './styles';

export default function MealForm({ history }) {
  function handleSubmit(value) {
    console.tron.log(value);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <InputCustom name="name" placeholder="Nome" />
      <TextareaCustom name="description" placeholder="Descrição" />
      <div>
        <ButtonTerciary
          type="button"
          color="danger"
          onClick={() => {
            history.pop();
          }}
        >
          Cancelar
        </ButtonTerciary>
        <ButtonTerciary color="success" type="submit">
          Salvar
        </ButtonTerciary>
      </div>
    </Form>
  );
}
