import TeamMember from "../models/teamMemberModel.js";

/* PUBLIC – get all team members */
export const getTeamMembers = async (req, res) => {
  const members = await TeamMember.find({});
  res.json(members);
};

export const createTeamMember = async (req, res) => {
  const { name, title } = req.body;

  const member = await TeamMember.create({
    name,
    title,
    image: req.file.path, // 👈 Cloudinary URL
  });

  res.status(201).json(member);
};

export const updateTeamMember = async (req, res) => {
  const { name, title } = req.body;
  const member = await TeamMember.findById(req.params.id);

  if (!member) {
    return res.status(404).json({ message: "Member not found" });
  }

  member.name = name;
  member.title = title;

  if (req.file) {
    member.image = req.file.path;
  }

  const updated = await member.save();
  res.json(updated);
};


/* ADMIN – delete */
export const deleteTeamMember = async (req, res) => {
  await TeamMember.findByIdAndDelete(req.params.id);
  res.json({ message: "Member removed" });
};
