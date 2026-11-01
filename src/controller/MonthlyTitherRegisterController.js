const { openDb, setupDatabase } = require("../database/database");

const MonthlyTitherRegisterModel = require("../model/MonthlyTitherRegisterModel");

exports.MonthlyRegister = (req, res) => {
  res.render("monthlyRegister", {
    messages: {
      success: req.flash("success"),
      error: req.flash("error"),
    },
  });
};

exports.Cadastrar = async (req, res) => {
  try {
    const { titherId } = req.body;
    const id = Number(titherId);
    const consultation = await MonthlyTitherRegisterModel.Consultar(id);
    const monthlyConsultation =
      await MonthlyTitherRegisterModel.ConsultarMes(id);

    if (consultation.length < 1) {
      req.flash("error", "Nenhum dizimista com esse número foi encontrado");
      return res.redirect("/cadastro-mensal");
    }

    if (monthlyConsultation.length > 0) {
      req.flash("error", "Esse dizimista já está participando do sorteio");
      return res.redirect("/cadastro-mensal");
    }

    await MonthlyTitherRegisterModel.Cadastrar(id);
    req.flash("success", "Dizimista cadastrado com sucesso!");
    return res.redirect("/cadastro-mensal");
  } catch (e) {
    console.log(`Erro interno: ${e}`);
  }
};

exports.GetAll = async (req, res) => {
  try {
    const dizimistas = await MonthlyTitherRegisterModel.GetAll();
    return res.render("ListAllMonthlyTithers", {
      dizimistas,
      messages: {
        success: req.flash("success"),
        error: req.flash("error"),
      },
    });
  } catch (e) {
    console.log(e);
  }
};

exports.MonthlyDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const newId = Number(id);
    const dizimista = await MonthlyTitherRegisterModel.Delete(id);
    if (dizimista) {
      req.flash("success", "Dizimista excluído com sucesso!");
      return res.redirect("/cadastro-mensal/editar");
    }

    req.flash("error", "Erro ao tentar excluir dizimista");
    return res.redirect("/cadastro-mensal/editar");
  } catch (e) {
    console.log(e);
  }
};
