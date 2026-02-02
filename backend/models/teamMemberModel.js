import mongoose from "mongoose";

const teamMemberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String, // image URL (Cloudinary / static)
      required: true,
    },
  },
  { timestamps: true }
);

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
export default TeamMember;
