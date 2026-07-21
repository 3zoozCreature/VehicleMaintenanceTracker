const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Review", reviewSchema);
