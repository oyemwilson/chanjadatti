import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    videoUrl: "",
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const { data } = await axios.get("/api/videos");
    setVideos(data);
  };

  const submitHandler = async () => {
    await axios.post("/api/videos", form);
    setForm({ title: "", thumbnail: "", videoUrl: "" });
    fetchVideos();
  };

  const activateVideo = async (id) => {
    await axios.put(`/api/videos/${id}/activate`);
    fetchVideos();
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Manage Hero Video</h2>

      <div className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">
        <input
          placeholder="Title"
          className="input"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Thumbnail URL"
          className="input"
          value={form.thumbnail}
          onChange={e => setForm({ ...form, thumbnail: e.target.value })}
        />
        <input
          placeholder="Video URL (optional)"
          className="input"
          value={form.videoUrl}
          onChange={e => setForm({ ...form, videoUrl: e.target.value })}
        />
        <button
          onClick={submitHandler}
          className="bg-black text-white px-6 py-2 rounded-lg"
        >
          Add Video
        </button>
      </div>

      <div className="space-y-4">
        {videos.map(video => (
          <div
            key={video._id}
            className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <img src={video.thumbnail} className="w-24 rounded" />
              <p className="font-medium">{video.title}</p>
            </div>
            <button
              onClick={() => activateVideo(video._id)}
              className={`px-4 py-2 rounded ${
                video.isActive
                  ? "bg-green-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {video.isActive ? "Active" : "Set Active"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
