const Listing = require("../models/listings");
const Review = require("../models/review");

const showNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

const create = async (req, res) => {
    req.body.owner = req.session.user.id;

    await Listing.create(req.body);

    res.redirect("/listings");
};

const show = async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate("owner");
    const reviews = await Review.find({ listing: req.params.id }).populate("author");

    res.render("listings/show.ejs", { listing, reviews });
};

const createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return res.redirect("/listings");
    }

    if (!req.body.text || !req.body.text.trim()) {
        return res.redirect(`/listings/${req.params.id}`);
    }

    await Review.create({
        text: req.body.text.trim(),
        author: req.session.user.id,
        listing: listing._id,
    });

    res.redirect(`/listings/${req.params.id}`);
};

const showEditForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    res.render("listings/edit.ejs", { listing });
};

const update = async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body);

    res.redirect("/listings/index");
};

const deleteListing = async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);

    res.redirect("/listings/index");
};

const index = async (req, res) => {
    const allListings = await Listing.find().populate("owner");
   
    res.render("listings/index.ejs", { allListings });
};

module.exports = {
    showNewForm,
    create,
    show,
    createReview,
    showEditForm,
    update,
    deleteListing,
    index,
};
