export function saveProductRequest(product, navigate) {
  return {
    type: '@product/SAVE_IN_RESQUEST',
    payload: { product, navigate },
  };
}

export function saveProductInSuccess() {
  return {
    type: '@product/SAVE_IN_SUCCESS',
    payload: {},
  };
}

export function saveProductInFailure() {
  return {
    type: '@product/SAVE_IN_FAILURE',
    payload: {},
  };
}

export function openProductForm() {
  return {
    type: '@product/OPEN_FORM',
    payload: {},
  };
}

export function closeProductForm() {
  return {
    type: '@product/CLOSE_FORM',
    payload: {},
  };
}

export function getProductRequest() {
  return {
    type: '@product/GET_IN_RESQUEST',
    payload: {},
  };
}

export function getProductInSuccess(products) {
  return {
    type: '@product/GET_IN_SUCCESS',
    payload: { products },
  };
}

export function getProductInFailure() {
  return {
    type: '@product/GET_IN_FAILURE',
    payload: {},
  };
}

export function getPublicProductRequest() {
  return {
    type: '@product/GET_PUBLIC_IN_RESQUEST',
    payload: {},
  };
}

export function getPublicProductInSuccess(products) {
  return {
    type: '@product/GET_PUBLIC_IN_SUCCESS',
    payload: { products },
  };
}

export function getPublicProductInFailure() {
  return {
    type: '@product/GET_PUBLIC_IN_FAILURE',
    payload: {},
  };
}

export function getOneProductRequest(id) {
  return {
    type: '@product/GETONE_IN_RESQUEST',
    payload: { id },
  };
}

export function getOneProductInSuccess(product) {
  return {
    type: '@product/GETONE_IN_SUCCESS',
    payload: { product },
  };
}

export function getOneProductInFailure() {
  return {
    type: '@product/GETONE_IN_FAILURE',
    payload: {},
  };
}

export function duplicateProductRequest(id) {
  return {
    type: '@product/DUPLICATE_IN_RESQUEST',
    payload: { id },
  };
}

export function duplicateProductInSuccess(product) {
  return {
    type: '@product/DUPLICATE_IN_SUCCESS',
    payload: { product },
  };
}

export function duplicateProductInFailure() {
  return {
    type: '@product/DUPLICATE_IN_FAILURE',
    payload: {},
  };
}

export function deleteProductRequest(product) {
  return {
    type: '@product/DELETE_IN_RESQUEST',
    payload: { product },
  };
}

export function deleteProductInSuccess() {
  return {
    type: '@product/DELETE_IN_SUCCESS',
    payload: {},
  };
}

export function deleteProductInFailure() {
  return {
    type: '@product/DELETE_IN_FAILURE',
    payload: {},
  };
}
