class Scrap {
  constructor(user_id, label, website, start_date, exec_time, lignes, results) {
    this.user_id = user_id;
    this.label = label;
    this.website = website;
    this.start_date = start_date;
    this.exec_time = exec_time;
    this.lignes = lignes;
    this.results = results;
  }
}

module.exports = Scrap;
