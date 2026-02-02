import Video from "../models/videoModel.js";

/**
 * GET hero video (public)
 * Always returns the single video
 */
export const getHeroVideo = async (req, res) => {
  const video = await Video.findOne();
  res.json(video);
};

/**
 * UPDATE hero video (admin)
 * If none exists, create it
 * If it exists, update it
 */
export const updateHeroVideo = async (req, res) => {
  const { title, thumbnail, videoUrl } = req.body;

  const video = await Video.findOneAndUpdate(
    {}, // match the single document
    { title, thumbnail, videoUrl },
    {
      new: true,
      upsert: true, // 🔥 creates if not exists
    }
  );

  res.json(video);
};
