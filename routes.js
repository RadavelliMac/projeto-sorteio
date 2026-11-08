const express = require("express");
const router = express.Router();

const HomeController = require("./src/controller/HomeController");
const RegisterController = require("./src/controller/RegisterController");
const MonthlyTitherRegisterController = require("./src/controller/MonthlyTitherRegisterController");
const PrizedrawGeneral = require("./src/controller/RaffleGeneralRoulleteController");
const PrizedrawTither = require("./src/controller/RaffleTitherRoulleteController");

router.get("/", HomeController.Home);

router.get("/cadastro-geral", RegisterController.Register);
router.post("/cadastro-geral", RegisterController.Cadastrar);
router.get("/cadastro-geral/editar", RegisterController.GetAll);
router.get("/cadastro-geral/editar/excluir/:id", RegisterController.Delete);
router.get("/cadastro-geral/editar/:id", RegisterController.Edit);
router.post("/cadastro-geral/editar/:id", RegisterController.Update);

router.get("/cadastro-mensal", MonthlyTitherRegisterController.MonthlyRegister);
router.post("/cadastro-mensal", MonthlyTitherRegisterController.Cadastrar);
router.get("/cadastro-mensal/editar", MonthlyTitherRegisterController.GetAll);
router.get(
  "/cadastro-mensal/editar/excluir/:id",
  MonthlyTitherRegisterController.MonthlyDelete,
);

router.get("/sorteio-geral", PrizedrawGeneral.RaffleGeneral);

router.get("/sorteio-dizimista", PrizedrawTither.RaffleTither);
router.post("/sorteio-dizimista/categoria", PrizedrawTither.GetTithers);

module.exports = router;
