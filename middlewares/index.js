const fieldsValidation = require('./fields-validation');
const jwtValidation = require('./jwt-validation');
const permissValidation = require('./permiss-validation');

module.exports = {
  ...fieldsValidation,
  ...jwtValidation,
  ...permissValidation,
};
