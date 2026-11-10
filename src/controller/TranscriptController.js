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

exports.Register = async (req, res) => {
  try {
    const Transcript = new TranscriptModel(req.body);
    const dizimistas = await Transcript.Cadastrar();

    req.flash("success", "Dizimista salvo no historico!");
    return res.redirect("/sorteio-dizimista");
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
    const Transcript = new TranscriptModel(req.body);
    const dizimistas = await Transcript.Update();

    req.flash("success", "Dizimista atualizado com sucesso!");
    res.redirect("/dizimistas-sorteados/");
  } catch (e) {
    console.log(e);
  }
};
