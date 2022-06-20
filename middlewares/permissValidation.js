const { response, request } = require('express');

const isAdmin = (req, res = response, next) => {
  const user = req.authUser;
  if (!user) {
    return res.status(500).json({
      msg: 'Using Token before validation',
    });
  }
  const { role, name } = user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `User ${name} does not have admin permissions`,
    });
  }
  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    const user = req.authUser;
    if (!user) {
      return res.status(500).json({
        msg: 'Using Token before validation',
      });
    }
    const { role, name } = user;
    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `User ${name} does not have the required permissions`,
      });
    }
    next();
  };
};

module.exports = {
  isAdmin,
  hasRole,
};
