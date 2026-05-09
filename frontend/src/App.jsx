import { useEffect, useState, useMemo } from "react";
import API from "./axiosConfig";

/* ================= MAIN APP ================= */
export default function App() {
  /* FILES */
  const [files, setFiles] = useState({
    sales: null,
    purchase: null,
  });

  /* UI STATES */
  const [ui, setUi] = useState({
    loading: false,
    status: "idle", // idle | uploading | processing | done | error
    uploadProgress: 0,
    processingProgress: 0,
  });

  /* DATA */
  const [data, setData] = useState({
    top: [],
    dead: [],
    profit: [],
  });

  const [jobId, setJobId] = useState(null);
  const [query, setQuery] = useState("");

  /* ================= FETCH ANALYTICS ================= */
  const fetchAnalytics = async () => {
    try {
      const [top, dead, profit] = await Promise.all([
        API.get("/analytics/top-items"),
        API.get("/analytics/deadstock"),
        API.get("/analytics/profit"),
      ]);

      setData({
        top: top.data,
        dead: dead.data,
        profit: profit.data,
      });
    } catch (err) {
      console.error("Analytics error:", err);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  /* ================= POLLING JOB ================= */
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      try {
        const res = await API.get(`/status/${jobId}`);

        setUi((prev) => ({
          ...prev,
          processingProgress: res.data.progress,
          status: res.data.status,
        }));

        if (res.data.status === "done") {
          clearInterval(interval);
          setUi((prev) => ({ ...prev, status: "done" }));
          fetchAnalytics();
        }

        if (res.data.status === "error") {
          clearInterval(interval);
          setUi((prev) => ({ ...prev, status: "error" }));
        }
      } catch (err) {
        console.error(err);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [jobId]);

  /* ================= FILTER ================= */
  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return {
      top: data.top.filter(
        (i) =>
          i.item_code?.includes(q) || i.item_name?.toLowerCase().includes(q),
      ),
      dead: data.dead.filter((i) => i.item_code?.includes(q)),
      profit: data.profit.filter((i) => i.item_code?.includes(q)),
    };
  }, [data, query]);

  /* ================= UPLOAD ================= */
  const upload = async () => {
    if (!files.sales && !files.purchase) {
      alert("Upload at least one file");
      return;
    }

    setUi({
      loading: true,
      status: "uploading",
      uploadProgress: 0,
      processingProgress: 0,
    });

    try {
      const uploadFile = async (file, type) => {
        const form = new FormData();
        form.append("file", file);

        const res = await API.post(`/upload/${type}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (e) => {
            setUi((prev) => ({
              ...prev,
              uploadProgress: Math.round((e.loaded * 100) / e.total),
            }));
          },
        });

        return res.data.jobId;
      };

      let id;

      if (files.sales) {
        id = await uploadFile(files.sales, "sales");
      }

      if (files.purchase) {
        id = await uploadFile(files.purchase, "purchase");
      }

      setJobId(id);

      setUi((prev) => ({
        ...prev,
        status: "processing",
      }));

      setFiles({ sales: null, purchase: null });
    } catch (err) {
      console.error(err);
      setUi((prev) => ({ ...prev, status: "error" }));
    }

    setUi((prev) => ({ ...prev, loading: false }));
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* HEADER */}
      <h1 className="text-4xl font-bold text-orange-500">
        Inventory Analytics System
      </h1>

      <p className="text-gray-400 mb-6">
        Upload • Process • Analyze • Profit Insights
      </p>

      {/* SEARCH */}
      <input
        className="w-full p-3 mb-6 bg-zinc-900 border border-zinc-800 rounded-lg"
        placeholder="Search items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* UPLOAD */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <FileBox
          label="Sales File"
          onChange={(f) => setFiles({ ...files, sales: f })}
        />

        <FileBox
          label="Purchase File"
          onChange={(f) => setFiles({ ...files, purchase: f })}
        />
      </div>

      <button
        onClick={upload}
        className="bg-orange-500 px-6 py-2 rounded-lg font-bold"
      >
        Upload & Process
      </button>

      {/* STATUS */}
      <Status ui={ui} />

      {/* KPI */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <KPI title="Top Items" value={filtered.top.length} />
        <KPI title="Dead Stock" value={filtered.dead.length} />
        <KPI title="Profit Items" value={filtered.profit.length} />
      </div>

      {/* TABLES */}
      <Section title="Top Items">
        <Table data={filtered.top} />
      </Section>

      <Section title="Dead Stock">
        <Table data={filtered.dead} />
      </Section>

      <Section title="Profit">
        <Table data={filtered.profit} />
      </Section>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function FileBox({ label, onChange }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
      <p className="text-orange-400 mb-2">{label}</p>
      <input type="file" onChange={(e) => onChange(e.target.files[0])} />
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl text-orange-500 font-bold">{value}</h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-zinc-900 p-4 rounded-lg mt-6 border border-zinc-800">
      <h2 className="text-orange-400 mb-3 font-semibold">{title}</h2>
      {children}
    </div>
  );
}

function Table({ data }) {
  return (
    <div className="overflow-x-auto text-sm">
      <table className="w-full">
        <tbody>
          {data.map((i, idx) => (
            <tr key={idx} className="border-b border-zinc-800">
              <td className="p-2 text-white">{i.item_code}</td>
              <td className="p-2 text-gray-300">{i.item_name || "-"}</td>
              <td className="p-2 text-orange-400">
                {i.profit || i.sales || i.qty}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Status({ ui }) {
  if (ui.status === "idle") return null;

  return (
    <div className="mt-4 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
      <p className="text-gray-400 mb-1">Status: {ui.status}</p>

      <div className="h-2 bg-zinc-800 rounded">
        <div
          className="h-2 bg-orange-500 transition-all"
          style={{ width: `${ui.uploadProgress}%` }}
        />
      </div>

      <div className="h-2 bg-zinc-800 rounded mt-2">
        <div
          className="h-2 bg-green-500 transition-all"
          style={{ width: `${ui.processingProgress}%` }}
        />
      </div>
    </div>
  );
}
