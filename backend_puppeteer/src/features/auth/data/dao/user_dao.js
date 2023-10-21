const UserEntity = require("../../domain/entities/user_entity");
const {
  generateTempId,
  generateSalt,
  hashPassword,
} = require("../../../../core/utils/hash");

class UserDAO {
  static async findByEmail(email, db) {
    const sql =
      "SELECT user_id, nom, prenom, email, avatar, role, pays, telephone, motdepasse FROM user WHERE email = ?";

    try {
      const [rows, fields] = await db.execute(sql, [email]);
      return UserEntity.toJson(rows[0]);
    } catch (error) {
      return null;
    }
  }

  static async create(email, password, db) {
    const sql =
      "INSERT INTO user (nom, prenom, email, motdepasse, role) VALUES (?, ?, ?, ?, ?)";

    const role = "Utilisateur";
    const randomId = generateTempId();
    const prenom = "user_" + randomId;
    const nom = "";

    /**
      * Le hachage se fait côté client
      * 
      let salt = await generateSalt();
      const motdepasse = await hashPassword(password, salt);
    */

    const values = [nom, prenom, email, password, role];

    try {
      const [result] = await db.execute(sql, values);
      return { message: "Inscription réussie" };
    } catch (error) {
      return { message: err };
    }
  }

  static async findAll(db) {
    const sql = `SELECT * FROM user WHERE user_id NOT LIKE ${process.env.ADMIN_ID}`;

    let data = [];

    try {
      const [rows, fields] = await db.execute(sql);

      rows.map((r) => {
        data.push(UserEntity.toJson(r));
      });

      return data;
    } catch (error) {
      return null;
    }
  }

  static async countAll(db) {
    const sql = `SELECT COUNT(*) AS countUsers FROM user WHERE user_id <> ?`;

    try {
      const [rows, fields] = await db.execute(sql, [process.env.ADMIN_ID]);

      return rows;
    } catch (error) {
      return 0;
    }
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

    try {
      const [result] = await db.execute(sql, values);
      return UserEntity.toJson(result);
    } catch (error) {
      return null;
    }
  }

  static async edit(id, lastname, firstname, email, phone, country, db) {
    const sql =
      "UPDATE user SET nom=?, prenom=?, email=?, telephone=?, pays=? WHERE user_id=?";

    const values = [lastname, firstname, email, phone, country, id];

    try {
      const [result] = await db.execute(sql, values);
      console.log(result);
      return UserEntity.toJson(result);
    } catch (error) {
      return null;
    }
  }

  static async deleteOne(id, db) {
    const sql = `DELETE FROM user WHERE user_id = ? AND user_id <> ${process.env.ADMIN_ID}`;

    try {
      const [result] = await db.execute(sql);
      return { message: "Supression réussie" };
    } catch (error) {
      return { message: error };
    }
  }
}

module.exports = UserDAO;
