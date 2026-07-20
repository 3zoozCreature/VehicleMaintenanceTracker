const Listing = require("../models/listings");

const showNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

const create = async (req, res) => {
    req.body.owner = req.session.user.id;

    await Listing.create(req.body);

    res.redirect("/dashboard");
};

module.exports = {
    showNewForm,
    create,
};
