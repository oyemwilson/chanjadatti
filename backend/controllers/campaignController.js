import Campaign from "../models/campaignModel.js";

/* PUBLIC */
export const getActiveCampaign = async (req, res) => {
  const campaign = await Campaign.findOne({ isActive: true });
  res.json(campaign);
};

export const getAllCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({});
  res.json(campaigns);
};

/* ADMIN */
export const createCampaign = async (req, res) => {
  try {
    const {
      title,
      subtitle,
      heroOverlayText,
      content,
      ctaText,
      ctaLink,
    } = req.body;

    if (!req.files?.heroImage) {
      return res.status(400).json({ message: "Hero image is required" });
    }

    const gallery =
      req.files?.gallery?.map((f) => f.path) || [];

    const campaign = await Campaign.create({
      title,
      subtitle,
      heroOverlayText,
      content,
      heroImage: req.files.heroImage[0].path,
      gallery,
      ctaText,
      ctaLink,
    });

    res.status(201).json(campaign);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const fields = [
      "title",
      "subtitle",
      "heroOverlayText",
      "content",
      "ctaText",
      "ctaLink",
    ];

    fields.forEach((f) => {
      if (req.body[f] !== undefined) {
        campaign[f] = req.body[f];
      }
    });

    if (req.files?.heroImage) {
      campaign.heroImage = req.files.heroImage[0].path;
    }

    if (req.files?.gallery) {
      campaign.gallery = req.files.gallery.map((f) => f.path);
    }

    await campaign.save();
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCampaignById = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }
  res.json(campaign);
};




export const deleteCampaign = async (req, res) => {
  await Campaign.findByIdAndDelete(req.params.id);
  res.json({ message: "Campaign deleted" });
};

export const setActiveCampaign = async (req, res) => {
  await Campaign.updateMany({}, { isActive: false });
  const campaign = await Campaign.findByIdAndUpdate(
    req.params.id,
    { isActive: true },
    { new: true }
  );
  res.json(campaign);
};
