import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import api from "../utils/axiosConfig";

export default function AdminCampaigns() {
 const [campaigns, setCampaigns] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    heroOverlayText: "",
    content: "",
    heroImage: null,
    gallery: [],
    ctaText: "Donate Waste",
    ctaLink: "#",
  });

  /* ================= FETCH ================= */
const fetchCampaigns = async () => {
  const { data } = await api.get("/api/campaigns");

  if (Array.isArray(data)) {
    setCampaigns(data);
  } else if (data && Array.isArray(data.campaigns)) {
    setCampaigns(data.campaigns);
  } else {
    setCampaigns([]); // 👈 guaranteed safe
  }
};


  useEffect(() => {
    fetchCampaigns();
  }, []);

  /* ================= SUBMIT ================= */
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.title || !form.heroOverlayText || !form.content) {
      alert("Title, hero text and content are required");
      return;
    }

    if (!editingId && !form.heroImage) {
      alert("Hero image is required");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("subtitle", form.subtitle);
    fd.append("heroOverlayText", form.heroOverlayText);
    fd.append("content", form.content);
    fd.append("ctaText", form.ctaText);
    fd.append("ctaLink", form.ctaLink);

    if (form.heroImage) {
      fd.append("heroImage", form.heroImage);
    }

    form.gallery.forEach((img) => {
      fd.append("gallery", img);
    });

    if (editingId) {
      await api.put(`/api/campaigns/${editingId}`, fd);
    } else {
      await api.post("/api/campaigns", fd);
    }

    resetForm();
    fetchCampaigns();
  };

  /* ================= EDIT ================= */
  const editCampaign = (c) => {
    setEditingId(c._id);
    setForm({
      title: c.title,
      subtitle: c.subtitle || "",
      heroOverlayText: c.heroOverlayText,
      content: c.content,
      heroImage: null,
      gallery: [],
      ctaText: c.ctaText,
      ctaLink: c.ctaLink,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const deleteCampaign = async (id) => {
    if (!window.confirm("Delete this campaign?")) return;
    await api.delete(`/api/campaigns/${id}`);
    fetchCampaigns();
  };

  /* ================= ACTIVATE ================= */
  const activateCampaign = async (id) => {
    await api.put(`/api/campaigns/${id}/activate`);
    fetchCampaigns();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      subtitle: "",
      heroOverlayText: "",
      content: "",
      heroImage: null,
      gallery: [],
      ctaText: "Donate Waste",
      ctaLink: "#",
    });
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Campaign" : "Create Campaign"}
      </h1>

      {/* FORM */}
      <form onSubmit={submitHandler} className="space-y-4 mb-16">
        <input
          className="w-full border px-4 py-3 rounded"
          placeholder="Campaign title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        {/* <input
          className="w-full border px-4 py-3 rounded"
          placeholder="Subtitle (optional)"
          value={form.subtitle}
          onChange={(e) =>
            setForm({ ...form, subtitle: e.target.value })
          }
        /> */}

        <input
          className="w-full border px-4 py-3 rounded"
          placeholder="Hero overlay text"
          value={form.heroOverlayText}
          onChange={(e) =>
            setForm({ ...form, heroOverlayText: e.target.value })
          }
        />

        {/* HERO IMAGE */}
        <div>
          <label className="font-medium block mb-1">Hero Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, heroImage: e.target.files[0] })
            }
          />
          {editingId && (
            <p className="text-xs text-gray-500">
              Leave empty to keep existing hero image
            </p>
          )}
        </div>

        {/* GALLERY */}
        <div>
          <label className="font-medium block mb-1">
            Beneficiaries Gallery
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              setForm({
                ...form,
                gallery: Array.from(e.target.files),
              })
            }
          />
        </div>

        {/* CONTENT */}
<Editor
  apiKey="mkacsbt39n519iauctg43g63usgk8h8frp6446tgbzrow6a0"
  value={form.content}
  onEditorChange={(content) =>
    setForm({ ...form, content })
  }
  init={{
    height: 500,
    menubar: false,

    plugins: [
      "lists",
      "link",
      "image",
      "table",
      "code",
      "preview",
    ],

    toolbar:
      "undo redo | blocks | fontsize | " +
      "bold italic underline | forecolor backcolor | " +
      "alignleft aligncenter alignright | " +
      "bullist numlist | link image table | code preview",

    fontsize_formats:
      "12px 14px 16px 18px 20px 24px 28px 32px 36px 48px",

    /* ⭐ IMAGE UPLOAD */
    automatic_uploads: true,
    file_picker_types: "image",
    paste_data_images: true,

    images_upload_handler: async (blobInfo) => {
      try {
        const formData = new FormData();

        formData.append(
          "file",
          blobInfo.blob(),
          blobInfo.filename()
        );

        // ⭐ Optional folder separation
        formData.append("folder", "campaigns/editor");

        const res = await api.post(
          "/api/blogs/upload-editor-image", // reuse blog route
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return res.data.location;
      } catch (error) {
        console.error("Editor upload error:", error);
        throw new Error("Image upload failed");
      }
    },
  }}
/>


        {/* CTA */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border px-4 py-3 rounded"
            placeholder="CTA text"
            value={form.ctaText}
            onChange={(e) =>
              setForm({ ...form, ctaText: e.target.value })
            }
          />
          <input
            className="border px-4 py-3 rounded"
            placeholder="CTA link"
            value={form.ctaLink}
            onChange={(e) =>
              setForm({ ...form, ctaLink: e.target.value })
            }
          />
        </div>

        <div className="flex gap-3">
          <button className="bg-[#7BA717] text-white px-6 py-3 rounded">
            {editingId ? "Update Campaign" : "Create Campaign"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border px-6 py-3 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <h2 className="text-xl font-semibold mb-4">
        Existing Campaigns
      </h2>

      <div className="space-y-4">
        {campaigns.map((c) => (
          <div
            key={c._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-sm text-gray-500">
                {c.isActive ? "ACTIVE" : "Inactive"}
              </p>
            </div>

            <div className="flex gap-4">
              {!c.isActive && (
                <button
                  onClick={() => activateCampaign(c._id)}
                  className="text-green-600"
                >
                  Activate
                </button>
              )}
              <button
                onClick={() => editCampaign(c)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCampaign(c._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
