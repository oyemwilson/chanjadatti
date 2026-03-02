import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

export default function AdminImpactReports() {
  const [reports, setReports] = useState([]);
  const [year, setYear] = useState("");
  const [pdf, setPdf] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const loadReports = async () => {
    try {
      const { data } = await api.get("/api/impact-reports");
      setReports(data);
    } catch (err) {
      console.error("Failed to load reports", err);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const resetForm = () => {
    setYear("");
    setPdf(null);
    setEditingId(null);
    document.getElementById("pdf-input").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("editingId at submit:", editingId);

    if (!pdf) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append("year", year);
    formData.append("pdf", pdf); // IMPORTANT: match backend

    try {
      setUploading(true);

      if (editingId) {
        await api.put(`/api/impact-reports/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Report updated successfully!");
      } else {
        await api.post("/api/impact-reports", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Report uploaded successfully!");
      }

      resetForm();
      loadReports();
    } catch (err) {
      console.error("Error:", err);
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this impact report?")) return;

    try {
      await api.delete(`/api/impact-reports/${id}`);
      loadReports();
    } catch (err) {
      alert("Failed to delete report");
    }
  };

  const startEdit = (report) => {
    setYear(report.year);
    setEditingId(report._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getApiBaseUrl = () => {
    return api.defaults.baseURL || "";
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage Impact Reports
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow mb-10"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Year</label>
          <input
            type="text"
            placeholder="2024"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-3 rounded w-full"
            required
            disabled={editingId} // prevent changing year during update
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            PDF File
          </label>
          <input
            id="pdf-input"
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdf(e.target.files[0])}
            className="border p-3 rounded w-full"
            required
          />
          {pdf && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {pdf.name}
            </p>
          )}
        </div>

        <button
          disabled={uploading}
          className="bg-[#8BA63E] text-white py-3 rounded w-full disabled:opacity-60 hover:bg-[#7a9335] transition"
        >
          {uploading
            ? editingId
              ? "Updating..."
              : "Uploading..."
            : editingId
            ? "Update Report"
            : "Upload Report"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <div className="h-80 relative bg-white flex items-center justify-center p-4">
              <img
                src={report.coverImage}
                alt={`Impact Report ${report.year}`}
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-medium">
                {report.year}
              </span>
            </div>

            <div className="p-4 space-y-3">
              <a
                href={`${getApiBaseUrl()}/api/impact-reports/${report._id}/view`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-50 text-blue-600 border border-blue-200 py-2 rounded hover:bg-blue-600 hover:text-white transition"
              >
                📄 View PDF
              </a>

              <button
                onClick={() => startEdit(report)}
                className="w-full bg-yellow-50 text-yellow-700 border border-yellow-200 py-2 rounded hover:bg-yellow-600 hover:text-white transition"
              >
                ✏️ Update PDF
              </button>

              <button
                onClick={() => handleDelete(report._id)}
                className="w-full bg-red-50 text-red-600 border border-red-200 py-2 rounded hover:bg-red-600 hover:text-white transition"
              >
                🗑️ Delete Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}