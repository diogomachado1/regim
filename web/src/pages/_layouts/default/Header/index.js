import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdReorder, MdExitToApp } from 'react-icons/md';

import { HeaderContainer } from './styles';
import { signOut } from '~/store/modules/auth/actions';
import { ButtonTerciary } from '~/components/Button';
import Logo from '~/assets/RegimLogo.svg';

export default function Header({ handleChangeMenu }) {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <HeaderContainer>
      <div>
        <ButtonTerciary color="success" onClick={() => handleChangeMenu()}>
          <MdReorder size="25" />
        </ButtonTerciary>
        <Link to="/">
          <img src={Logo} alt="Regim Logo" />
        </Link>
        <ButtonTerciary color="danger" type="button" onClick={handleSignOut}>
          <MdExitToApp size="25" />
        </ButtonTerciary>
      </div>
    </HeaderContainer>
  );
}
