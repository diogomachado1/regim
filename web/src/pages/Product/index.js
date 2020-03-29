import React, { useCallback, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import { Pagination as PaginationMd } from '@material-ui/lab';

import { useDispatch, useSelector } from 'react-redux';
import { Tooltip, TextField } from '@material-ui/core';
import { DebounceInput } from 'react-debounce-input';
import { Container, ProductsList } from './styles';
import { CircleButton } from '~/components/Button/styles';

import {
  getProductRequest,
  deleteProductRequest,
  saveProductRequest,
  duplicateProductRequest,
} from '~/store/modules/product/actions';
import Loading from '~/components/Loading';
import { Pagination } from '../Event/styles';
import Card from '~/components/Card';
import { measureLower } from '~/utils/getMeasure';

export default function Product() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const history = useHistory();

  const products = useSelector(state => state.product.products);
  const count = useSelector(state => state.product.count);
  const loading = useSelector(state => state.product.loading);

  const loadProducts = useCallback(async () => {
    dispatch(getProductRequest(page, search));
  }, [dispatch, page, search]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]);

  async function handleRemoveProduct(id) {
    dispatch(deleteProductRequest({ id }, page, search));
  }

  // async function handleRemoveProduct(id) {
  //   dispatch(deleteProductRequest({ id }));
  // }

  async function handleChangePublic(product) {
    dispatch(
      saveProductRequest(
        { id: product.id, public: !product.public },
        false,
        page,
        search
      )
    );
  }

  async function handleDuplicateProduct(id) {
    dispatch(duplicateProductRequest(id, page, search));
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
            count={Math.ceil(count / 10)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
          <Tooltip title="Criar" aria-label="Criar" placement="top">
            <Link to="/products/create">
              <CircleButton color="success">
                <MdAdd size="18" />
              </CircleButton>
            </Link>
          </Tooltip>
        </Pagination>
        <ProductsList>
          {products.map(product => (
            <Card
              key={product.id}
              title={product.name}
              image={product.image}
              imageName={product.name}
              InfosProps={() => (
                <span>{`${parseFloat(product.amount).toFixed(0)} ${
                  measureLower[product.measure]
                } por R$${product.price.replace('.', ',')} `}</span>
              )}
              editAction={() => history.push(`/products/${product.id}`)}
              duplicateAction={() => handleDuplicateProduct(product.id)}
              removeAction={() => handleRemoveProduct(product.id)}
              publicAction={() => handleChangePublic(product)}
              isPublic={product.public}
            />
          ))}
        </ProductsList>
      </Container>
      {loading && <Loading />}
    </>
  );
}
