import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';
import InputCustom from '~/components/Input';
import { ButtonCustom } from '~/components/Button/styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <InputCustom name="name" placeholder="Nome completo" />
        <InputCustom
          name="email"
          type="email"
          placeholder="Seu endereço de e-mail"
        />

        <hr />

        <InputCustom
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <InputCustom type="password" name="password" placeholder="Nova senha" />
        <InputCustom
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <ButtonCustom type="submit">Atualizar perfil</ButtonCustom>
      </Form>
    </Container>
  );
}
