import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';
import { parseISO } from 'date-fns';

export default function DatePicker({ name, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);
  useEffect(() => {
    setSelected(defaultValue ? parseISO(defaultValue) : undefined);
  }, [defaultValue]);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <>
      <ReactDatePicker
        {...rest}
        name={fieldName}
        dateFormat="dd/MM/yyyy"
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}
