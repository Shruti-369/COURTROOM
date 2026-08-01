![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![Groq](https://img.shields.io/badge/Groq-Llama%203.3%2070B-F55036)
![AI](https://img.shields.io/badge/Architecture-Multi--Agent%20AI-gold)
![Research](https://img.shields.io/badge/Web-Live%20Research-blue)
![Memory](https://img.shields.io/badge/Context-Memory%20Agent-purple)

# ⚖️ The Courtroom — Multi-Agent AI Decision Intelligence Platform

> **Before you decide, put it on trial.**

The Courtroom is a **Multi-Agent AI platform** that evaluates ideas through structured adversarial reasoning.

Rather than asking a single language model for one answer, the platform simulates a courtroom where multiple AI agents independently perform specialized tasks before a final verdict is delivered.

Every idea goes through five reasoning stages:

- Evidence Collection
- Skeptical Analysis
- Optimistic Analysis
- Historical Context
- Final Judgment

The result is not simply another AI response, but a transparent decision-making process that exposes trade-offs, assumptions, opportunities and risks before recommending a course of action.

---

# 🌐 Live Demo

Frontend:
https://frontend-555vi2eoz-shruti-s-projects-dad80e39.vercel.app/

---

# 🚀 Demo Account

If you'd like to explore the application without creating a new account, use the demo credentials below.

```text
Email:
shiz@gmail.com

Password:
123456
```

The demo account already contains previous debates generated during development.

You can explore:

- Debate History
- Personalized Dashboard
- Memory-aware Judgements
- Confidence Trends
- Stored Verdicts

---

# Why The Courtroom?

Most AI assistants answer a question once and move on.

Real decisions rarely work that way.

Launching a startup, changing careers, choosing between competing strategies, or making an important purchase usually involves conflicting opinions rather than a single correct answer.

Instead of pretending certainty exists, The Courtroom creates structured disagreement.

Every decision is challenged before it is accepted.

Rather than producing the fastest answer, the system attempts to produce a better reasoned one.

---

# Why not a single LLM?

Large Language Models are excellent at reasoning, but asking one model for one answer introduces an important limitation.

The same model is expected to:

- search for evidence
- identify risks
- defend opportunities
- remember previous context
- judge its own reasoning

These responsibilities compete with one another.

Instead, this project separates those responsibilities into multiple specialized AI agents.

Each agent focuses on one objective only.

The final verdict is produced only after every agent has completed its role.

This separation makes the reasoning process significantly easier to understand, audit and improve.

---

# Multi-Agent AI Architecture

The Courtroom follows a **role-specialized Multi-Agent architecture**.

Instead of one intelligent assistant attempting every task, each AI agent performs an independent responsibility.

---

## 🔍 Evidence Agent

The first responsibility is gathering evidence.

Before any reasoning begins, the system performs a live web search using Tavily.

This gives every subsequent agent access to current information instead of relying entirely on the model's internal knowledge.

Without this step, debates about startups, products or technologies could easily rely on outdated information.

The Evidence Agent intentionally performs no reasoning.

Its only responsibility is collecting relevant external context.

---

## ⚖️ Skeptic Agent

The Skeptic Agent attempts to challenge the user's idea.

Rather than encouraging it, the goal is to expose weaknesses.

It searches for:

- assumptions
- hidden risks
- scalability issues
- business challenges
- technical limitations
- execution risks

The objective is not negativity.

The objective is stress-testing the idea before commitment.

---

## 🌱 Optimist Agent

After criticism has been presented, the Optimist Agent argues the opposite side.

It focuses on:

- opportunities
- strengths
- market potential
- long-term value
- practical advantages

Separating optimism from skepticism prevents the model from producing generic "balanced" answers.

Each side is encouraged to build the strongest possible case independently.

---

## 🧠 Memory Agent

Real decisions rarely happen in isolation.

Someone exploring multiple education startup ideas, for example, should not be treated like a completely new user every time.

The Memory Agent retrieves previous debate summaries from MongoDB and provides historical context to the final Judge.

Rather than storing conversations simply for chat continuity, it stores previous decision outcomes so future verdicts can remain consistent with the user's earlier reasoning.

This creates personalization without unnecessarily injecting entire conversations into every prompt.

---

## 👨‍⚖️ Verdict Agent

The Verdict Agent never argues.

Instead, it acts as an independent judge.

It combines:

- Evidence Agent output
- Skeptic reasoning
- Optimist reasoning
- Historical context

before producing:

- Final Verdict
- Confidence Score
- Risk Summary
- Opportunity Summary
- Executive Explanation

Separating judgement from argument generation reduces confirmation bias and creates a much more transparent reasoning pipeline.

---

# Why Live Web Research?

Large Language Models are trained on historical knowledge.

Important decisions often depend on current information.

A startup idea may succeed or fail depending on today's competitors rather than last year's.

For this reason every debate begins with live web research.

Evidence is collected before opinions are generated.

This keeps arguments grounded in current information instead of assumptions alone.

---

# Why Memory?

Many AI systems forget previous conversations once a session ends.

Decision making benefits from continuity.

If a user consistently explores healthcare startups, future healthcare ideas should be evaluated with that historical context in mind.

The Memory Agent therefore retrieves previous verdicts before the final judgement.

The goal is not to remember conversations.

The goal is to remember decisions.

---

# How Confidence is Calculated

The confidence score is intentionally model-generated rather than mathematically averaged.

Instead of computing arbitrary percentages, the Verdict Agent evaluates:

- strength of supporting evidence
- agreement or disagreement between agents
- quality of reasoning
- remaining uncertainty

Confidence therefore represents how convincing the complete decision process was, rather than simply averaging unrelated numbers.

---

# Debate History

Every completed debate is stored securely in MongoDB.

Instead of treating every session as disposable, The Courtroom maintains a history of previous trials so users can revisit earlier decisions and understand how their thinking has evolved over time.

Each stored debate contains:

- Original Idea
- Final Verdict
- Confidence Score
- Executive Summary
- Timestamp

The stored history also serves another purpose—it provides contextual memory for future decisions.

---

# Personalized Dashboard

The dashboard summarizes a user's decision-making journey instead of displaying raw database entries.

For every user, the dashboard automatically computes:

- Total Ideas Evaluated
- Go Decisions
- Conditional Decisions
- No-Go Decisions
- Average Confidence
- Most Recent Verdict

Rather than simply visualizing data, the dashboard provides a quick overview of the user's historical decision patterns.

---

# Why store debate history?

Keeping previous debates is useful for more than record keeping.

Historical decisions become valuable context for future reasoning.

Without stored history, every debate becomes completely independent.

By saving verdicts and summaries, the Memory Agent can personalize future recommendations while still keeping prompts lightweight.

This design intentionally stores only high-level decision context rather than full conversation transcripts, reducing unnecessary prompt size while preserving continuity.

---

# AI Concepts Used

This project combines multiple AI engineering concepts rather than relying on a single prompt.

- Multi-Agent AI
- Role-specialized AI Agents
- Prompt Engineering
- Adversarial AI Reasoning
- Tool-Augmented LLM Workflow
- Memory-Augmented Decision Making
- Context Retrieval
- Structured JSON Generation
- Evidence-backed Decision Intelligence

---

# Technology Stack

## Frontend

- React.js
- React Router
- Tailwind CSS
- Framer Motion
- Axios
- Recharts

The frontend focuses on presenting the entire reasoning process rather than only the final answer.

Animations are used to visualize how different agents participate throughout the trial, making the decision pipeline easier to understand.

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication

The backend is responsible for authentication, debate orchestration, history storage, dashboard generation and communication with all AI services.

---

## AI Stack

- Groq API
- Llama 3.3 70B Versatile
- Tavily Search API

Instead of calling one LLM once, the backend orchestrates multiple reasoning stages.

Each stage has its own prompt, objective and output before passing structured context to the next stage.

This keeps every agent focused on a single responsibility rather than attempting every reasoning task at once.

---

# System Architecture

```text
                     User Idea
                          │
                          ▼
                 Evidence Agent
             (Live Web Research)
                          │
                          ▼
          ┌─────────────────────────┐
          │     Skeptic Agent       │
          └─────────────────────────┘
                          │
                          ▼
          ┌─────────────────────────┐
          │    Optimist Agent       │
          └─────────────────────────┘
                          │
                          ▼
                Memory Agent
      (Historical Decision Context)
                          │
                          ▼
                 Verdict Agent
                          │
                          ▼
             Final AI Verdict
                          │
                          ▼
       MongoDB + History + Dashboard
```

---

# Project Structure

```text
FRONTEND
│
├── components
│
├── context
│
├── pages
│   ├── Landing
│   ├── Login
│   ├── Signup
│   ├── Dashboard
│   └── Courtroom
│
├── App.jsx
└── main.jsx


BACKEND
│
├── agents
│   ├── Evidence Agent
│   ├── Skeptic Agent
│   ├── Optimist Agent
│   ├── Memory Agent
│   └── Verdict Agent
│
├── middleware
├── models
├── routes
├── controllers
└── index.js
```

---

# Installation

Clone the repository.

```bash
git clone https://github.com/yourusername/the-courtroom.git
```

Install frontend dependencies.

```bash
cd FRONTEND
npm install
npm run dev
```

Install backend dependencies.

```bash
cd BACKEND
npm install
npm start
```

---

# Environment Variables

Backend

```env
PORT=

MONGO_URI=

JWT_SECRET=

GROQ_API_KEY=

TAVILY_API_KEY=
```

Frontend

```env
VITE_API_URL=
```

---

# Design Decisions & Trade-offs

## Why Prompt Engineering instead of Fine-Tuning?

Fine-tuning requires a large task-specific dataset.

This project focuses on reasoning rather than memorization, and there was no sufficiently large labeled dataset available for training.

Instead, I used role-specific prompts for each AI agent.

This approach allows every agent to specialize in a particular responsibility while remaining lightweight, inexpensive, and easy to iterate on.

---

## Why not LangGraph or CrewAI?

Frameworks such as LangGraph and CrewAI provide advanced orchestration features including planning, branching, and dynamic execution.

For this project, I intentionally implemented the orchestration manually using Express controllers and modular agent functions.

This keeps the reasoning pipeline transparent, easier to debug, and avoids introducing additional framework complexity while still demonstrating the core principles of multi-agent collaboration.

---

## Why use Multiple AI Agents?

One language model can perform many tasks, but combining all responsibilities into a single prompt makes the reasoning process difficult to understand and maintain.

By assigning independent responsibilities to specialized agents, each stage becomes easier to optimize, evaluate and extend.

The final verdict therefore represents the combined reasoning of multiple independent stages rather than a single generated answer.

---

# Known Limitations

- Web search quality depends on the availability and relevance of external search results.
- Confidence scores are model-generated and represent reasoning confidence rather than statistical certainty.
- The reasoning pipeline follows a fixed workflow rather than dynamic autonomous planning.
- Previous debate summaries are stored instead of full conversation transcripts to keep prompts efficient.

---

# Future Improvements

- PDF / RAG-based evidence retrieval
- Voice-based courtroom debates
- AI Jury with multiple Verdict Agents
- Semantic similarity search across previous debates
- Exportable PDF reports
- Debate replay timeline
- Team workspaces and collaborative decision making

---

# Author

**Shiz**

Built with React, Node.js, MongoDB and a Multi-Agent AI architecture.

---

> **"Instead of asking AI for answers, put your ideas on trial."**
