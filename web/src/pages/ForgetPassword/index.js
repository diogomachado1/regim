import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';

import { forgetPasswordPutRequest } from '~/store/modules/auth/actions';
import InputCustom from '~/components/Input';
import { Button, ButtonQuartiary } from '~/components/Button';

import Logo from '../../assets/RegimLogo.svg';

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('A senha é obrigatória'),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field
          .required('Confirmar a senha é obrigatória')
          .oneOf([Yup.ref('password')], 'Valores são diferente')
      : field
  ),
});

export default function ForgetPasswordForm() {
  const dispatch = useDispatch();
  const { hash } = useParams();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });
  const loading = useSelector(state => state.auth.loading);
  const needConfirmEmail = useSelector(state => state.auth.needConfirmEmail);

  function onSubmit({ password, confirmPassword }) {
    dispatch(forgetPasswordPutRequest(password, confirmPassword, hash));
  }
  return (
    <>
      <img src={Logo} alt="Regim Logo" />
      <form schema={schema} onSubmit={handleSubmit(onSubmit)}>
        <span>
          {needConfirmEmail
            ? 'Enviar email para confirmação de email'
            : 'Enviar email para alteração de senha'}
        </span>
        <InputCustom
          name="password"
          type="password"
          placeholder="Sua senha secreta"
          register={register}
          error={errors.password}
        />
        <InputCustom
          name="confirmPassword"
          type="password"
          placeholder="Confirm sua senha"
          register={register}
          error={errors.confirmPassword}
        />

        <Button type="submit">{loading ? 'Carregando...' : 'Enviar'}</Button>
        <Link to="/">
          <ButtonQuartiary color="danger">Cancelar</ButtonQuartiary>
        </Link>
      </form>
    </>
  );
}
