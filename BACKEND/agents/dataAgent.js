const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getDataInsights(idea, searchResults) {
    const systemPrompt = `You are a data-driven market analyst. 
Based on your knowledge, provide 3 realistic data points relevant to this idea 
(market size, competitor examples, industry trends). Be concise, factual-sounding, 
label clearly as estimates if unsure.`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: `Idea: "${idea}"` }
        ],
    });

    return completion.choices[0].message.content;
}

module.exports = { getDataInsights };