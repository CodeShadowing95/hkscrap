const mysql = require("mysql2");

class MysqlConnection {
  constructor(host, user, password, database, port) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
    this.port = port || 3306;
  }

  connect() {
    return mysql.createPool({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: this.port,
    });
  }

  getConnection() {
    const db = this.connect();

    return db.promise();
  }
}

module.exports = MysqlConnection;
