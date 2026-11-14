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
    const Raffle = new RaffleModel(req.body);
    const dizimistas = await Raffle.GetTithers();

    if (Raffle.errors.length > 0) {
      req.flash("error", Raffle.errors);
      return res.redirect("/sorteio-dizimista");
    }

    return res.render("raffleTither", {
      dizimistas,
      messages: {
        success: req.flash("success"),
        error: req.flash("error"),
      },
    });
  } catch (e) {
    console.log(e);
    res.redirect("/sorteio-dizimista");
  }
};
