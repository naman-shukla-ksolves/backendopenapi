const textService = require('../services/textService');
const chatGPTApiKey = process.env.chatGPTApiKey;

async function generateText(req, res) {
    const { frequency_penalty, max_token, presence_penalty, question, top_p } = req.body;

    const textGenerationOptions = {
        frequency_penalty: frequency_penalty,
        max_token: max_token,
        presence_penalty: presence_penalty,
        top_p: top_p
    };

    try {
        const generatedText = await textService.generateText(question, chatGPTApiKey, textGenerationOptions);
        res.status(200).json({ text: generatedText });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The Text could not be generated',
        });
    }
}

module.exports = { generateText };
