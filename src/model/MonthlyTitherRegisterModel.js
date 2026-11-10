const { openDb } = require("../database/database");

class MonthlyTither {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }

  static async Consultar(id) {
    try {
      const db = await openDb();
      return await db.all(
        "SELECT * FROM DIZIMISTAS_TOTAIS WHERE dizimista_id = ?",
        [id],
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async ConsultarMes(id) {
    try {
      const db = await openDb();
      return await db.all(
        "SELECT * FROM DIZIMISTAS_MENSAIS WHERE dizimista_do_mes_id = ?",
        [id],
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async Cadastrar(id) {
    try {
      const db = await openDb();
      return await db.run(
        "INSERT INTO DIZIMISTAS_MENSAIS (dizimista_do_mes_id) VALUES (?)",
        [id],
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async GetAll() {
    try {
      const db = await openDb();
      return await db.all(
        `
          SELECT * FROM DIZIMISTAS_MENSAIS DM INNER JOIN DIZIMISTAS_TOTAIS DT 
          ON DM.dizimista_do_mes_id = dizimista_id ORDER BY dizimista_id DESC
        `,
      );
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async Delete(id) {
    try {
      const db = await openDb();
      await db.run(
        `
          DELETE FROM DIZIMISTAS_MENSAIS WHERE dizimista_do_mes_id = ?
        `,
        [id],
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

module.exports = MonthlyTither;
