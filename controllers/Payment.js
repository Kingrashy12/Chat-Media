import cloudinary from "../utils/cloudinary.js";

export const PayClient = async (req, res) => {
  try {
    const { card } = req.body;
    const uploadCard = await cloudinary.uploader.upload(card, {
      upload_preset: "hotles_message",
    });
    res.status(201).json(uploadCard);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
