import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import {
  forgetPasswordRequest,
  confirmEmailRequest,
} from '~/store/modules/auth/actions';
import InputCustom from '~/components/Input';
import { Button, ButtonQuartiary } from '~/components/Button';

import Logo from '../../assets/RegimLogo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
});

export default function ForgetPasswordForm() {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  });
  const loading = useSelector(state => state.auth.loading);
  const needConfirmEmail = useSelector(state => state.auth.needConfirmEmail);

  function onSubmit({ email }) {
    console.tron.log(needConfirmEmail);
    if (needConfirmEmail) {
      dispatch(confirmEmailRequest(email));
    } else {
      dispatch(forgetPasswordRequest(email));
    }
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
          name="email"
          type="email"
          placeholder="Seu e-mail"
          register={register}
          error={errors.email}
        />

        <Button type="submit">
          {loading ? 'Carregando...' : 'Enviar email'}
        </Button>
        <Link to="/">
          <ButtonQuartiary color="danger">Cancelar</ButtonQuartiary>
        </Link>
      </form>
    </>
  );
}
