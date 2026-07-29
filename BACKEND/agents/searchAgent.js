const { tavily } = require("@tavily/core");

const client = tavily({
    apiKey: process.env.TAVILY_API_KEY,
});

async function searchIdea(idea) {

    const response = await client.search(idea, {
        searchDepth: "advanced",
        maxResults: 5,
        includeAnswer: true,
    });

    return response;
}

module.exports = { searchIdea };