import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { Form } from '@rocketseat/unform';
import Logo from '../../assets/RegimLogo.svg';
import { confirmEmailPutRequest } from '~/store/modules/auth/actions';
import { ButtonQuartiary } from '~/components/Button';

export default function ConfirmEmail() {
  const dispatch = useDispatch();
  const { hash } = useParams();

  const confirmEmailReq = useCallback(async () => {
    dispatch(confirmEmailPutRequest(hash));
  }, [dispatch, hash]);

  useEffect(() => {
    confirmEmailReq();
  }, [confirmEmailReq]);
  return (
    <>
      <img src={Logo} alt="Regim Logo" />
      <Form>
        <span>Verificando ...</span>
        <Link to="/">
          <ButtonQuartiary color="danger">Cancelar</ButtonQuartiary>
        </Link>
      </Form>
    </>
  );
}
