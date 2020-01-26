import React, { useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { SpanError, InputboxUnform } from './styles';

export default function InputCustom({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    if (ref.current) {
      registerField({ name: fieldName, ref: ref.current, path: 'value' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current, fieldName]);

  const props = {
    ...rest,
    ref,
    id: fieldName,
    defaultValue: rest.value ? undefined : defaultValue,
    name: fieldName,
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}

      <InputboxUnform error={error} {...props} />

      {error && <SpanError>{error}</SpanError>}
    </>
  );
}

InputCustom.propTypes = {
  name: PropTypes.string.isRequired,
};
