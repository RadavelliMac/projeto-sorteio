const TitherModel = require("../model/RegisterModel");

exports.Register = async (req, res) => {
  res.render("register", {
    messages: {
      success: req.flash("success"),
      error: req.flash("error"),
    },
  });
};

exports.Cadastrar = async (req, res) => {
  try {
    const { code } = req.body;
    const call = await this.GetId(code);

    if (!call) {
      req.flash("error", "Já existe um dizimista com esse código cadastrado");
      return res.redirect("/cadastro-geral");
    }

    const dizimista = new TitherModel(req.body);
    await dizimista.cadastrar();

    if (dizimista.errors.length > 0) {
      req.flash("error", dizimista.errors);
      return res.redirect("/cadastro-geral");
    }

    req.flash("success", "Dizimista cadastrado com sucesso!");
    return res.redirect("/cadastro-geral");
  } catch (e) {
    console.error(e);
    req.flash("error", "Ocorreu um erro inesperado ao cadastrar.");
    return res.redirect("/cadastro-geral");
  }
};

exports.GetId = async (id) => {
  try {
    const dizimistas = await TitherModel.getByID(id);
    if (dizimistas.length > 0) return false;
    return true;
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro ao carregar lista.");
  }
};

exports.GetAll = async (req, res) => {
  try {
    const dizimistas = await TitherModel.buscarTodos();
    return res.render("listAll", {
      dizimistas,
      messages: {
        success: req.flash("success"),
        error: req.flash("error"),
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro ao carregar lista.");
  }
};

exports.Edit = async (req, res) => {
  try {
    const { id } = req.params;
    const dizimistas = await TitherModel.getByID(id);
    res.render("updateTither", {
      dizimistas,
      messages: {
        success: req.flash("success"),
        error: req.flash("error"),
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro ao carregar lista.");
  }
};

exports.Update = async (req, res) => {
  try {
    const { id } = req.params;
    const dizimista = new TitherModel(req.body);
    await dizimista.Update(id);
    if (dizimista.errors.length > 0) {
      req.flash("error", dizimista.errors);
      return res.redirect(`/cadastro-geral/editar/${id}`);
    }

    req.flash("success", "Dizimista atualizado com sucesso!");
    res.redirect("/cadastro-geral/editar/");
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro ao carregar lista.");
  }
};

exports.Delete = async (req, res) => {
  try {
    const { id } = req.params;
    const sucesso = await TitherModel.deletar(id);
    if (!sucesso) {
      req.flash("error", "Não foi possível excluir o registro.");
      return res.redirect("/cadastro-geral/editar/");
    }

    req.flash("success", "Dizimista excluído com sucesso!");
    return res.redirect("/cadastro-geral/editar/");
  } catch (e) {
    console.log(e);
    req.flash("error", "Erro interno ao excluir.");
    res.redirect("/cadastro-geral/editar");
  }
};
