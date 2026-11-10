const { openDb } = require("../database/database");

class RaffleModel {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }

  static async GetTithers(category) {
    try {
      const db = await openDb();
      return await db.all(
        `
          SELECT * FROM DIZIMISTAS_MENSAIS 
          INNER JOIN DIZIMISTAS_TOTAIS ON
          DIZIMISTAS_TOTAIS.dizimista_id = DIZIMISTAS_MENSAIS.dizimista_do_mes_id
          WHERE DIZIMISTAS_TOTAIS.dizimista_categoria = ?
        `,
        [category],
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

module.exports = RaffleModel;
