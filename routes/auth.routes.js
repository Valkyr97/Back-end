const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidation } = require('../middlewares/fieldsValidation');

const { login } = require('../controllers/auth.contollers');
const { userMailExist } = require('../helpers/db-validators');

const router = Router();

router.post(
  '/login',
  [
    check('mail', 'The mail is required').notEmpty(),
    check('mail', 'The mail is invalid').isEmail(),
    check('password', 'The password is required').notEmpty(),
    fieldsValidation,
  ],
  login
);

module.exports = router;
