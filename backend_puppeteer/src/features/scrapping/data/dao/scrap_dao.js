class ScrapDAO {
  static async find(uid, db) {
    const sql = "SELECT * FROM dataoverview WHERE user_id = ? ORDER BY do_id DESC";

    try {
      const [rows, fields] = await db.execute(sql, [uid]);
      return rows;
    } catch (error) {
      return null;
    }
  }

  static async findRecent(uid, db) {
    const sql =
      "SELECT * FROM dataoverview WHERE user_id = ? ORDER BY do_id DESC LIMIT 10";

    try {
      const [rows, fields] = await db.execute(sql, [uid]);
      return rows;
    } catch (error) {
      return null;
    }
  }

  static async getRequestNumber(uid, db) {
    const sql = "SELECT * FROM dataoverview WHERE user_id = ?";

    try {
      const [rows, fields] = await db.execute(sql, [uid]);
      return rows.length;
    } catch (error) {
      return 0;
    }
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

    try {
      const [result] = await db.execute(sql, values);
      return true;
    } catch (error) {
      return false;
    }
  }

  static async count(id, db) {
    const sql =
      "SELECT SUM(LIGNES) AS totalDatas FROM dataoverview WHERE user_id = ?";

    try {
      const [rows, fields] = await db.execute(sql, [id]);
      return rows[0].totalDatas === null ? 0 : rows[0].totalDatas;
    } catch (error) {
      return 0;
    }
  }

  static async countBySite(website, id, db) {
    const sql =
      "SELECT COUNT(*) AS counter FROM dataoverview WHERE website = ? AND user_id = ?";

    const values = [website, id];

    try {
      const [rows, fields] = await db.execute(sql, values);
      return rows[0].counter;
    } catch (error) {
      return 0;
    }
  }
}

module.exports = ScrapDAO;
