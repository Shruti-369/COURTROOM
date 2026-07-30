const mongoose = require("mongoose");

const debateSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        idea: {
            type: String,
            required: true,
        },

        verdict: {
            type: String,
            required: true,
        },

        confidence: {
            type: Number,
            required: true,
        },

        summary: {
            type: String,
            default: "",
        },

        topRisks: {
            type: [String],
            default: [],
        },

        topOpportunities: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Debate", debateSchema);