const axios = require("axios");

async function generateText(question, chatGPTApiKey, textGenerationOptions) {
  const { frequency_penalty, max_token, presence_penalty, top_p } =
    textGenerationOptions;

  console.log(frequency_penalty, max_token, presence_penalty, question, top_p);

  const requestData = {
    messages: [
      {
        role: "user",
        content: question,
      },
    ],
    model: "gpt-3.5-turbo",
  };

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

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    requestData,
    {
      headers: {
        Authorization: `Bearer ${chatGPTApiKey}`,
      },
    }
  );

  return response?.data?.choices[0]?.message?.content;
}

module.exports = { generateText };
