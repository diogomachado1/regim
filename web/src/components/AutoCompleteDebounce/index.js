import React, { useState, useCallback, useEffect } from 'react';
import { Autocomplete } from '@material-ui/lab';
import { DebounceInput } from 'react-debounce-input';
import { TextField, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// import { Container } from './styles';

export default function AutoCompleteDebounce({
  request,
  entity,
  list,
  onSelect,
  loadingName = 'loading',
}) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const itens = useSelector(state => state[entity][list]);
  const loading = useSelector(state => state[entity][loadingName]);

  const loadItens = useCallback(async () => {
    dispatch(request(1, search));
  }, [dispatch, request, search]);

  useEffect(() => {
    loadItens();
  }, [loadItens]);
  useEffect(() => {
    loadItens();
    console.log(entity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Autocomplete
      options={itens}
      getOptionSelected={(option, value) => option.name === value.name}
      onChange={(option, value) => onSelect(value)}
      getOptionLabel={option => option.name}
      renderInput={params => (
        <DebounceInput
          placeholder="Escolher Produto..."
          debounceTimeout={400}
          element={TextField}
          {...params}
          label="Produto"
          variant="outlined"
          onChange={event => setSearch(event.target.value)}
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
