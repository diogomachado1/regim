import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';

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

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <>
      <img src={Logo} alt="Regim Logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <InputCustom name="name" placeholder="Nome completo" />
        <InputCustom name="email" type="email" placeholder="Seu e-mail" />
        <InputCustom
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        />

        <Button type="submit">Criar conta</Button>
        <Link to="/">
          <ButtonQuartiary color="danger">Já tenho login!</ButtonQuartiary>
        </Link>
      </Form>
    </>
  );
}
