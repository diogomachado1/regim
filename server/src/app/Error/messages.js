function badRequestText(details) {
  if (details) {
    return `${details}. Checkout documentation for more info: `;
  }
  return 'Invalid request arguments. Checkout documentation for more info: ';
}
function duplicateFieldsText(fields) {
  return `The ${fields} already exist`;
}
function unauthorizedText() {
  return 'Unauthorized';
}
function notFoundText(entity) {
  return `${entity} not found`;
}
function serverErrorText() {
  return "Something went wrong, but don't worry, our developers are already working on this";
}
export {
  badRequestText,
  duplicateFieldsText,
  unauthorizedText,
  notFoundText,
  serverErrorText,
};
