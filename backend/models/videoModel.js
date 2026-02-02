import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    // title: {
    //   type: String,
    //   required: true,
    // },
    thumbnail: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);
export default Video;
