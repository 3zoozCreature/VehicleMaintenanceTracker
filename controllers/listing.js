const Listing = require("../models/listings");

const showNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

const create = async (req, res) => {
    req.body.owner = req.session.user.id;

    await Listing.create(req.body);

    res.redirect("/listings");
};

const showEditForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    res.render("listings/edit.ejs", { listing });
};

const update = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/listings/index");
};

const index = async (req, res) => {
    const allListings = await Listing.find().populate("owner");
   
    res.render("listings/index.ejs", { allListings });
};

module.exports = {
    showNewForm,
    create,
    showEditForm,
    update,
    index,
};
