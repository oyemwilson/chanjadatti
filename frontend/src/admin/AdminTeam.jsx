import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

const AdminTeam = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchMembers = async () => {
    const { data } = await api.get("/api/team");
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

const submitHandler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("title", form.title);

  if (form.image instanceof File) {
    formData.append("image", form.image);
  }

  if (editingId) {
    await api.put(`/api/team/${editingId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    await api.post("/api/team", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  fetchMembers();
};


  const editHandler = (member) => {
    setForm(member);
    setEditingId(member._id);
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Delete this member?")) {
      await api.delete(`/api/team/${id}`);
      fetchMembers();
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>

      {/* FORM */}
      <form
        onSubmit={submitHandler}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl mb-10"
      >
        <input
          placeholder="Name"
          className="w-full border px-4 py-3 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Title"
          className="w-full border px-4 py-3 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setForm({ ...form, image: e.target.files[0] })
  }
  required={!editingId}
/>


        <button className="bg-black text-white px-6 py-3 rounded">
          {editingId ? "Update Member" : "Add Member"}
        </button>
      </form>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="flex items-center gap-4 bg-gray-100 p-4 rounded"
          >
            <img
              src={member.image}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-600">{member.title}</p>
            </div>
            <button
              onClick={() => editHandler(member)}
              className="text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(member._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTeam;
