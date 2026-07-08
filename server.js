const express = require('express');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // 1. Hel jawaabta qoraalka ah
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }],
        });
        const chatResponse = completion.choices[0].message.content;

        // 2. U beddel cod (Text-to-Speech)
        const mp3 = await openai.audio.speech.create({
            model: "tts-1",
            voice: "onyx",
            input: chatResponse,
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        const audioBase64 = buffer.toString('base64');

        // 3. U dir jawaabta iyo codka
        res.json({ reply: chatResponse, audio: audioBase64 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));
