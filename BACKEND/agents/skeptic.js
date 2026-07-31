const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getSkepticView(
    idea,
    previousArgument = null,
    searchResults
) {
    const systemPrompt = `You are an expert critical thinker.

Your role is to identify the most important weaknesses, risks, assumptions, or flaws in the user's idea or decision.

Rules:
- Give ONLY the 3 most important points.
- Each point must contain:
  • A short title (2–5 words)
  • One concise explanation (maximum 20 words)
- Avoid repetition.
- Be objective.
- Focus on the most impactful concerns.`;

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