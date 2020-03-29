import React, { useCallback, useEffect, useState } from 'react';
import { Pagination as PaginationMd } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { DebounceInput } from 'react-debounce-input';
import { Container, ProductsList } from './styles';
import {
  duplicateProductRequest,
  getPublicProductRequest,
} from '~/store/modules/product/actions';
import Loading from '~/components/Loading';
import { Pagination } from '../Event/styles';
import Card from '~/components/Card';
import Avatar from '~/components/Avatar';

export default function PublicProduct() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const products = useSelector(state => state.product.publicProducts);
  const loading = useSelector(state => state.product.loading);
  const countPublic = useSelector(state => state.product.countPublic);

  const loadProducts = useCallback(async () => {
    dispatch(getPublicProductRequest(page, search));
  }, [dispatch, page, search]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]);

  async function handleDuplicateProduct(id) {
    dispatch(duplicateProductRequest(id));
  }

  return (
    <>
      <Container>
        <Pagination justify="space-between">
          <DebounceInput
            element={TextField}
            minLength={3}
            placeholder="Buscar...(Minimo 3 letras)"
            debounceTimeout={300}
            onChange={event => setSearch(event.target.value)}
          />
          <PaginationMd
            color="primary"
            count={Math.ceil(countPublic / 10)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Pagination>
        <ProductsList>
          {products.map(product => (
            <Card
              key={product.id}
              image={product.image}
              imageName={product.name}
              title={product.name}
              InfosProps={() => (
                <div className="regim-public-product">
                  <span>{`${parseFloat(product.amount).toFixed(0)}${
                    product.measure
                  } por R$${product.price.replace('.', ',')} `}</span>
                  <span>
                    <Avatar
                      image={product.user.image}
                      name={product.user.name}
                    />
                    <span>{product.user.name}</span>
                  </span>
                </div>
              )}
              duplicateAction={() => handleDuplicateProduct(product.id)}
            />
          ))}
        </ProductsList>
      </Container>
      {loading && <Loading />}
    </>
  );
}
