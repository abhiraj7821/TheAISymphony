const AiModel = require('../models/aimodel');
const cloudinary = require('../config/cloudinary');
const generateAndSaveImage = require('../config/genImage');

const aigenerateImage = async (req, res) => {
  try {
    const { name, color } = req.body;
    
    if (!name || !color) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const prompt = `A cute ${name} in a ${color} puffer jacket in solid color background`;
    
    // Generate image
    (async () => {
      try {
        const imagePath = await generateAndSaveImage(prompt);
        console.log("Image saved at:", imagePath);

        // Upload to Cloudinary
        const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);

        // Save to database
        const aiModel = new AiModel({
          name,
          color,
          prompt,
          imagePath,
          imageUrl: cloudinaryResponse.secure_url,
          cloudinaryId: cloudinaryResponse.public_id,
          createdAt: new Date(),
        });
        await aiModel.save();
        res.status(201).json({ message: 'Image generated successfully', cloudinaryResponse });

      } catch (error) {
        console.error("Error:", error);
      }
    })();
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { aigenerateImage };