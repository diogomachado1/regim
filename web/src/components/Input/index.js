import React from 'react';
import PropTypes from 'prop-types';
import { InputboxUnform } from './styles';

export default function InputCustom({
  name,
  error,
  register,
  defaultValue,
  variant = 'outlined',
  ...rest
}) {
  const props = {
    ...rest,
    inputProps: {
      ref: register,
      defaultValue: rest.value ? undefined : defaultValue,
    },
    id: name,
    helperText: error ? error.message : undefined,
    label: rest.placeholder,
    name,
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      <InputboxUnform error={!!error} variant={variant} {...props} />
    </>
  );
}

InputCustom.propTypes = {
  name: PropTypes.string.isRequired,
};
