const dotenv = require("dotenv")
dotenv.config();
const config = {
  app: {
    NAME: process.env.APP_NAME || "faaizi-api",
    ENV: process.env.NODE_ENV || "dev",
    PORT: process.env.PORT || 5000,
    SOCKET_PORT: process.env.PORT || 5001,
    HOST: process.env.HOST || "127.0.0.1",
    URL: process.env.API_BASE_URL || "http://34.87.17.45:8282/dev-test/v1",
  },
};

module.exports = config;