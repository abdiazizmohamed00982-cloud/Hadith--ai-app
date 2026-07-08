const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Koodhkani wuxuu si ammaan ah u akhrisanayaa furahaaga Render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
    try {
        const { message, language } = req.body;
        // Waxaan isticmaalaynaa gemini-1.5-flash oo ah mid dhakhso badan oo bilaash ah
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `You are Jarvis. Respond strictly in ${language}. User says: ${message}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
