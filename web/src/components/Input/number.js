import React from 'react';
import NumberFormat from 'react-number-format';
import InputCustom from '.';

// import { Container } from './styles';

export default function NumberInput({ ...rest }) {
  return (
    <NumberFormat
      decimalSeparator=","
      decimalScale="2"
      allowedDecimalSeparators={[',', '.']}
      isNumericString
      customInput={InputCustom}
      {...rest}
    />
  );
}
