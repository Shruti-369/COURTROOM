const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getSkepticView(
    idea,
    previousArgument = null,
    searchResults
) {
    const systemPrompt = `You are a harsh, realistic critic evaluating ideas. 
Given an idea, list only risks, flaws, and challenges. Be specific, not generic. 
Keep response to 3-4 sharp bullet points, no fluff.`;

    const userPrompt = previousArgument
        ? `Idea: "${idea}"\n\nThe Optimist argued: "${previousArgument}"\n\nCounter their points directly and add any new risks.`
        : `Idea: "${idea}"\n\nGive your critical assessment.`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
    });

    return completion.choices[0].message.content;
}

module.exports = { getSkepticView };