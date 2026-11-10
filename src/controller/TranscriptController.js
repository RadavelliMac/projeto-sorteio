const TranscriptModel = require("../model/TranscriptModel");

exports.Transcript = async (req, res) => {
  try {
    const dizimistas = await TranscriptModel.getAll();
    res.render("transcript", { dizimistas });
  } catch (e) {
    console.log(e);
  }
};

exports.Register = async (req, res) => {
  try {
    const Transcript = new TranscriptModel(req.body);
    const dizimistas = await Transcript.Cadastrar();
    res.redirect("/sorteio-dizimista/");
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
    res.redirect("/dizimistas-sorteados/");
  } catch (e) {
    console.log(e);
  }
};
