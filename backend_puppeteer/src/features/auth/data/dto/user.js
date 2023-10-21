class User {
  constructor(
    user_id,
    nom,
    prenom,
    email,
    avatar,
    role,
    pays,
    telephone,
    motdepasse
  ) {
    this.user_id = user_id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.avatar = avatar;
    this.role = role;
    this.pays = pays;
    this.telephone = telephone;
    this.motdepasse = motdepasse;
  }
}

module.exports = User;
