const { validatePassword } = require("../../../../core/utils/hash");
const { APIError, STATUS_CODES } = require("../../../../core/utils/app_errors");
const ScrapDAO = require("../../data/dao/scrap_dao");

class ScrapUseCase {
  static async get(inputs) {
    const { uid, db } = inputs;

    if (!uid)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'identifiant."
      );

    try {
      const scraps = await ScrapDAO.find(uid, db);
      if (scraps) return scraps;

      throw new APIError(
        "Unexist Scrapping.",
        STATUS_CODES.BAD_REQUEST,
        "Aucune donnnées ne correspond à votre demande."
      );
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async recent(inputs) {
    const { uid, db } = inputs;

    if (!uid)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'identifiant."
      );

    try {
      const recentScraps = await ScrapDAO.findRecent(uid, db);
      if (recentScraps) return recentScraps;

      throw new APIError(
        "Unexist Scrapping.",
        STATUS_CODES.BAD_REQUEST,
        "Aucune donnnées ne correspond à votre demande."
      );
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async requestNumber(inputs) {
    const { uid, db } = inputs;

    if (!uid)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'identifiant."
      );

    try {
      const numberOfRequest = await ScrapDAO.getRequestNumber(uid, db);

      return numberOfRequest;
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async store(inputs) {
    const {
      userId,
      label,
      website,
      startDate,
      execTime,
      lines,
      resultsFile,
      db,
    } = inputs;

    if (!userId || !label || !website)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Veuillez remplir les champs obligatoire."
      );

    try {
      if (
        await ScrapDAO.create(
          userId,
          label,
          website,
          startDate,
          execTime,
          lines,
          resultsFile,
          db
        )
      )
        return "Enregistrement effectué avec succès.";

      throw new APIError(
        "Error.",
        STATUS_CODES.BAD_REQUEST,
        "Une erreur est survenue lors de l'enregistrement."
      );
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async count(inputs) {
    const { userId, db } = inputs;

    if (!userId)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'identifiant."
      );

    try {
      const numberOfScrap = await ScrapDAO.count(userId, db);

      return numberOfScrap;
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }

  static async countBySite(inputs) {
    const { website, uid, db } = inputs;

    if (!website || !uid)
      throw new APIError(
        "Validation Error.",
        STATUS_CODES.BAD_REQUEST,
        "Pas d'identifiant ou de site web."
      );

    try {
      const numberOfScrap = await ScrapDAO.countBySite(website, uid, db);

      return numberOfScrap;
    } catch (err) {
      throw new APIError(err.name, err.statusCode, err.description);
    }
  }
}

module.exports = ScrapUseCase;
