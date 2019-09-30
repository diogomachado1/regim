import React from 'react';

import PropTypes from 'prop-types';

import {
  ButtonCustom,
  ButtonQuartiaryCustom,
  ButtonTerciaryCustom,
} from './styles';

const buttonProps = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
};

const buttonDefaultProps = {
  icon: undefined,
};

export function Button(props) {
  const { children } = props;
  return <ButtonCustom {...props}>{children}</ButtonCustom>;
}

Button.propTypes = buttonProps;
Button.defaultProps = buttonDefaultProps;

export function ButtonTerciary({ children, ...rest }) {
  return <ButtonTerciaryCustom {...rest}>{children}</ButtonTerciaryCustom>;
}

ButtonTerciary.propTypes = buttonProps;
ButtonTerciary.defaultProps = buttonDefaultProps;

export function ButtonQuartiary({ children, ...rest }) {
  return <ButtonQuartiaryCustom {...rest}>{children}</ButtonQuartiaryCustom>;
}

ButtonQuartiary.propTypes = buttonProps;
ButtonQuartiary.defaultProps = buttonDefaultProps;
