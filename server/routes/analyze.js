const express = require("express");

const analyzeRoute = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

analyzeRoute.post("/", async (req, res) => {
    const { sentence, style = "professional" } = req.body || {};

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
            error: "GEMINI_API_KEY is not configured",
        });
    }

    if (typeof sentence !== "string" || !sentence.trim()) {
        return res.status(400).json({
            error: "sentence is required",
        });
    }

    const allowedStyles = [
        "professional",
        "simple",
        "friendly",
        "creative",
    ];

    if (!allowedStyles.includes(style)) {
        return res.status(400).json({
            error: "Invalid style",
        });
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-3.5-flash-lite",
        });

        const prompt = `
Rephrase the following sentence in 3 different natural ways.

Writing style: ${style}

Style instructions:
- Professional: formal, polished, and suitable for workplace or academic writing.
- Simple: clear, easy to understand, and concise.
- Friendly: warm, natural, and conversational.
- Creative: expressive, engaging, and slightly more interesting while keeping the original meaning.

Important:
- Keep the original meaning.
- Do not add new information.
- Return ONLY the 3 rephrased sentences.
- Put each sentence on a separate line.
- Do not add numbering, explanations, or comments.

Sentence: ${sentence}
`;

        const result = await model.generateContent(prompt);

        const text = result.response.text().trim();

        const rephrasedSentences = text
            .split(/\r?\n/)
            .map((item) =>
                item
                    .replace(/^\d+[\).\s-]*/, "")
                    .trim()
            )
            .filter(Boolean)
            .slice(0, 3);

        res.status(200).json({
            rephrasedSentences,
        });

    } catch (error) {
        console.error("Gemini request failed:", error.message);

        res.status(500).json({
            error: "Unable to rephrase the sentence",
        });
    }
});

module.exports = analyzeRoute;