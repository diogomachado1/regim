import React from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { MenuContainer, Profile } from './styles';

export default function Menu({ showMenu }) {
  const profile = useSelector(state => state.user.profile);
  return (
    <MenuContainer showMenu={showMenu}>
      <Profile>
        <span>{profile.name}</span>
        <Link to="/profile">Meu Perfil</Link>
      </Profile>
      <ul>
        <NavLink exact to="/meals">
          <li>Refeições</li>
        </NavLink>
        <NavLink exact to="/events">
          <li>Eventos</li>
        </NavLink>
        <NavLink exact to="/list">
          <li>Lista</li>
        </NavLink>
      </ul>
    </MenuContainer>
  );
}
