const {
  badRequestText,
  duplicateFieldsText,
  unauthorizedText,
  notFoundText,
  serverErrorText,
} = require('./messages');

function badRequest(details) {
  return { message: badRequestText(details), type: 'badRequest' };
}
function duplicateFields(fields) {
  return { message: duplicateFieldsText(fields), type: 'duplicateFields' };
}
function unauthorized() {
  return { message: unauthorizedText(), type: 'unauthorized' };
}
function notFound(entity) {
  return { message: notFoundText(entity), type: 'notFound' };
}
function serverError() {
  return { message: serverErrorText(), type: 'serverError' };
}
export { badRequest, duplicateFields, unauthorized, notFound, serverError };
