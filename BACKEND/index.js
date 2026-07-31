const protect = require("./middleware/authMiddleware"); //middleware
const Debate = require("./models/Debate");
const authRoutes = require("./routes/authRoutes");
const { searchIdea } = require("./agents/searchAgent");
require('dotenv').config();

const connectDB = require("./config/db");
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

connectDB();

const app = express();      // Pehle app banao

app.use(cors());            // then use middleware 
app.use(express.json());

app.use("/api/auth", authRoutes);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Test route to check Groq connection works
app.get('/test', async (req, res) => {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "user", content: "Say hello in one line." }
            ],
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

const { getSkepticView } = require('./agents/skeptic');
const { getOptimistView } = require('./agents/optimist');
const { getDataInsights } = require('./agents/dataAgent');
const { getVerdict } = require('./agents/verdict');
const { getMemory } = require("./agents/memoryAgent");

app.post("/debate", protect, async (req, res) => {
    try {
        const { idea } = req.body;

        if (!idea) {
            return res.status(400).json({ error: "Idea is required" });
        }
        const previousDebates = await getMemory(req.user.id);
        const memoryContext =
            previousDebates.length > 0
                ? previousDebates
                    .map((debate, index) => `
                        ${index + 1}.
                        Idea: ${debate.idea}
                        Verdict: ${debate.verdict}
                        Confidence: ${debate.confidence}
                        Summary: ${debate.summary}
                        `)
                    .join("\n")
                : "No previous startup evaluations found.";
        console.log(memoryContext);

        const searchResults = await searchIdea(idea);
        console.log(searchResults);

        // Round 1 - parallel
        const [skeptic1, optimist1] = await Promise.all([
            getSkepticView(
                idea,
                null,
                searchResults
            ),
            getOptimistView(idea)
        ]);

        // Round 2 - counter arguments, parallel
        const [skeptic2, optimist2] = await Promise.all([
            getSkepticView(
                idea,
                optimist1,
                searchResults
            ),
            getOptimistView(idea, skeptic1)
        ]);

        // Round 3 - data insights
        const dataInsights = await getDataInsights(
            idea,
            searchResults
        );

        // Final verdict
        const verdict = await getVerdict(
            idea,
            skeptic1,
            optimist1,
            skeptic2,
            optimist2,
            dataInsights,
            memoryContext
        );

        try {
            await Debate.create({
                userId: req.user.id,
                idea,
                verdict: verdict.decision,
                confidence: verdict.confidence,
                summary: verdict.summary,
                topRisks: verdict.top_risks,
                topOpportunities: verdict.top_opportunities,
            });
            console.log("Debate saved successfully!");
        } catch (err) {
            console.error("Failed to save debate:", err);
            console.error(err.stack);
        }

        res.json({
            idea,
            rounds: {
                round1: { skeptic: skeptic1, optimist: optimist1 },
                round2: { skeptic: skeptic2, optimist: optimist2 },
                dataInsights
            },
            verdict
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/debate/history", protect, async (req, res) => {
    try {
        const debates = await Debate.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(debates);

    } catch (err) {
        console.error("History fetch error:", err);

        res.status(500).json({
            error: err.message
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});