import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import { signInRequest } from '~/store/modules/auth/actions';
import InputCustom from '~/components/Input';
import { Button, ButtonQuartiary } from '~/components/Button';

import Logo from '../../assets/RegimLogo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function Main() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, reset } = useForm({
    validationSchema: schema,
  });
  const loading = useSelector(state => state.auth.loading);

  function onSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }
  return (
    <>
      <img src={Logo} alt="Regim Logo" />
      <form schema={schema} onSubmit={handleSubmit(onSubmit)}>
        <InputCustom
          name="email"
          type="email"
          placeholder="Seu e-mail"
          register={register}
          error={errors.email}
        />
        <InputCustom
          name="password"
          type="password"
          register={register}
          error={errors.password}
          placeholder="Password"
        />

        <Button type="submit">{loading ? 'Carregando...' : 'Acessar'}</Button>
        <Link to="/register">
          <ButtonQuartiary color="danger">Criar conta gratuita</ButtonQuartiary>
        </Link>
      </form>
    </>
  );
}
