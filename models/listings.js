const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    response: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

const listingSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    favoritedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    inquiries: [messageSchema],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Listing', listingSchema);