const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { User } = require('../models');

const getAllUsers = async (req = request, res = response) => {
  const { placeholder, limit } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(placeholder)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const createUser = async (req = request, res = response) => {
  const { name, mail, password, role } = req.body;
  const user = new User({ name, mail, password, role });

  // Password hash
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // Save to db
  await user.save();

  res.json({
    user,
  });
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, google, password, mail, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, {
    returnDocument: 'after',
  });

  res.json(user);
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  const authUser = req.user;

  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json(user);
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
