import React from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { useDispatch } from 'react-redux';
import { Wrapper, Content } from './styles';
import Header from './Header';
import Menu from './Menu';
import { changeMenu } from '~/store/modules/user/actions';

export default function AuthLayout({ children }) {
  const dispatch = useDispatch();

  function handleChangeMenu() {
    dispatch(changeMenu());
  }
  return (
    <Wrapper>
      <Header handleChangeMenu={handleChangeMenu} />
      <Menu />
      <PerfectScrollbar>
        <Content>{children}</Content>
      </PerfectScrollbar>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
