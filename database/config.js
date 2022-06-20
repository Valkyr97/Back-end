const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log('DataBase connected successfully');
  } catch (error) {
    console.log(error);
    throw new Error('Fail DB initialization');
  }
};

module.exports = { dbConnection };
