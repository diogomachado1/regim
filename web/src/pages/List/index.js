import React, { useCallback, useEffect } from 'react';
import { addMonths } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Paper,
} from '@material-ui/core';
import { getListRequest } from '~/store/modules/list/actions';

// import { Container } from './styles';

export default function List() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.list.list);
  // const loading = useSelector(state => state.list.loading);

  const loadEvents = useCallback(async () => {
    console.log(addMonths(new Date(), 1));
    dispatch(getListRequest(new Date(), addMonths(new Date(), 1)));
  }, [dispatch]);

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadEvents]);
  useEffect(() => console.log(list), [list]);
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Quantidade Total</TableCell>
            <TableCell sortDirection="asc" align="right">
              Preço Total Estimado (R$)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(item => (
            <TableRow key={item.product.name}>
              <TableCell component="th" scope="item">
                {item.product.name}
              </TableCell>
              <TableCell align="right">
                {(item.amountTotal / 1000).toFixed(2)}
              </TableCell>
              <TableCell align="right">
                R$ {item.priceTotal.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
