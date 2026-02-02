import { useEffect, useState } from "react";
import api from "../utils/axiosConfig";

export default function AdminImpactReports() {
  const [reports, setReports] = useState([]);
  const [year, setYear] = useState("");
  const [pdf, setPdf] = useState(null);
  const [uploading, setUploading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdf) {
      return alert("Please select a PDF file");
    }

    const formData = new FormData();
    formData.append("year", year);
    formData.append("pdf", pdf);

    try {
      setUploading(true);
      await api.post("/api/impact-reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setYear("");
      setPdf(null);
      document.getElementById("pdf-input").value = "";

      loadReports();
      alert("Report uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.response?.data?.message || "Failed to upload report");
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

  // Get the base URL for API calls
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
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            PDF File
            <span className="text-gray-500 text-xs ml-2">
              (Preview will be auto-generated)
            </span>
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
          {uploading ? "Uploading..." : "Upload Report"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.length === 0 ? (
          <p className="md:col-span-3 text-center text-gray-500 py-10">
            No reports found. Add one above!
          </p>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <div className="h-80 relative bg-white flex items-center justify-center p-4">
                <img
                  src={report.coverImage}
                  alt={`Impact Report ${report.year}`}
                  className="max-h-full max-w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML += 
                      '<div class="flex items-center justify-center h-full text-gray-400">Preview not available</div>';
                  }}
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
<a 
                
                  href={report.pdfUrl}
                  download={`Impact-Report-${report.year}.pdf`}
                  className="block w-full text-center bg-green-50 text-green-600 border border-green-200 py-2 rounded hover:bg-green-600 hover:text-white transition"
                >
                  ⬇️ Download PDF
                </a>

                <button
                  onClick={() => handleDelete(report._id)}
                  className="w-full bg-red-50 text-red-600 border border-red-200 py-2 rounded hover:bg-red-600 hover:text-white transition"
                >
                  🗑️ Delete Report
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}