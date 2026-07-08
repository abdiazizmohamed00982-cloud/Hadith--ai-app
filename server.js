const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
    try {
        const { message, language } = req.body;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: `You are Jarvis. Respond strictly in ${language}.` },
                { role: "user", content: message }
            ],
        });
        const chatResponse = completion.choices[0].message.content;

        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "onyx",
            input: chatResponse,
        });
        
        const buffer = Buffer.from(await mp3.arrayBuffer());
        res.json({ reply: chatResponse, audio: buffer.toString('base64') });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
