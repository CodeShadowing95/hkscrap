const UserEntity = require("../../domain/entities/user_entity");
const {
  generateTempId,
  generateSalt,
  hashPassword,
} = require("../../../../core/utils/hash");

class UserDAO {
  static async findByEmail(email, db) {
    const sql =
      "SELECT nom, prenom, email, avatar, role, pays, telephone, motdepasse FROM user WHERE `email` = ?";

    db.query(sql, [email], async (err, data) => {
      if (err) return null;

      if (data.length > 0) return UserEntity.toJson(data[0]);
      else return null;
    });
  }

  static async create(email, password, db) {
    const sql =
      "INSERT INTO user (nom, prenom, email, motdepasse, role) VALUES (?, ?, ?, ?, ?)";

    const role = "Utilisateur";
    const randomId = generateTempId();
    const prenom = "user_" + randomId;
    const nom = "";

    let salt = await generateSalt();
    const motdepasse = await hashPassword(password, salt);

    const values = [nom, prenom, email, motdepasse, role];

    db.query(sql, values, (err, data) => {
      if (err) return { message: err };

      return { message: "Inscription réussie" };
    });
  }

  static async findAll(db) {
    const sql = `SELECT * FROM user WHERE user_id NOT LIKE ${process.env.ADMIN_ID}`;

    let data = [];

    db.query(sql, (err, rows) => {
      if (err) return null;

      if (rows.length >= 0) {
        rows.map((r) => {
          data.push(UserEntity.toJson(r));
        });

        return data;
      }

      return null;
    });
  }

  static async countAll(db) {
    const sql = `SELECT COUNT(*) AS countUsers FROM user WHERE user_id <> ?`;

    db.query(sql, [process.env.ADMIN_ID], (err, data) => {
      if (err) return 0;

      if (data) return data;

      return 0;
    });
  }

  static async createWithAllInputs(
    lastname,
    firstname,
    email,
    password,
    telephone,
    country,
    db
  ) {
    const sql =
      "INSERT INTO user (nom, prenom, email, telephone, motdepasse, role, pays) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const role = "Utilisateur";

    let salt = await generateSalt();
    const motdepasse = await hashPassword(password, salt);

    const values = [
      lastname,
      firstname,
      email,
      telephone,
      motdepasse,
      role,
      country,
    ];

    db.query(sql, values, (err, data) => {
      if (err) return null;

      return UserEntity.toJson(data);
    });
  }

  static async edit(id, lastname, firstname, email, phone, country, db) {
    const sql =
      "UPDATE user SET nom=?, prenom=?, email=?, telephone=?, pays=? WHERE user_id=?";

    const values = [lastname, firstname, email, phone, country, id];

    db.query(sql, values, (err, data) => {
      if (err) return null;

      return UserEntity.toJson(data);
    });
  }

  static async deleteOne(id, db) {
    const sql = `DELETE FROM user WHERE user_id = ? AND user_id <> ${process.env.ADMIN_ID}`;

    db.query(sql, [id], (err) => {
      if (err) return err;

      return { message: "Supression réussie" };
    });
  }
}

module.exports = UserDAO;
