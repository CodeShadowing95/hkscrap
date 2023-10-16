const dotEnv = require("dotenv");
dotEnv.config();

const express = require("express");

const MysqlConnection = require("./core/database/mysql/mysql_connection.js");

// get the express app instance
const expressApp = require("./core/infrastructure/express/express_app.js");

const StartServer = async () => {
  const app = express();

  // connect to the database
  const connection = new MysqlConnection(
    process.env.MYSQL_HOST,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_PORT
  );

  const db = connection.getConnection();

  // start express app
  await expressApp(app, db);

  app
    .listen(process.env.PORT, () => {
      console.log(`listening to port ${process.env.PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

StartServer();
