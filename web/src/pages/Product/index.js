import React, { useCallback, useEffect } from 'react';
import { MdAddCircleOutline, MdEdit, MdContentCopy } from 'react-icons/md';
import { FaRegTrashAlt, FaGlobeAmericas } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Tooltip } from '@material-ui/core';
import { Container, ProductsList, Buttons, Infos } from './styles';
import { Button } from '~/components/Button';
import { CircleButton } from '~/components/Button/styles';

import {
  getProductRequest,
  deleteProductRequest,
  saveProductRequest,
  duplicateProductRequest,
} from '~/store/modules/product/actions';
import Loading from '~/components/Loading';
import getInitialLettes from '~/utils/getInitialLetters';

export default function Product() {
  const dispatch = useDispatch();

  const products = useSelector(state => state.product.products);
  const loading = useSelector(state => state.product.loading);

  const loadProducts = useCallback(async () => {
    dispatch(getProductRequest());
  }, [dispatch]);

  useEffect(() => {
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts]);

  async function handleRemoveProduct(id) {
    dispatch(deleteProductRequest({ id }));
  }

  async function handleChangePublic(product) {
    dispatch(saveProductRequest({ id: product.id, public: !product.public }));
  }

  async function handleDuplicateProduct(id) {
    dispatch(duplicateProductRequest(id));
  }

  return (
    <>
      <Container>
        <Link to="/products/create">
          <Button color="success" onClick={() => {}}>
            <MdAddCircleOutline size="24" />
            Add
          </Button>
        </Link>
        <ProductsList>
          {products.map(product => (
            <li key={product.id}>
              <div>
                {product.image ? (
                  <Avatar src={product.image.url} alt={product.name} />
                ) : (
                  <Avatar>{getInitialLettes(product.name)}</Avatar>
                )}
                <Infos>
                  <span>{product.name}</span>
                  <div>
                    <span>{`${parseFloat(product.amount).toFixed(0)}${
                      product.measure
                    } por R$${product.price.replace('.', ',')} `}</span>
                  </div>
                </Infos>
                <Buttons>
                  <Tooltip title="Editar" aria-label="Editar" placement="top">
                    <Link to={`/products/${product.id}`}>
                      <CircleButton color="warning" onClick={() => {}}>
                        <MdEdit size="18" />
                      </CircleButton>
                    </Link>
                  </Tooltip>
                  <Tooltip title="Remover" aria-label="Remover" placement="top">
                    <CircleButton
                      onClick={() => handleRemoveProduct(product.id)}
                      color="danger"
                    >
                      <FaRegTrashAlt size="18" />
                    </CircleButton>
                  </Tooltip>
                  <Tooltip
                    title="Duplicar"
                    aria-label="Duplicar"
                    placement="top"
                  >
                    <CircleButton
                      onClick={() => handleDuplicateProduct(product.id)}
                      color="success"
                    >
                      <MdContentCopy size="18" />
                    </CircleButton>
                  </Tooltip>
                  <Tooltip
                    title="Tornar Público"
                    aria-label="Tornar Público"
                    placement="top"
                  >
                    <CircleButton
                      onClick={() => handleChangePublic(product)}
                      color={product.public ? 'primary' : 'gray'}
                    >
                      <FaGlobeAmericas size="18" />
                    </CircleButton>
                  </Tooltip>
                </Buttons>
              </div>
            </li>
          ))}
        </ProductsList>
      </Container>
      {loading && <Loading />}
    </>
  );
}
