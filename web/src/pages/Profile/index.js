import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';
import { updateProfileRequest } from '~/store/modules/user/actions';

import { Container } from './styles';
import InputCustom from '~/components/Input';
import { ButtonCustom } from '~/components/Button/styles';
import { ProfileSchema } from '~/validators/profileValidator';
import ImagePicker from '~/components/imagePicker';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  const { register, handleSubmit, errors, setValue } = useForm({
    validationSchema: ProfileSchema,
  });

  function onSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ImagePicker
          register={register}
          name="imageId"
          setValue={setValue}
          defaultValue={profile.image}
        />
        <InputCustom
          name="name"
          placeholder="Nome completo"
          register={register}
          error={errors.name}
          defaultValue={profile.name}
        />

        <hr />

        <InputCustom
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
          register={register}
          error={errors.oldPassword}
        />
        <InputCustom
          type="password"
          name="password"
          placeholder="Nova senha"
          register={register}
          error={errors.password}
        />
        <InputCustom
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
          register={register}
          error={errors.confirmPassword}
        />

        <ButtonCustom type="submit">Atualizar perfil</ButtonCustom>
      </form>
    </Container>
  );
}
