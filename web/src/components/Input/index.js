import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { InputboxUnform } from './styles';

export default function InputCustom({
  name,
  error,
  register,
  defaultValue,
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
      <InputboxUnform error={!!error} variant="outlined" {...props} />
    </>
  );
}

InputCustom.propTypes = {
  name: PropTypes.string.isRequired,
};
