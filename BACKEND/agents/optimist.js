const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getOptimistView(idea, previousArgument = null) {
    const systemPrompt = `You are an expert strategic thinker.

Your role is to identify the strongest opportunities, benefits, or positive aspects of the user's idea or decision.

Rules:
- Give ONLY the 3 strongest points.
- Each point must contain:
  • A short title
  • One concise explanation (maximum 20 words)
- Focus on practical strengths.
- Avoid repetition.`;

    const userPrompt = previousArgument
        ? `Idea: "${idea}"\n\nThe Skeptic argued: "${previousArgument}"\n\nCounter their points directly and reinforce the potential.`
        : `Idea: "${idea}"\n\nGive your optimistic assessment.`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
    });

    return completion.choices[0].message.content;
}

module.exports = { getOptimistView };