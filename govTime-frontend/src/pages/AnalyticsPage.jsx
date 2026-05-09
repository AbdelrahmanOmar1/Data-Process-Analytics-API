import { useEffect, useState } from "react";
import axios from "../axiosConfig";
import ChartsPanel from "../components/ChartsPanel";

function AnalyticsPage() {
  const [topSales, setTopSales] = useState([]);
  const [deadStock, setDeadStock] = useState([]);
  const [profitReport, setProfitReport] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [showCharts, setShowCharts] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔍 NEW SEARCH STATE
  const [search, setSearch] = useState("");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const [topRes, deadRes, profitRes] = await Promise.all([
        axios.get("/top-sales"),
        axios.get("/dead-stock"),
        axios.get("/profit-report"),
      ]);

      setTopSales(Array.isArray(topRes.data) ? topRes.data : []);
      setDeadStock(Array.isArray(deadRes.data) ? deadRes.data : []);
      setProfitReport(Array.isArray(profitRes.data) ? profitRes.data : []);
    } catch (err) {
      console.error("Analytics error:", err);
      setTopSales([]);
      setDeadStock([]);
      setProfitReport([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemAnalytics = async (itemCode) => {
    const res = await axios.get(`/item/${itemCode}`);
    setSelectedItem(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // 🔍 FILTER LOGIC
  const filterData = (arr) =>
    arr.filter((item) =>
      item.itemName?.toLowerCase().includes(search.toLowerCase()),
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050B1A] to-[#071A33] text-white p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-wide text-white">
            Analytics Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Sales • Profit • Stock Insights
          </p>
        </div>

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search item..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#0B1F3A] border border-white/10 text-white focus:outline-none focus:border-blue-500 w-full md:w-64"
        />

        <button
          onClick={() => setShowCharts(!showCharts)}
          className={`px-5 py-2 rounded-full font-semibold transition-all shadow-lg ${
            showCharts
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {showCharts ? "Hide Charts" : "Show Charts"}
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-blue-300 animate-pulse">
          Loading analytics...
        </div>
      )}

      {/* GRID */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* TOP SALES */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
            <h2 className="text-blue-300 font-bold mb-4 text-lg">
              🔥 Top Sales
            </h2>

            <div className="space-y-2">
              {filterData(topSales).map((item) => (
                <div
                  key={item.itemCode}
                  onClick={() => fetchItemAnalytics(item.itemCode)}
                  className="flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-500/10"
                >
                  <span className="text-sm text-gray-200">{item.itemName}</span>
                  <span className="text-blue-300 font-semibold">
                    {item.totalSalesValue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* DEAD STOCK */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
            <h2 className="text-red-300 font-bold mb-4 text-lg">
              ☠️ Dead Stock
            </h2>

            <div className="space-y-2">
              {filterData(deadStock).map((item) => (
                <div
                  key={item.itemCode}
                  className="flex justify-between items-center px-3 py-2 rounded-lg bg-red-500/5"
                >
                  <span className="text-gray-200 text-sm">{item.itemName}</span>
                  <span className="text-red-400 text-xs px-2 py-1 rounded-full border border-red-500/30">
                    DEAD
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PROFIT */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl">
            <h2 className="text-green-300 font-bold mb-4 text-lg">
              💰 Profit Report
            </h2>

            <div className="space-y-2">
              {filterData(profitReport).map((item) => (
                <div
                  key={item.itemCode}
                  className="flex justify-between items-center px-3 py-2 rounded-lg hover:bg-green-500/10"
                >
                  <span className="text-gray-200 text-sm">{item.itemName}</span>
                  <span className="text-green-400 font-semibold">
                    {item.profit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHARTS */}
      {showCharts && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-white mb-2">
            📊 Visual Analytics
          </h2>

          <ChartsPanel
            topSales={filterData(topSales)}
            deadStock={filterData(deadStock)}
            profitReport={filterData(profitReport)}
          />
        </div>
      )}

      {/* ITEM DETAIL */}
      {selectedItem && (
        <div className="mt-10 bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <h2 className="text-blue-300 font-bold text-lg mb-4">
            📦 Item Insight
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Item</p>
              <p>{selectedItem.itemName}</p>
            </div>

            <div>
              <p className="text-gray-400">Code</p>
              <p>{selectedItem.itemCode}</p>
            </div>

            <div>
              <p className="text-gray-400">Sales</p>
              <p className="text-blue-300">{selectedItem.totalSalesValue}</p>
            </div>

            <div>
              <p className="text-gray-400">Profit</p>
              <p className="text-green-400">{selectedItem.profit}</p>
            </div>
          </div>

          <div className="mt-4">
            <span
              className={`px-3 py-1 rounded-full text-xs ${
                selectedItem.deadStockFlag
                  ? "bg-red-500/20 text-red-300"
                  : "bg-green-500/20 text-green-300"
              }`}
            >
              {selectedItem.deadStockFlag ? "Dead Stock" : "Active Item"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPage;
