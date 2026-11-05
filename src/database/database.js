const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

async function openDb() {
  return open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
}

async function setupDatabase() {
  const db = await openDb();

  await db.exec(`
    
    CREATE TABLE IF NOT EXISTS DIZIMISTAS_TOTAIS (
        dizimista_id INTEGER PRIMARY KEY,
        dizimista_nome VARCHAR(100),
        dizimista_sobrenome VARCHAR(100),
        dizimista_bairro VARCHAR(100),
        dizimista_rua VARCHAR(100),
        dizimista_numero_casa INTEGER,
        dizimista_telefone VARCHAR(100),
        dizimista_categoria VARCHAR(100)
    );

    CREATE TABLE IF NOT EXISTS DIZIMISTAS_DO_MES (
        dizimista_do_mes_id INTEGER,
        FOREIGN KEY (dizimista_do_mes_id)
            REFERENCES DIZIMISTAS_TOTAIS(dizimista_id)
    )

  `);

  return db;
}

module.exports = { openDb, setupDatabase };
