![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![AI](https://img.shields.io/badge/Architecture-Multi--Agent_AI-gold)

# ⚖️ The Courtroom — Multi-Agent AI Decision Intelligence Platform

> **Before you decide, put it on trial.**

The Courtroom is a **Multi-Agent AI Decision Intelligence Platform** that helps users evaluate ideas and important decisions through structured adversarial reasoning.

Instead of relying on a single LLM response, The Courtroom orchestrates multiple **role-specialized AI agents** that independently research, debate, remember previous decisions, and collaboratively deliver an evidence-backed verdict.

Whether it's a startup idea, career decision, business strategy, or personal dilemma, every case is argued from multiple perspectives before the final judgement is delivered.

---

# 🌐 Live Demo

🔗 **Frontend:** *(Add your Vercel URL)*

---

# 🎯 Why The Courtroom?

Most AI assistants provide **one answer**.

The Courtroom believes every important decision deserves a **fair hearing.**

Rather than generating a single response, the system simulates a courtroom where multiple AI agents independently perform specialized tasks before arriving at a final decision.

This creates decisions that are:

- Evidence-backed
- Multi-perspective
- Context-aware
- Personalized
- More transparent

---

# 🤖 Multi-Agent AI Architecture

The Courtroom follows a **Multi-Agent AI workflow** where every AI agent has a dedicated responsibility.

## 🔍 Research Agent

Collects real-world evidence before the debate begins using live web search.

Responsibilities:

- Market insights
- Industry trends
- Competitor discovery
- Supporting evidence

---

## ⚖️ Skeptic Agent

Challenges the user's idea.

Focuses on:

- Risks
- Weaknesses
- Hidden assumptions
- Potential failures

---

## 🌱 Optimist Agent

Presents the strongest possible case in favor of the idea.

Focuses on:

- Opportunities
- Growth potential
- Business value
- Practical strengths

---

## 🧠 Memory Agent

Retrieves previous user debates from MongoDB and provides contextual memory to the Judge Agent.

Instead of treating every discussion independently, the system learns from previous cases to produce more personalized reasoning.

---

## 👨‍⚖️ Judge Agent

The final Judge combines:

- Research evidence
- Skeptic reasoning
- Optimist reasoning
- Historical user context

to generate:

- Final Verdict
- Confidence Score
- Risk Analysis
- Opportunity Analysis
- Executive Summary

---

# ✨ Features

## ⚖️ Multi-Agent Debate

Every decision is debated from opposing perspectives before reaching a conclusion.

---

## 🌍 Live Web Research

Arguments are supported using real-world information gathered through Tavily Search.

---

## 🧠 Personalized Memory

The system remembers previous debates and incorporates historical context into future verdicts.

---

## 📊 Personalized Dashboard

Each user gets their own analytics dashboard containing:

- Total Ideas Evaluated
- Go Decisions
- Conditional Decisions
- No-Go Decisions
- Average Confidence
- Latest Trial

---

## 📚 Debate History

Every trial is securely stored so users can revisit previous discussions and observe how their ideas evolved over time.

---

## 🔐 Secure Authentication

- JWT Authentication
- Protected Routes
- Secure User Sessions

---

# 🚀 Demo Account

Want to explore the application instantly?

Use the demo credentials below.

```text
Email:
shiz@gmail.com

Password:
123456
```

The demo account contains real debates generated during the development of this project.

You can explore:

- Previous AI trials
- Personalized Dashboard
- Debate History
- Memory-aware reasoning
- Confidence trends
- Stored verdicts

---

# 🧠 AI Concepts Used

This project combines several modern AI engineering concepts.

- Multi-Agent AI
- Role-specialized AI Agents
- Prompt Engineering
- Adversarial AI Reasoning
- Tool-Augmented LLM Workflow
- Evidence-backed Decision Making
- Memory-Augmented Reasoning
- Context Retrieval
- Structured JSON Generation
- Multi-step AI Pipeline

---

# 🛠 Technology Stack

## Frontend

- React.js
- Tailwind CSS
- React Router
- Framer Motion
- Axios

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs

---

## AI & Decision Engine

- Groq API (Llama 3.3 70B)
- Tavily Search API
- Multi-Agent AI Architecture
- Prompt Engineering
- Tool-Augmented Reasoning
- Memory-Augmented Generation
- Context-aware Decision Making
- Structured JSON Outputs

---

# 🏗 System Architecture

```text
                    User Decision
                           │
                           ▼
                  Research Agent
            (Live Web Evidence Collection)
                           │
                           ▼
          ┌──────────────────────────┐
          │      Skeptic Agent       │
          └──────────────────────────┘
                           │
                           ▼
          ┌──────────────────────────┐
          │     Optimist Agent       │
          └──────────────────────────┘
                           │
                           ▼
                Memory Agent
      (Historical User Context)
                           │
                           ▼
                Judge Agent
                           │
                           ▼
            Evidence-backed Verdict
                           │
                           ▼
      MongoDB + Dashboard + History
```

---

# 📂 Project Structure

```text
FRONTEND
│
├── components
│   ├── ProtectedRoute
│   └── ui
│
├── context
│   └── AuthContext
│
├── pages
│   ├── Landing
│   ├── Login
│   ├── Signup
│   ├── Courtroom
│   └── Dashboard
│
└── App.jsx


BACKEND
│
├── agents
│   ├── Research Agent
│   ├── Skeptic Agent
│   ├── Optimist Agent
│   ├── Memory Agent
│   └── Judge Agent
│
├── controllers
├── middleware
├── models
├── routes
└── index.js
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/the-courtroom.git
```

Frontend

```bash
cd FRONTEND
npm install
npm run dev
```

Backend

```bash
cd BACKEND
npm install
npm start
```

---

# 🔑 Environment Variables

## Backend

```env
PORT=

MONGO_URI=

JWT_SECRET=

GROQ_API_KEY=

TAVILY_API_KEY=
```

## Frontend

```env
VITE_API_URL=
```

---

# 📸 Screenshots

Add screenshots here.

- Landing Page
- Debate Screen
- Final Verdict
- Dashboard
- Login
- History

---

# 🚀 Future Improvements

- PDF / RAG Evidence Support
- Voice-based Debate
- AI Jury (Multiple Judge Agents)
- Export Verdict as PDF
- Debate Replay Timeline
- Team Collaboration
- Semantic Similarity Between Cases

---

# 👩‍💻 Author

**Shiz**

Built with React, Node.js, MongoDB, and a Multi-Agent AI architecture.

---

> **"Instead of asking AI for answers, put your ideas on trial."**