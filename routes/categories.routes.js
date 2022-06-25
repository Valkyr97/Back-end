const { Router } = require('express');
const { check } = require('express-validator');

const { jwtValidation, fieldsValidation } = require('../middlewares');

const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controllers');
const {
  categoryNameExist,
  categoryIdExist,
} = require('../helpers/db-validators');

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
  getCategories
);

router.get(
  '/:id',
  [
    check('id', 'The id provided is not a valid id').isMongoId(),
    check('id').custom(categoryIdExist),
    fieldsValidation,
  ],
  getCategory
);

router.post(
  '/',
  [
    jwtValidation,
    check('name', 'The name is required').notEmpty(),
    check('name').custom(categoryNameExist),
    fieldsValidation,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    jwtValidation,
    check('name', 'The name is required').notEmpty(),
    check('id', 'The id provided is not a valid id').isMongoId(),
    check('id').custom(categoryIdExist),
    check('name').custom(categoryNameExist),
    fieldsValidation,
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    jwtValidation,
    check('id', 'The id provided is not a valid id').isMongoId(),
    check('id').custom(categoryIdExist),
    fieldsValidation,
  ],
  deleteCategory
);

module.exports = router;
