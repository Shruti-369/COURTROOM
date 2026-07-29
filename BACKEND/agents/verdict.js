const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getVerdict(idea, skeptic1, optimist1, skeptic2, optimist2, dataInsights) {
    const systemPrompt = `You are a fair judge. Based on the full debate transcript, respond ONLY in valid JSON, no markdown, no extra text, in this exact format:
{
  "decision": "Go" | "Conditional" | "No-Go",
  "confidence": <number 0-100>,
  "skeptic_score": <number 0-100>,
  "optimist_score": <number 0-100>,
  "top_risks": ["...", "...", "..."],
  "top_opportunities": ["...", "...", "..."],
  "summary": "2-3 line final verdict explanation"
}`;

    const userPrompt = `
Idea: "${idea}"

Round 1 - Skeptic: ${skeptic1}
Round 1 - Optimist: ${optimist1}

Round 2 - Skeptic Counter: ${skeptic2}
Round 2 - Optimist Counter: ${optimist2}

Data Insights: ${dataInsights}

Give your final verdict.`;

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
        ],
    });

    let raw = completion.choices[0].message.content;
    raw = raw.replace(/```json|```/g, '').trim();

    try {
        return JSON.parse(raw);
    } catch (e) {
        console.error("Verdict JSON parse failed:", raw);
        return { error: "Could not parse verdict", raw };
    }
}

module.exports = { getVerdict };