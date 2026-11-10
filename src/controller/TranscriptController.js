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
