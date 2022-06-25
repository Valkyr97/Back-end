const { Router } = require('express');
const { check } = require('express-validator');

const { jwtValidation, fieldsValidation } = require('../middlewares');

const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controllers');
const {
  productNameExist,
  productIdExist,
  categoryNameExist,
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
  getProducts
);

router.get(
  '/:id',
  [
    check('id', 'The id provided is not a valid id').isMongoId(),
    check('id').custom(productIdExist),
    fieldsValidation,
  ],
  getProduct
);

router.post(
  '/',
  [
    jwtValidation,
    check('name', 'The name is required').notEmpty(),
    check('price').optional().isNumeric(),
    check('category', 'The category is required').notEmpty(),
    check('aviability', 'The aviability must be a boolean')
      .optional()
      .isBoolean(),
    check('name').custom(productNameExist),
    fieldsValidation,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    jwtValidation,
    check('name', 'The name is required').notEmpty(),
    check('id', 'The id provided is not a valid id').isMongoId(),
    check('id').custom(productIdExist),
    check('name').custom(productNameExist),
    fieldsValidation,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    jwtValidation,
    check('id', 'The id provided is not a valid id').isMongoId(),
    check('id').custom(productIdExist),
    fieldsValidation,
  ],
  deleteProduct
);

module.exports = router;
