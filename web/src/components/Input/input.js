import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

import { Container, Inputbox } from './styles';

export default function InputWithIcon({ icon, ...rest }) {
  return (
    <Container>
      <Inputbox icon={icon} {...rest} />
      {icon && <ReactSVG src={icon} />}
    </Container>
  );
}

InputWithIcon.propTypes = {
  icon: PropTypes.string,
};

InputWithIcon.defaultProps = {
  icon: undefined,
};
