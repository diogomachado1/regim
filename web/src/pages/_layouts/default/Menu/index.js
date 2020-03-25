import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import { MenuContainer, Profile } from './styles';

export default function Menu({ showMenu }) {
  const profile = useSelector(state => state.user.profile);
  const initials = useMemo(() => {
    const [first, last] = profile.name.split(' ');
    const lastInitial = last && last[0];
    return [first[0], lastInitial];
  }, [profile]);
  return (
    <MenuContainer showMenu={showMenu}>
      <Profile>
        {profile.image ? (
          <Avatar src={profile.image.url} alt={profile.name} />
        ) : (
          <Avatar>{initials}</Avatar>
        )}
        <span>{profile.name}</span>
        <Link to="/profile">Meu Perfil</Link>
      </Profile>
      <ul>
        <NavLink exact to="/meals">
          <li>Refeições</li>
        </NavLink>
        <NavLink exact to="/products">
          <li>Produtos</li>
        </NavLink>
        <NavLink exact to="/public_products">
          <li>Produtos públicos</li>
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
