const fieldsValidation = require('./fieldsValidation');
const jwtValidation = require('./jwtValidation');
const permissValidation = require('./permissValidation');

module.exports = {
  ...fieldsValidation,
  ...jwtValidation,
  ...permissValidation,
};
