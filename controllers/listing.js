const Listing = require("../models/listings");

const showNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

const create = async (req, res) => {
    req.body.owner = req.session.user.id;

    await Listing.create(req.body);

    res.redirect("/dashboard");
};

const index = async (req, res) => {
    const allListings = await Listing.find().populate('owner')
   
    res.render('listings/index.ejs', {allListings})
}

module.exports = {
    showNewForm,
    create,
    index,
};
