import React, { useEffect, useRef } from 'react';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';
import { TextareaContainer } from './styles';

export default function TextareaCustom({ name, label, ...rest }) {
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
    defaultValue,
    name: fieldName,
  };

  return (
    <TextareaContainer>
      {/* eslint-disable-next-line jsx-a11y/label-has-for */}
      {label}
      <textarea rows="5" error={error} {...props} />

      {error && <span>{error}</span>}
    </TextareaContainer>
  );
}

TextareaCustom.defaultProps = {
  label: '',
};
TextareaCustom.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};
