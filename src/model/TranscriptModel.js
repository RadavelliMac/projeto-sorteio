const { openDb } = require("../database/database");

class TranscriptModel {
  constructor(body) {
    this.body = body;
    this.errors = [];
  }

  valida(isRegister) {
    const present = ["Sim", "Nao"];

    if (isRegister) if (!this.body.id) this.errors.push("Código inválido");
    if (!present.includes(this.body.titherPresent))
      this.errors.push("Resposta inválida");
  }

  async Cadastrar() {
    this.valida(true);
    if (this.errors.length > 0) return;
    const date = new Date().toLocaleString("pt-BR");
    try {
      const db = await openDb();
      await db.run(
        `
          INSERT INTO DIZIMISTAS_SORTEADOS (dizimista_sorteado, dizimista_data, dizimista_presente)
          VALUES (?, ?, ?);
        `,
        [this.body.id, date, this.body.titherPresent],
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async getAll() {
    try {
      const db = await openDb();
      return await db.all(
        `
          SELECT * FROM DIZIMISTAS_SORTEADOS DS INNER JOIN DIZIMISTAS_TOTAIS DT ON
          DT.dizimista_id = DS.dizimista_sorteado ORDER BY dizimista_date DESC
        `,
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async Edit(ID) {
    try {
      const db = await openDb();
      return await db.all(
        `
          SELECT * FROM DIZIMISTAS_SORTEADOS DS INNER JOIN DIZIMISTAS_TOTAIS DT ON
          DT.dizimista_id = DS.dizimista_sorteado WHERE DS.dizimista_sorteado_id = ?
        `,
        [ID],
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async Update(id) {
    this.valida(false);
    if (this.errors.length > 0) return;
    try {
      const db = await openDb();
      return await db.all(
        `
          UPDATE DIZIMISTAS_SORTEADOS SET dizimista_presente = ?
          WHERE dizimista_sorteado_id = ?
        `,
        [this.body.titherPresent, id],
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}

module.exports = TranscriptModel;
