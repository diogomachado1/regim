export function saveProductRequest(product) {
  return {
    type: '@product/SAVE_IN_RESQUEST',
    payload: { product },
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
