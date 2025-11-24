// RectorDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function RectorDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null); // id being approved/rejected

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLeaves();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/rector/leaves`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });
      console.log("Rector fetched:", res.data);

      // backend returns { leaves: [...] } — normalize safely to an array
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.leaves)
        ? res.data.leaves
        : [];
      setLeaves(data);
    } catch (err) {
      console.error("Failed to fetch rector leaves:", err?.response || err?.message || err);
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  // Approve or reject (calls separate endpoints on backend)
  const updateLeaveStatus = async (leaveId, action) => {
    if (!leaveId) return;
    const isApprove = action === "approve";
    setProcessingId(leaveId);

    try {
      const url = isApprove
        ? `${API_BASE}/api/rector/approve/${leaveId}`
        : `${API_BASE}/api/rector/reject/${leaveId}`;

      // send optional reason only on reject (example)
      const body = isApprove ? {} : { reason: "Rejected by rector" };

      const res = await axios.patch(url, body, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      console.log("Update response:", res.data);

      // Backend returns { message, leave } in our controller; prefer returned leave
      const updatedLeave = res.data?.leave ?? null;
      if (updatedLeave) {
        setLeaves((prev) => prev.map((l) => (l._id === leaveId ? updatedLeave : l)));
      } else {
        // fallback: optimistic local update
        setLeaves((prev) =>
          prev.map((l) =>
            l._id === leaveId ? { ...l, status: isApprove ? "approved" : "rejected" } : l
          )
        );
      }
    } catch (err) {
      console.error("Failed to update leave:", err?.response || err?.message || err);
      // optional: show user feedback here
    } finally {
      setProcessingId(null);
    }
  };

  // small helper for badge classes
  const getStatusBadge = (status) => {
    const s = (status || "pending").toString().toLowerCase();
    switch (s) {
      case "approved":
      case "approvedbyfaculty":
      case "approvedbyrector":
        return "bg-green-600/15 text-green-300";
      case "rejected":
      case "rejectedbyfaculty":
      case "rejectedbyrector":
        return "bg-red-600/15 text-red-300";
      case "pending":
      case "pendingfaculty":
      case "pendingrector":
      default:
        return "bg-yellow-500/10 text-yellow-300";
    }
  };

  const safeDate = (d) => {
    try {
      const date = new Date(d);
      if (isNaN(date.getTime())) return "—";
      return date.toLocaleDateString();
    } catch {
      return "—";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide mb-6">
          Rector — Leave Applications
        </h2>

        <div className="overflow-x-auto bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-slate-950">
          {loading ? (
            <div className="p-16 text-center text-slate-400">Loading applications...</div>
          ) : leaves.length === 0 ? (
            <div className="p-16 text-center text-slate-400">No leave applications found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase">Student</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase">Email</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase">From</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase">To</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase">Reason</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {leaves.map((leave) => {
                  const id = leave._id || leave.id;
                  const status = leave.status || "pending";
                  const isPending =
                    status.toString().toLowerCase().includes("pending") ||
                    status.toString().toLowerCase() === "pending";

                  return (
                    <tr
                      key={id}
                      className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-slate-200">{leave.studentId?.name || leave.studentName || "N/A"}</td>
                      <td className="px-6 py-4 text-slate-300">{leave.studentId?.email || leave.studentEmail || "N/A"}</td>
                      <td className="px-6 py-4 text-slate-300">{safeDate(leave.fromDate || leave.startDate)}</td>
                      <td className="px-6 py-4 text-slate-300">{safeDate(leave.toDate || leave.endDate)}</td>
                      <td className="px-6 py-4 text-slate-300 break-words max-w-xl">{leave.reason || leave.purpose || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(status)}`}>
                          {status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {isPending ? (
                          <div className="flex gap-3 justify-center">
                            <button
                              className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                              onClick={() => updateLeaveStatus(id, "approve")}
                              disabled={processingId === id}
                            >
                              {processingId === id ? "Processing..." : "Approve"}
                            </button>

                            <button
                              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
                              onClick={() => updateLeaveStatus(id, "reject")}
                              disabled={processingId === id}
                            >
                              {processingId === id ? "Processing..." : "Reject"}
                            </button>
                          </div>
                        ) : (
                          <div className="text-slate-400">—</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
