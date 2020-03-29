export function saveProductRequest(product, navigate, page, search) {
  return {
    type: '@product/SAVE_IN_RESQUEST',
    payload: { product, navigate, page, search },
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

export function getProductRequest(page, search, debounce) {
  if (debounce) {
    return {
      type: '@product/GET_IN_RESQUEST_DEBOUNCE',
      payload: { page, search },
    };
  }
  return {
    type: '@product/GET_IN_RESQUEST',
    payload: { page, search },
  };
}

export function getProductInSuccess(data) {
  return {
    type: '@product/GET_IN_SUCCESS',
    payload: { data },
  };
}

export function getProductInFailure() {
  return {
    type: '@product/GET_IN_FAILURE',
    payload: {},
  };
}

export function getPublicProductRequest(page, search) {
  return {
    type: '@product/GET_PUBLIC_IN_RESQUEST',
    payload: { page, search },
  };
}

export function getPublicProductInSuccess(data) {
  return {
    type: '@product/GET_PUBLIC_IN_SUCCESS',
    payload: { data },
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

export function duplicateProductRequest(id, page, search) {
  return {
    type: '@product/DUPLICATE_IN_RESQUEST',
    payload: { id, page, search },
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

export function deleteProductRequest(product, page, search) {
  return {
    type: '@product/DELETE_IN_RESQUEST',
    payload: { product, page, search },
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
