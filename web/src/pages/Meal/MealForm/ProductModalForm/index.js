import React from 'react';

import { Select } from '@rocketseat/unform';
import { useDispatch, useSelector } from 'react-redux';
import { ContainerShadow, Container, Shadow } from './styles';
import InputCustom from '~/components/Input';
import { Buttons } from '../styles';
import { ButtonTerciary } from '~/components/Button';
import { saveProductRequest } from '~/store/modules/product/actions';
import { ProductSchema } from '~/validators/productValidator';

export default function ProductModalForm({ product, closeProductModal }) {
  const dispatch = useDispatch();
  const productLoading = useSelector(state => state.product.loading);

  async function handleSubmit(value) {
    dispatch(
      saveProductRequest({
        id: product ? product.id : undefined,
        amount: value.amount || undefined,
        price: value.price || undefined,
        ...value,
      })
    );
  }
  return (
    <ContainerShadow>
      <Shadow onClick={() => closeProductModal()} />
      <Container
        onSubmit={handleSubmit}
        initialData={product || { measure: 'g' }}
        schema={ProductSchema}
      >
        <InputCustom name="name" placeholder="Nome" disabled={productLoading} />
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
            disabled={productLoading}
            color="danger"
            onClick={() => {
              closeProductModal();
            }}
          >
            Cancelar
          </ButtonTerciary>
          <ButtonTerciary
            disabled={productLoading}
            color="success"
            type="submit"
          >
            Salvar
          </ButtonTerciary>
        </Buttons>
      </Container>
    </ContainerShadow>
  );
}
