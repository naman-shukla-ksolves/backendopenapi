const axios = require('axios');

async function generateText(question, chatGPTApiKey, textGenerationOptions) {
    const {
        frequency_penalty,
        max_token,
        presence_penalty,
        top_p
    } = textGenerationOptions;

    console.log(frequency_penalty, max_token, presence_penalty, question, top_p);

    const requestData = {
        messages: [
            {
                role: 'user',
                content: question
            }
        ],
        model: 'gpt-3.5-turbo'
    };

    const functions = [
        {
            name: "get_current_weather",
            description: "Get the current weather in a given location",
            parameters: {
                type: "object",
                properties: {
                    location: {
                        type: "string",
                        description: "The city and state, e.g. San Francisco, CA",
                    },
                    unit: { type: "string", enum: ["celsius", "fahrenheit"] },
                },
                required: ["location"],
            },
        }
    ];

    if (frequency_penalty) {
        requestData.frequency_penalty = frequency_penalty;
    }
    if (presence_penalty) {
        requestData.presence_penalty = presence_penalty;
    }
    if (max_token) {
        requestData.max_tokens = max_token;
    }
    if (top_p) {
        requestData.temperature = top_p;
    }
    if (functions) {
        requestData.functions = functions;
        requestData.function_call = "auto";
    }

    const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        requestData,
        {
            headers: {
                Authorization: `Bearer ${chatGPTApiKey}`,
            },
        }
    );

    return response.data.choices[0].message.content;
}

module.exports = { generateText };
