import HomePage from "./pages/HomePage";
import AnalyticsPage from "./pages/AnalyticsPage";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("upload");

  return (
    <div className="min-h-screen bg-[#061427] text-white">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08182f]">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg tracking-wide">Analytics System</h1>
        </div>

        {/* NAV BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => setPage("upload")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              page === "upload"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            📤 Upload
          </button>

          <button
            onClick={() => setPage("analytics")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              page === "analytics"
                ? "bg-indigo-500 text-white shadow-lg"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
          >
            📊 Analytics
          </button>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="p-6">
        {page === "upload" && <HomePage />}
        {page === "analytics" && <AnalyticsPage />}
      </div>
    </div>
  );
}

export default App;
