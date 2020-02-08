import React, { useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({
  name,
  error,
  register,
  defaultValue,
  watch,
  setValue,
  ...rest
}) {
  const test = watch(name);
  useEffect(() => {
    register({ name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test]);

  const handleDateChange = date => {
    setValue(name, date, false);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        inputVariant="outlined"
        margin="normal"
        helperText={error ? error.message : undefined}
        label={rest.placeholder}
        clearable
        value={test || null}
        error={!!error}
        onChange={handleDateChange}
      />
    </MuiPickersUtilsProvider>
  );
}
