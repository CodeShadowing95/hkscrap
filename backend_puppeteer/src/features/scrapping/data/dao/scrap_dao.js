class ScrapDAO {
  static async find(uid, db) {
    const sql = "SELECT * FROM dataoverview WHERE user_id = ?";

    db.query(sql, [uid], (err, data) => {
      if (err) return null;

      return data;
    });
  }

  static async findRecent(uid, db) {
    const sql =
      "SELECT * FROM dataoverview WHERE user_id = ? ORDER BY do_id DESC LIMIT 10";

    db.query(sql, [uid], (err, data) => {
      if (err) return null;

      return data;
    });
  }

  static async getRequestNumber(uid, db) {
    const sql = "SELECT * FROM dataoverview WHERE user_id = ?";

    db.query(sql, [uid], (err, data) => {
      if (err) return 0;

      return data.length;
    });
  }

  static async create(
    userId,
    label,
    website,
    startDate,
    execTime,
    lines,
    resultsFile,
    db
  ) {
    const sql =
      "INSERT INTO dataoverview (user_id, label, website, start_date, exec_time, lignes, results) VALUES (?, ?, ?, ?, ?, ?, ?)";

    const values = [
      userId,
      label,
      website,
      startDate,
      execTime,
      lines,
      resultsFile,
    ];

    db.query(sql, values, (err, data) => {
      if (err) return false;

      return true;
    });
  }

  static async count(id, db) {
    const sql =
      "SELECT SUM(LIGNES) AS totalDatas FROM dataoverview WHERE user_id = ?";

    db.query(sql, [id], (err, data) => {
      if (err) return 0;

      return data;
    });
  }

  static async countBySite(website, id, db) {
    const sql =
      "SELECT COUNT(*) AS counter FROM dataoverview WHERE website = ? AND user_id = ?";

    const values = [website, id];

    db.query(sql, values, (err, data) => {
      if (err) return 0;

      return data;
    });
  }
}

module.exports = ScrapDAO;
