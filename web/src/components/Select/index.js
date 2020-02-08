import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

export default function SelectCustom({
  name,
  error,
  register,
  defaultValue,
  ...rest
}) {
  const customProps = {
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
    <TextField
      SelectProps={{
        native: true,
      }}
      select
      error={!!error}
      variant="outlined"
      {...customProps}
    >
      {customProps.options.map(({ id, title }) => (
        <option key={id} value={id}>
          {title}
        </option>
      ))}
    </TextField>
  );
}

SelectCustom.propTypes = {
  name: PropTypes.string.isRequired,
};
