const { Router } = require('express');
const { check } = require('express-validator');

const {
  isAdmin,
  fieldsValidation,
  jwtValidation,
  hasRole,
} = require('../middlewares');

const {
  roleValidate,
  emailUniqueValidation,
  userIdExist,
} = require('../helpers/db-validators');

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controllers');

const router = Router();

router.get(
  '/',
  [
    check('placeholder', 'The placeholder must be an integer')
      .optional()
      .isInt(),
    check('limit', 'The limit must be an integer').optional().isInt(),
    fieldsValidation,
  ],
  getAllUsers
);

router.post(
  '/',
  [
    check('name', 'The name is required').notEmpty(),
    check('password', 'The password must have at least 6 characters').isLength({
      min: 6,
    }),
    check('mail', 'The mail is not valid').isEmail(),
    check('mail').custom(emailUniqueValidation),
    check('role').custom(roleValidate),
    fieldsValidation,
  ],
  createUser
);

router.put(
  '/:id',
  [
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(userIdExist),
    check('role').custom(roleValidate),
    fieldsValidation,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    jwtValidation,
    hasRole('ADMIN_ROLE', 'SELLER_ROLE'),
    check('id', 'The id is not valid').isMongoId(),
    check('id').custom(userIdExist),
    fieldsValidation,
  ],
  deleteUser
);

module.exports = router;
