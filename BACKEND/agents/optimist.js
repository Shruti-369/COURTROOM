const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getOptimistView(idea, previousArgument = null) {
    const systemPrompt = `You are an enthusiastic but grounded advocate evaluating ideas.
Given an idea, list only strengths, opportunities, and potential. Be specific, not generic.
Keep response to 3-4 sharp bullet points, no fluff.`;

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