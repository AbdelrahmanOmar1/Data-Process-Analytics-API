import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function ChartsPanel({ topSales = [], profitReport = [] }) {
  return (
    <div className="mt-8 space-y-6">
      {/* SECTION TITLE */}
      <div>
        <h2 className="text-xl font-bold text-white">📊 Analytics Overview</h2>
        <p className="text-gray-400 text-sm">
          Visual performance insights from your data
        </p>
      </div>

      {/* ================= TOP SALES ================= */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl">
        <h3 className="text-blue-300 font-semibold mb-4">
          🔥 Top Sales Performance
        </h3>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topSales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />

              <XAxis
                dataKey="itemName"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1F3A",
                  border: "1px solid #1f2a44",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="totalSalesValue"
                fill="#3B82F6"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ================= PROFIT ================= */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl">
        <h3 className="text-green-300 font-semibold mb-4">
          💰 Profit Analysis
        </h3>

        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={profitReport}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />

              <XAxis
                dataKey="itemName"
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0B1F3A",
                  border: "1px solid #1f2a44",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Bar dataKey="profit" fill="#22C55E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ChartsPanel;
