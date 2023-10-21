const User = require("../../data/dto/user");

class UserEntity {
  static toJson(data) {
    return new User(
      data.user_id,
      data.nom,
      data.prenom,
      data.email,
      data.avatar ?? "",
      data.role,
      data.pays ?? "",
      data.telephone ?? "",
      data.motdepasse
    );
  }
}

module.exports = UserEntity;
