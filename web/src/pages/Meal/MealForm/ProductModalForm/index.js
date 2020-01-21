import React from 'react';

import { Select } from '@rocketseat/unform';
import { useDispatch } from 'react-redux';
import { ContainerShadow, Container, Shadow } from './styles';
import InputCustom from '~/components/Input';
import { Buttons } from '../styles';
import { ButtonTerciary } from '~/components/Button';
import api from '~/services/api';
import { saveProductRequest } from '~/store/modules/product/actions';

export default function ProductModalForm({ product, closeProductModal }) {
  const dispatch = useDispatch();

  async function handleSubmit(value) {
    dispatch(saveProductRequest(value));
  }
  return (
    <ContainerShadow>
      <Shadow onClick={() => closeProductModal()} />
      <Container onSubmit={handleSubmit} initialData={{ measure: 'g' }}>
        <InputCustom name="name" placeholder="Nome" />
        <Select
          name="measure"
          options={[
            { id: 'g', title: 'Gramas' },
            { id: 'ml', title: 'Mililitros' },
            { id: 'unity', title: 'Unidade' },
          ]}
        />
        <InputCustom name="amount" placeholder="Quantidade" />
        <InputCustom name="price" placeholder="Preço" />
        <Buttons>
          <ButtonTerciary
            type="button"
            color="danger"
            onClick={() => {
              closeProductModal();
            }}
          >
            Cancelar
          </ButtonTerciary>
          <ButtonTerciary color="success" type="submit">
            Salvar
          </ButtonTerciary>
        </Buttons>
      </Container>
    </ContainerShadow>
  );
}
