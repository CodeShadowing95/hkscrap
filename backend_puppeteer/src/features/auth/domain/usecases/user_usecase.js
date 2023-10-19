const { validatePassword } = require("../../../../core/utils/hash");
const { APIError, STATUS_CODES } = require("../../../../core/utils/app_errors");
const UserDAO = require("../../data/dao/user_dao");

class UserUseCase {
  static async login(inputs) {
    const { email_username, password, db } = inputs;

    if (!email_username || !password)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'adresse mail ou de mot de passe."
      );

    try {
      const user = await UserDAO.findByEmail(email_username, db);
      if (user) {
        const validPassword = await validatePassword(password, user.motdepasse);

        if (validPassword) return user;
      }

      throw new APIError(
        "Unexist Account.",
        STATUS_CODES.BAD_REQUEST,
        "Email ou mot de passe incorrects."
      );
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async register(inputs) {
    const { email, password, db } = inputs;

    if (!email || !password)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'adresse mail ou de mot de passe."
      );

    try {
      const existingUser = await UserDAO.findByEmail(email, db);

      if (!existingUser) {
        const message = await UserDAO.create(email, password, db);
        return message;
      }

      throw new APIError(
        "Duplicate Account.",
        STATUS_CODES.BAD_REQUEST,
        "Ce compte existe déjà."
      );
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async get(inputs) {
    const { db } = inputs;

    const users = await UserDAO.findAll(db);

    return users;
  }

  static async count(inputs) {
    const { db } = inputs;

    const number = await UserDAO.countAll(db);

    return {count : number};
  }

  static async getOne(inputs) {
    const { email, db } = inputs;

    if (!email)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'adresse mail."
      );

    try {
      const user = await UserDAO.findByEmail(email, db);

      if (!user)
        throw new APIError(
          "Unexist Account.",
          STATUS_CODES.BAD_REQUEST,
          "Cet utilisateur n'existe pas."
        );

      return user;
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async store(inputs) {
    const { lastname, firstname, email, password, telephone, country, db } =
      inputs;

    if (!email || !password)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'adresse mail ou de mot de passe."
      );

    try {
      const existingUser = await UserDAO.findByEmail(email, db);

      if (!existingUser) {
        const user = await UserDAO.createWithAllInputs(
          lastname,
          firstname,
          email,
          password,
          telephone,
          country,
          db
        );

        return user;
      }

      throw new APIError(
        "Duplicate Account.",
        STATUS_CODES.BAD_REQUEST,
        "Ce compte existe déjà."
      );
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async edit(inputs) {
    const { id, lastname, firstname, email, phone, country, db } = inputs;

    if (!email)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'adresse mail."
      );

    try {
      const existingUser = await UserDAO.findByEmail(email, db);

      if (existingUser) {
        const user = await UserDAO.edit(
          id,
          lastname,
          firstname,
          email,
          phone,
          country,
          db
        );

        return user;
      }

      throw new APIError(
        "Unexist Account.",
        STATUS_CODES.BAD_REQUEST,
        "Cet utilisateur n'existe pas."
      );
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async deleteOne(inputs) {
    const { id, db } = inputs;

    const message = await UserDAO.deleteOne(id, db);

    return message;
  }
}

module.exports = UserUseCase;
