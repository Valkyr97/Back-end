const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const jwtValidation = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'There is not Token in the reques',
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    req.authUser = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Invalid Token',
    });
  }
};

module.exports = {jwtValidation};
