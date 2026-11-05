const { openDb } = require("../database/database");

class TitherModel {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.dizimista = null;
  }

  capitalizarIniciais(texto) {
    if (!texto) return "";
    return texto
      .toLowerCase()
      .split(" ")
      .map((palavra) => {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1);
      })
      .join(" ");
  }

  valida() {
    this.limpaDados();

    if (!this.body.code || isNaN(this.body.code)) {
      this.errors.push("O código deve ser um valor numérico válido.");
    }
    if (!this.body.name) this.errors.push("O nome é obrigatório.");
    if (!this.body.surname) this.errors.push("O sobrenome é obrigatório.");
    if (!this.body.neighborhood) this.errors.push("O bairro é obrigatório.");
    if (!this.body.street) this.errors.push("A rua é obrigatória.");
    if (!this.body.housenumber || isNaN(this.body.housenumber)) {
      this.errors.push("O número da casa deve ser um valor numérico válido.");
    }
    if (!this.body.phone) this.errors.push("O telefone é obrigatória.");
    if (!this.body.category) this.errors.push("A categoria é obrigatória");
  }

  limpaDados() {
    this.body = {
      code: Number(this.body.code),
      name: this.capitalizarIniciais(this.body.name.trim()),
      surname: this.capitalizarIniciais(this.body.surname.trim()),
      neighborhood: this.body.neighborhood.trim(),
      street: this.body.street.trim(),
      housenumber: Number(this.body.housenumber),
      phone: this.body.phone ? this.body.phone.trim() : "",
      category: this.body.category.trim(),
    };
  }

  async cadastrar() {
    this.valida();
    if (this.errors.length > 0) return;

    try {
      const db = await openDb();
      await db.run(
        `INSERT INTO DIZIMISTAS_TOTAIS 
        (dizimista_id, dizimista_nome, dizimista_sobrenome, dizimista_bairro, dizimista_rua, dizimista_numero_casa, dizimista_telefone, dizimista_categoria) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          this.body.code,
          this.body.name,
          this.body.surname,
          this.body.neighborhood,
          this.body.street,
          this.body.housenumber,
          this.body.phone,
          this.body.category,
        ],
      );
    } catch (e) {
      console.error(e);
      this.errors.push("Erro interno ao salvar no banco de dados.");
    }
  }

  static async buscarTodos() {
    try {
      const db = await openDb();
      return await db.all(
        "SELECT * FROM DIZIMISTAS_TOTAIS ORDER BY dizimista_id DESC",
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  static async getByID(id) {
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

  static async deletar(id) {
    try {
      const db = await openDb();
      await db.run("DELETE FROM DIZIMISTAS_TOTAIS WHERE dizimista_id = ?", [
        id,
      ]);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async Update(id) {
    this.valida();
    if (this.errors.length > 0) return;
    try {
      const db = await openDb();
      await db.run(
        `UPDATE DIZIMISTAS_TOTAIS SET 
          dizimista_id = ?,
          dizimista_nome = ?,
          dizimista_sobrenome = ?,
          dizimista_bairro = ?,
          dizimista_rua = ?,
          dizimista_numero_casa = ?,
          dizimista_telefone = ?,
          dizimista_categoria = ?
        WHERE dizimista_id = ?`,
        [
          this.body.code,
          this.body.name,
          this.body.surname,
          this.body.neighborhood,
          this.body.street,
          this.body.housenumber,
          this.body.phone,
          this.body.category,
          id,
        ],
      );
    } catch (e) {
      console.error(`erro ao atualizar: ${e}`);
      return false;
    }
  }
}

module.exports = TitherModel;
