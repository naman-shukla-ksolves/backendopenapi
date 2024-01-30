const { Configuration, OpenAIApi } = require('openai');

const generateImageService = async (prompt, chatGPTApiKey, imageGenerationOptions) => {
    const configuration = new Configuration({ apiKey: chatGPTApiKey });
    const openai = new OpenAIApi(configuration);

    const samples = imageGenerationOptions.samples || 1;
    console.log(imageGenerationOptions, samples, prompt);

    try {
        if (samples > 5) {
            throw new Error("Sample count exceeds the limit (5).");
        } else {
            const response = await openai.createImage({
                prompt,
                n: samples,
                size: `${imageGenerationOptions.width}x${imageGenerationOptions.height}`,
            });
            console.log(response.data.data[0].url);

            const imageUrls = [];
            for (let i = 0; i < response.data.data.length; i++) {
                const imageData = response.data.data[i];
                if (imageData.url) {
                    imageUrls.push(imageData.url);
                }
            }
            const imageResponse = { imageUrls };
            return JSON.stringify(imageResponse);
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { generateImageService };
