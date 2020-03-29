import React, { useState, useCallback, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { TextField, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Avatar';

// import { Container } from './styles';

export default function AutoCompleteDebounce({
  request,
  entity,
  list,
  onSelect,
  loadingName = 'loading',
  placeholder,
}) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const items = useSelector(state => state[entity][list]);
  const loading = useSelector(state => state[entity][loadingName]);

  const loaditems = useCallback(async () => {
    dispatch(request(1, search, true));
  }, [dispatch, request, search]);

  useEffect(() => {
    loaditems();
  }, [loaditems]);
  useEffect(() => {
    loaditems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(option, value) {
    onSelect(value);
    setSearch('');
  }

  return (
    <Autocomplete
      options={items}
      getOptionSelected={(option, value) => option.name === value.name}
      onChange={onChange}
      getOptionLabel={option => option.name}
      inputValue={search}
      value={null}
      onInputChange={(even, value) => setSearch(value)}
      renderOption={({ image, name }) => (
        <div className="regim-options">
          <Avatar image={image} name={name} />
          <span>{name}</span>
        </div>
      )}
      renderInput={params => (
        <TextField
          placeholder={placeholder}
          element={TextField}
          {...params}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
