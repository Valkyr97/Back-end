const Role = require('../models/role');
const User = require('../models/user');

const roleValidate = async (role = '') => {
  const exist = await Role.findOne({ role });
  if (!exist) {
    throw new Error(`The role ${role} is not registered`);
  }
};

const emailUniqueValidation = async (mail = '') => {
  const exist = await User.findOne({ mail });
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

module.exports = {
  roleValidate,
  emailUniqueValidation,
  userIdExist,
};
