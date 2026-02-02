import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import api from "../utils/axiosConfig";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: null,
  });

  /* FETCH BLOGS */
  const fetchBlogs = async () => {
    const { data } = await api.get("/api/blogs");
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* CREATE / UPDATE */
const submitHandler = async (e) => {
  e.preventDefault();

  if (!form.title || !form.excerpt || !form.content) {
    alert("Title, excerpt, and content are required.");
    return;
  }

  if (!editingId && !form.image) {
    alert("Cover image is required for new blogs.");
    return;
  }

  const fd = new FormData();
  fd.append("title", form.title);
  fd.append("excerpt", form.excerpt);
  fd.append("content", form.content);

  if (form.image) {
    fd.append("image", form.image);
  }

  if (editingId) {
    await api.put(`/api/blogs/${editingId}`, fd);
  } else {
    await api.post("/api/blogs", fd);
  }

  resetForm();
  fetchBlogs();
};


  /* LOAD BLOG INTO EDITOR */
  const editBlog = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: null,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* DELETE BLOG */
  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    await api.delete(`/api/blogs/${id}`);
    fetchBlogs();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      excerpt: "",
      content: "",
      image: null,
    });
  };

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Blog" : "Create Blog"}
      </h1>

      {/* BLOG FORM */}
      {/* BLOG FORM */}
<form onSubmit={submitHandler} className="space-y-4 mb-14">

  {/* TITLE */}
  <input
    className="w-full border px-4 py-3 rounded"
    placeholder="Blog title"
    value={form.title}
    onChange={(e) =>
      setForm({ ...form, title: e.target.value })
    }
    required
  />

  {/* EXCERPT */}
  <textarea
    className="w-full border px-4 py-3 rounded"
    placeholder="Short excerpt"
    rows={3}
    value={form.excerpt}
    onChange={(e) =>
      setForm({ ...form, excerpt: e.target.value })
    }
    required
  />

  {/* 📸 COVER IMAGE UPLOAD */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Cover Image
    </label>

    {/* Preview existing image when editing */}
    {editingId && blogs.find(b => b._id === editingId)?.image && (
      <img
        src={blogs.find(b => b._id === editingId).image}
        alt="Cover preview"
        className="h-40 w-full object-cover rounded mb-3"
      />
    )}

    <input
      type="file"
      accept="image/*"
      onChange={(e) =>
        setForm({ ...form, image: e.target.files[0] })
      }
      className="block w-full"
    />

    {editingId && (
      <p className="text-xs text-gray-500 mt-1">
        Leave empty to keep existing cover image
      </p>
    )}
  </div>

  {/* 📝 TINYMCE EDITOR */}
<Editor
  apiKey="mkacsbt39n519iauctg43g63usgk8h8frp6446tgbzrow6a0"
  value={form.content}
  onEditorChange={(content) =>
    setForm({ ...form, content })
  }
  init={{
    height: 450,
    menubar: false,

    plugins: [
      "lists",
      "link",
      "image",
      "code",
      "preview",
      "table",
    ],

    toolbar:
      "undo redo | blocks | fontsize | " +
      "bold italic underline | forecolor backcolor | " +
      "alignleft aligncenter alignright | " +
      "bullist numlist | link image table | code preview",

    fontsize_formats:
      "12px 14px 16px 18px 20px 24px 28px 32px 36px 48px",

    content_style:
      "body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 16px }",

    /* ⭐ IMAGE UPLOAD SETTINGS */
    automatic_uploads: true,
    file_picker_types: "image",

    images_upload_handler: async (blobInfo) => {
      try {
        const formData = new FormData();

        formData.append(
          "file",
          blobInfo.blob(),
          blobInfo.filename()
        );

        const res = await api.post(
          "/api/blogs/upload-editor-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return res.data.location; // Cloudinary URL
      } catch (error) {
        console.error("TinyMCE upload error:", error);
        throw new Error("Image upload failed");
      }
    },
  }}
/>


  {/* ACTION BUTTONS */}
  <div className="flex gap-3">
    <button className="bg-[#7BA717] text-white px-6 py-3 rounded">
      {editingId ? "Update Blog" : "Publish Blog"}
    </button>

    {editingId && (
      <button
        type="button"
        onClick={resetForm}
        className="px-6 py-3 border rounded"
      >
        Cancel
      </button>
    )}
  </div>
</form>


      {/* BLOG LIST */}
      <h2 className="text-xl font-semibold mb-4">Existing Blogs</h2>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div>
              <h3 className="font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toDateString()}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => editBlog(blog)}
                className="text-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBlog(blog._id)}
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
