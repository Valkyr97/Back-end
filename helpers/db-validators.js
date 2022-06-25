const { Role, User, Category, Product } = require('../models');

const roleValidate = async (role = '') => {
  const exist = await Role.findOne({ role });
  if (!exist) {
    throw new Error(`The role ${role} is not registered`);
  }
};

const emailUniqueValidation = async (mail = '') => {
  const exist = await User.findOne({ mail, state: true });
  if (exist) {
    throw new Error(`The mail ${mail} is alredy in use`);
  }
};

const userIdExist = async (id) => {
  const exist = await User.findById(id);
  if (!exist) {
    throw new Error(`The user with id: ${id} does not exist`);
  }
};

const categoryIdExist = async (id) => {
  const exist = await Category.findById(id);
  if (!exist) {
    throw new Error(`The category with id: ${id} does not exist`);
  }
};

const categoryNameExist = async (name = '') => {
  name = name.toUpperCase();
  const exist = await Category.findOne({ name });
  if (exist) {
    throw new Error(`The category ${name} alredy exists`);
  }
};

const productIdExist = async (id) => {
  const exist = await Product.findById(id);
  if (!exist) {
    throw new Error(`The product with id: ${id} does not exist`);
  }
};

const productNameExist = async (name = '') => {
  name = name.toUpperCase();
  const exist = await Product.findOne({ name });
  if (exist) {
    throw new Error(`The product ${name} alredy exists`);
  }
};

module.exports = {
  roleValidate,
  emailUniqueValidation,
  userIdExist,
  categoryNameExist,
  categoryIdExist,
  productIdExist,
  productNameExist,
};
