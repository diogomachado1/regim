import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useForm } from 'react-hook-form';
import { signUpRequest } from '~/store/modules/auth/actions';
import InputCustom from '~/components/Input';
import { Button, ButtonQuartiary } from '~/components/Button';
import Logo from '../../assets/RegimLogo.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });

  function onSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={Logo} alt="Regim Logo" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputCustom
          name="name"
          placeholder="Nome completo"
          register={register}
          error={errors.name}
        />
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
          placeholder="Sua senha secreta"
          register={register}
          error={errors.password}
        />

        <Button type="submit">
          {loading ? 'Carregando...' : 'Criar conta'}
        </Button>
        <Link to="/">
          <ButtonQuartiary color="danger">Já tenho login!</ButtonQuartiary>
        </Link>
      </form>
    </>
  );
}
