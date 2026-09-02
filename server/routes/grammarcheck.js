const express = require("express");
const analyzeRoute = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

analyzeRoute.post("/", async (req, res) => {
    const { sentence, text } = req.body || {};
    const inputText = typeof text === "string" ? text : sentence;

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
            error: "GEMINI_API_KEY is not configured",
        });
    }

    if (typeof inputText !== "string" || !inputText.trim()) {
        return res.status(400).json({
            error: "text is required",
        });
    }

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-3.5-flash-lite",
        });

        const prompt = `
You are a helpful assistant that checks and corrects grammar errors in the following text. Only return the corrected text without any additional comments or context.
Text: ${inputText}
`;

        const result = await model.generateContent(prompt);
        const correctedText = result.response.text().trim();

        res.status(200).json({ correctedText });

    } catch (error) {
        console.error("Gemini request failed:", error.message);

        res.status(500).json({
            error: "Unable to check grammar",
        });
    }
});

module.exports = analyzeRoute;