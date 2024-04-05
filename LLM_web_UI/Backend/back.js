const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;

app.post('/convertColor', async (req, res) => {
    try {
        const { color } = req.body;
        if (!color) {
            return res.status(400).send('No color code provided');
        }

        const isValidHex = /^#[0-9A-F]{6}$/i.test(color);
        if (!isValidHex) {
            return res.status(400).json({ generatedText: 'Invalid hex color code' });
        }

        const prompt = `Convert the CSS hex color code ${color} to an English color name.`;
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{
                role: "system",
                content: "You are a helpful assistant. When given a CSS hex color code, respond only with the name of the color in one or two words."
            }, {
                role: "user",
                content: prompt
            }]
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        const latestMessage = response.data.choices[0].message.content;
        const colorName = latestMessage.split('\n')[0].trim(); 
        res.json({ generatedText: colorName });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Error processing your request: " + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
