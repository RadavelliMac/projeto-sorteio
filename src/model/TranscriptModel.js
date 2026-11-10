const { openDb } = require("../database/database");

class TranscriptModel {
  constructor(body) {
    this.body = body;
  }

  FormataDados() {
    this.body.id = Number(this.body.id);
  }

  async Cadastrar() {
    const date = new Date().toLocaleDateString("pt-BR");
    try {
      this.FormataDados();
      const db = await openDb();
      await db.run(
        `
          INSERT INTO DIZIMISTAS_SORTEADOS (dizimista_sorteado, dizimista_data, dizimista_presente)
          VALUES (?, ?, ?);
        `,
        [this.body.id, date, this.body.titherPresent],
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async getAll() {
    try {
      const db = await openDb();
      return await db.all(
        `
          SELECT * FROM DIZIMISTAS_SORTEADOS DS INNER JOIN DIZIMISTAS_TOTAIS DT ON
          DT.dizimista_id = DS.dizimista_sorteado
        `,
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

module.exports = TranscriptModel;
