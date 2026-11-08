const RaffleModel = require("../model/RaffleModel");

exports.RaffleTither = (req, res) => {
  dizimistas = [];
  res.render("raffleTither", {
    dizimistas,
    messages: {
      success: req.flash("success"),
      error: req.flash("error"),
    },
  });
};

exports.GetTithers = async (req, res) => {
  try {
    const { category } = req.body;
    const dizimistas = await RaffleModel.GetTithers(category);
    return res.render("raffleTither", { dizimistas });
  } catch (e) {
    console.log(e);
    res.redirect("/sorteio-dizimista");
  }
};
