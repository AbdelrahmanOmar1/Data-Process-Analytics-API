import { useState } from "react";
import axios from "../axiosConfig";

function Upload({ type, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setMessage(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`/${type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });

      setMessage("Upload completed successfully 🚀");
      setFile(null);

      onUploadSuccess?.();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-blue-300">Upload {type} Data</h2>
        <p className="text-gray-400 text-sm">
          Import CSV file to analyze analytics
        </p>
      </div>

      {/* FILE INPUT */}
      <label className="block mb-3">
        <div className="border border-dashed border-blue-400/40 rounded-xl p-4 cursor-pointer hover:bg-blue-500/10 transition">
          <input
            type="file"
            accept=".csv"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />

          <p className="text-sm text-gray-300">
            {file ? file.name : "Click to select CSV file"}
          </p>
        </div>
      </label>

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`w-full py-2 rounded-xl font-semibold transition shadow-md ${
          !file || loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? `Uploading... ${progress}%` : `Upload ${type}`}
      </button>

      {/* PROGRESS */}
      {loading && (
        <div className="mt-4 w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* SUCCESS */}
      {message && <p className="mt-3 text-green-400 text-sm">{message}</p>}

      {/* ERROR */}
      {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
    </div>
  );
}

export default Upload;
