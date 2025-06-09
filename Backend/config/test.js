const generateAndSaveImage = require('./genImage');

(async () => {
  try {
    const prompt = "A cute white tiger in a green puffer jacket in solid color background";
    const imagePath = await generateAndSaveImage(prompt);
    console.log("Image saved at:", imagePath);
  } catch (error) {
    console.error("Error:", error);
  }
})();