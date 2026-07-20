const mongoose = require("mongoose");

const maintenanceRecordSchema = new mongoose.Schema(
    {
        serviceType: {
            type: String,
            required: true,
            trim: true,
        },
        serviceDate: {
            type: Date,
            required: true,
        },
        mileage: {
            type: Number,
            min: 0,
        },
        cost: {
            type: Number,
            min: 0,
        },
        notes: {
            type: String,
            default: "",
            trim: true,
        },
        garage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
        },
    },
    { timestamps: true }
);

const vehicleSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        make: {
            type: String,
            required: true,
            trim: true,
        },
        model: {
            type: String,
            required: true,
            trim: true,
        },
        year: {
            type: Number,
            required: true,
            min: 1886,
        },
        plateNumber: {
            type: String,
            trim: true,
        },
        currentMileage: {
            type: Number,
            default: 0,
            min: 0,
        },
        maintenanceRecords: [maintenanceRecordSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model(
    "Vehicle",
    vehicleSchema,
);
