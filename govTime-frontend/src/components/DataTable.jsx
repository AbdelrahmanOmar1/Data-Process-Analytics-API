import { useState } from "react";

function DataTable({ data = [], type }) {
  const [search, setSearch] = useState("");

  // 🔍 filter data
  const filteredData = data.filter((row) =>
    row.itemName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-xl mt-6">
      {/* HEADER */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-blue-300 tracking-wide">
            {type.toUpperCase()} DATA
          </h2>
          <p className="text-gray-400 text-sm">
            Detailed transactional breakdown
          </p>
        </div>

        {/* 🔍 SEARCH INPUT */}
        <input
          type="text"
          placeholder="Search by item name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 rounded-lg bg-[#0B1F3A] text-white border border-white/10 focus:outline-none focus:border-blue-500 w-full md:w-64"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          {/* HEAD */}
          <thead>
            <tr className="text-gray-300 border-b border-white/10">
              <th className="py-3 px-3 font-semibold">Item</th>
              <th className="py-3 px-3 font-semibold">Code</th>
              <th className="py-3 px-3 font-semibold">Quantity</th>
              <th className="py-3 px-3 font-semibold">Value</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No matching data
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-blue-500/5 transition"
                >
                  <td className="py-3 px-3 text-gray-200 font-medium">
                    {row.itemName}
                  </td>

                  <td className="py-3 px-3 text-gray-400">{row.itemCode}</td>

                  <td className="py-3 px-3">
                    <span className="px-2 py-1 rounded-md bg-blue-500/10 text-blue-300">
                      {row.netSalesQuantity ?? row.netPurchaseQuantity}
                    </span>
                  </td>

                  <td className="py-3 px-3 font-semibold text-white">
                    {row.netSalesValue ?? row.purchaseValue}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
