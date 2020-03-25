import { useParams } from 'react-router-dom';
import React, { useEffect, useCallback, useState, useMemo } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import InputCustom from '~/components/Input';
import { ButtonTerciary } from '~/components/Button';
import { StyledForm, Buttons } from './styles';
import {
  saveProductRequest,
  getOneProductRequest,
  getOneProductInSuccess,
} from '~/store/modules/product/actions';

import Loading from '~/components/Loading';
import SelectCustom from '~/components/Select';
import { ProductSchema } from '~/validators/productValidator';
import ImagePicker from '~/components/imagePicker';

export default function ProductForm({ history }) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { register, handleSubmit, errors, reset, setValue } = useForm({
    validationSchema: ProductSchema,
  });

  const product = useSelector(state => state.product.editProduct);
  const loading = useSelector(state => state.product.loading);

  const loadProduct = useCallback(() => {
    if (id) {
      dispatch(getOneProductRequest(id));
    } else {
      dispatch(getOneProductInSuccess({}));
    }
  }, [dispatch, id]);

  useEffect(() => {
    reset(product);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, id]);

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSumit(value) {
    dispatch(saveProductRequest({ id, ...value }, true));
  }
  return (
    <>
      {!loading && (
        <StyledForm
          onSubmit={handleSubmit(onSumit)}
          initialData={id ? product : {}}
          schema={ProductSchema}
        >
          <div>
            <ImagePicker
              register={register}
              name="imageId"
              setValue={setValue}
              defaultValue={product.image}
            />
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
          </div>
          <Buttons>
            <ButtonTerciary
              type="button"
              color="danger"
              onClick={() => {
                history.goBack();
              }}
            >
              Cancelar
            </ButtonTerciary>
            <ButtonTerciary color="success" type="submit">
              Salvar
            </ButtonTerciary>
          </Buttons>
        </StyledForm>
      )}
      {loading && <Loading />}
    </>
  );
}
