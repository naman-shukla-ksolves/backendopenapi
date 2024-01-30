const { generateImageService } = require('../services/imageService');
const { chatGPTApiKey } = require('../config/config');

const generateImage = async (req, res) => {
    const { prompt, width, height, cfg_scale, samples } = req.body;

    const imageGenerationOptions = {
        cfg_scale: cfg_scale,
        samples: samples,
        width: width,
        height: height
    };
    try {
        const imageUrls = await generateImageService(prompt, chatGPTApiKey, imageGenerationOptions);
        res.status(200).json({
            success: true,
            data: imageUrls,
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        res.status(400).json({
            success: false,
            error: 'The image could not be generated',
        });
    }
};

module.exports = { generateImage };
