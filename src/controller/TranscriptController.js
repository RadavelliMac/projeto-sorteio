const TranscriptModel = require("../model/TranscriptModel");

exports.Transcript = async (req, res) => {
  try {
    const dizimistas = await TranscriptModel.getAll();
    res.render("transcript", {
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

exports.GetId = async (id) => {
  try {
    const dizimistas = await TranscriptModel.GetId(id);

    if (dizimistas.length > 0) return false;
    return true;
  } catch (e) {
    console.log(e);
  }
};

exports.Register = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      req.flash("error", "Código inválido");
      return res.redirect("/sorteio-dizimista");
    }

    const call = await this.GetId(id);

    if (call) {
      req.flash(
        "error",
        "Não existe nenhum dizimista cadastrado neste mês com esse código",
      );
      return res.redirect("/sorteio-dizimista");
    }

    const Transcript = new TranscriptModel(req.body);
    const dizimistas = await Transcript.Cadastrar();

    if (Transcript.errors.length > 0) {
      req.flash("error", Transcript.errors);
      return res.redirect("/sorteio-dizimista");
    }

    req.flash("success", "Dizimista salvo no historico!");
    return res.redirect("/sorteio-dizimista");
  } catch (e) {
    console.log(e);
  }
};

exports.GetRaffleById = async (id) => {
  try {
    const dizimistas = await TranscriptModel.GetRaffleById(id);
    if (dizimistas.length > 0) return false;
    return true;
  } catch (e) {
    console.log(e);
  }
};

exports.Edit = async (req, res) => {
  try {
    const { id } = req.params;
    const dizimistas = await TranscriptModel.Edit(id);
    res.render("updateTranscript", { dizimistas });
  } catch (e) {
    console.log(e);
  }
};

exports.Update = async (req, res) => {
  try {
    const { id } = req.params;

    const call = await this.GetRaffleById(id);

    if (call) {
      req.flash(
        "error",
        "Não existe nenhum dizimista cadastrado neste mês com esse código",
      );
      return res.redirect("/dizimistas-sorteados");
    }

    const Transcript = new TranscriptModel(req.body);
    const dizimistas = await Transcript.Update(id);

    if (Transcript.errors.length > 0) {
      req.flash("error", Transcript.errors);
      return res.redirect("/dizimistas-sorteados");
    }

    req.flash("success", "Dizimista atualizado com sucesso!");
    res.redirect("/dizimistas-sorteados");
  } catch (e) {
    console.log(e);
  }
};
