import { useState, useEffect } from "react";
import api from "../utils/axiosConfig";

const AdminVideos = () => {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const extractYouTubeId = (url) => {
    const reg =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(reg);
    return match ? match[1] : null;
  };

  /* Load existing video */
  useEffect(() => {
    const loadVideo = async () => {
      const { data } = await api.get("/api/videos/hero");
      if (data) {
        setTitle(data.title);
        setYoutubeUrl(data.videoUrl);
        setThumbnail(data.thumbnail);
      }
    };
    loadVideo();
  }, []);

  /* Update thumbnail when URL changes */
  const handleUrlChange = (url) => {
    setYoutubeUrl(url);
    const id = extractYouTubeId(url);
    setThumbnail(
      id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ""
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await api.put("/api/videos/hero", {
      title,
      videoUrl: youtubeUrl,
      thumbnail,
    });

    alert("Hero video updated");
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Hero Video</h1>

      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        {/* <input
          className="w-full border px-4 py-3 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /> */}

        <input
          className="w-full border px-4 py-3 rounded"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => handleUrlChange(e.target.value)}
          required
        />

        {thumbnail && (
          <img src={thumbnail} alt="Preview" className="rounded-lg" />
        )}

        <button className="bg-black text-white px-6 py-3 rounded">
          Update Video
        </button>
      </form>
    </div>
  );
};

export default AdminVideos;
