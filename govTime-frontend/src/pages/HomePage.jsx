import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import Upload from "../components/Upload";
import DataTable from "../components/DataTable";

function UploadPage() {
  const [type, setType] = useState("sales");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url = type === "sales" ? "/sales-data" : "/purchases-data";
    const res = await axios.get(url);
    setData(res.data || []);
  };

  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050B1A] to-[#071A33] text-white p-6">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-wide">Data Upload Center</h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage sales and purchases datasets
        </p>
      </div>

      {/* TOGGLE TABS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setType("sales")}
          className={`px-5 py-2 rounded-full font-semibold transition-all ${
            type === "sales"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          📊 Sales Data
        </button>

        <button
          onClick={() => setType("purchases")}
          className={`px-5 py-2 rounded-full font-semibold transition-all ${
            type === "purchases"
              ? "bg-indigo-500 text-white shadow-lg"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          🛒 Purchases Data
        </button>
      </div>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* UPLOAD SECTION */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
            <h2 className="text-blue-300 font-bold mb-4">Upload {type}</h2>

            <Upload type={type} onUploadSuccess={fetchData} />
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
            {/* TABLE HEADER */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-blue-300 font-bold">
                  {type.toUpperCase()} DATA
                </h2>
                <p className="text-gray-400 text-sm">
                  Live dataset from database
                </p>
              </div>

              <span className="text-xs bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
                {data.length} records
              </span>
            </div>

            {/* TABLE */}
            <DataTable data={data} type={type} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
