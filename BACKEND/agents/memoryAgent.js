const Debate = require("../models/Debate");

async function getMemory(userId) {
    try {

        const previousDebates = await Debate.find({
            userId: userId
        })
            .sort({ createdAt: -1 })
            .limit(5);

        return previousDebates;

    } catch (err) {

        console.error("Memory Agent Error:", err);
        return [];

    }
}

module.exports = {
    getMemory
};