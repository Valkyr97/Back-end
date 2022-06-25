const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const generateJWT = require('../helpers/jwt-generator');
const { User } = require('../models');

const login = async (req = request, res = response) => {
  const { password, mail } = req.body;

  const user = await User.findOne({ mail });

  // Mail validation
  if (!user) {
    return res.status(400).json({
      msg: 'User and Password does not match - mail',
    });
  }

  // status validation
  if (!user.state) {
    return res.status(400).json({
      msg: 'User and Password does not match - state: false',
    });
  }

  // password validation
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: 'User and Password does not match - password',
    });
  }

  // create JWT
  const token = await generateJWT(user.id);

  res.json({
    user,
    token,
  });
};

module.exports = {
  login,
};
