import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { Wrapper, Content } from './styles';
import Header from './Header';
import Menu from './Menu';

export default function AuthLayout({ children }) {
  const [showMenu, setMenu] = useState(true);

  function handleChangeMenu() {
    setMenu(!showMenu);
  }
  return (
    <Wrapper>
      <Header handleChangeMenu={handleChangeMenu} />
      <Menu showMenu={showMenu} />
      <PerfectScrollbar>
        <Content>{children}</Content>
      </PerfectScrollbar>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
