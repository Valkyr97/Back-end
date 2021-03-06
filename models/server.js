const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.authPath = '/api/auth'
    this.usersPath = '/api/users';

    // DbConnection
    this.connectToDb();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectToDb() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parse JSON
    this.app.use(express.json());

    // public
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.routes'));
    this.app.use(this.usersPath, require('../routes/users.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

module.exports = Server;
