const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});

const { setupDatabase } = require("./src/database/database");

const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(flash());

const routes = require("./routes");

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

app.use(routes);

app.use((req, res, next) => {
  res.redirect("/pagina-indisponivel");
});

setupDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
});
