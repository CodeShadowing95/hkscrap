const mysql = require("mysql");

class MysqlConnection {
  constructor(host, user, password, database, port) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
    this.port = port || 3306;
  }

  connect() {
    return mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port,
    });
  }

  getConnection() {
    const db = this.connect();

    db.connect((err) => {
      if (err) {
        console.log("Error connecting to MySQL: " + err.message);
        return false;
      }
      console.log("Connected to MySQL database");
    });

    return db;
  }
}

module.exports = MysqlConnection;
