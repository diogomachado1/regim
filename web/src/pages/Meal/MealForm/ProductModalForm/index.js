import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ContainerShadow, Container, Shadow } from './styles';
import InputCustom from '~/components/Input';
import { Buttons } from '../styles';
import { ButtonTerciary } from '~/components/Button';
import { saveProductRequest } from '~/store/modules/product/actions';
import { ProductSchema } from '~/validators/productValidator';
import SelectCustom from '~/components/Select';

export default function ProductModalForm({ product, closeProductModal }) {
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: ProductSchema,
  });
  const dispatch = useDispatch();
  const productLoading = useSelector(state => state.product.loading);
  useEffect(() => {
    reset(product || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  async function onSubmit(value) {
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
      <Container onSubmit={handleSubmit(onSubmit)} schema={ProductSchema}>
        <InputCustom
          name="name"
          placeholder="Nome"
          register={register}
          error={errors.name}
        />
        <SelectCustom
          placeholder="Unidade de medida"
          name="measure"
          register={register}
          error={errors.measure}
          options={[
            { id: 'g', title: 'Gramas' },
            { id: 'ml', title: 'Mililitros' },
            { id: 'unity', title: 'Unidade' },
          ]}
        />
        <InputCustom
          name="amount"
          placeholder="Quantidade"
          register={register}
          error={errors.amount}
        />
        <InputCustom
          name="price"
          placeholder="Preço"
          register={register}
          error={errors.price}
        />
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
