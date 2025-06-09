const OpenAI = require("openai");
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAndSaveImage(prompt) {
  try {
    // Generate image - NOTE: gpt-image-1 doesn't support response_format parameter
    const response = await openai.images.generate({
      model: "gpt-image-1",
      prompt: prompt,
      n: 1,
      size: "1536x1024",
      quality: "medium"
    });

    // Check for base64 data in response (gpt-image-1 returns b64_json)
    if (!response.data?.[0]?.b64_json) {
      console.error("Invalid response format:", JSON.stringify(response, null, 2));
      throw new Error("No image data in response");
    }

    // Create images directory
    const imageDir = path.join(__dirname, 'images');
    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true });
    }

    // Create filename and path
    const fileName = `image_${Date.now()}.png`;
    const filePath = path.join(imageDir, fileName);
    
    // Decode and save image
    const base64Data = response.data[0].b64_json;
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    fs.writeFileSync(filePath, imageBuffer);
    console.log(`Image saved successfully at: ${filePath}`);
    
    return filePath;

  } catch (error) {
    console.error("Error generating/saving image:", error.message);
    throw error;
  }
}

// Export only the function
module.exports = generateAndSaveImage;