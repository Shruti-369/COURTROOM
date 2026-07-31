const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getVerdict(
    idea,
    skeptic1,
    optimist1,
    skeptic2,
    optimist2,
    dataInsights,
    memoryContext
) {
    const systemPrompt = `Evaluate the idea objectively.
Review all available evidence before making a final judgement.
Do NOT assume every idea is good.
You must remain unbiased.

Choose:
- Go → if the idea is feasible, valuable, and has strong potential.
- Conditional → if it has potential but requires major improvements.
- No-Go → if the idea is unrealistic, unethical, technically infeasible, illegal, or has no viable business potential.
  It is completely acceptable to return "No-Go" when justified. Based on the full debate transcript, respond ONLY in valid JSON, no markdown, no extra text, in this exact format:
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
Previous User Debates:
${memoryContext}

Instructions:
- Review the previous debates before evaluating the current idea.
- If the current idea is similar to a previous one, mention the similarity.
- If the user is repeating the same mistakes or improving on earlier ideas, include that in your reasoning.
- Use previous debates only as supporting context, not as the sole basis for your decision.

Current Idea:
${idea}

Round 1 - Skeptic: ${skeptic1}
Round 1 - Optimist: ${optimist1}

Round 2 - Skeptic Counter: ${skeptic2}
Round 2 - Optimist Counter: ${optimist2}

Data Insights: ${dataInsights}

Give your final verdict in the required JSON format.
`;

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