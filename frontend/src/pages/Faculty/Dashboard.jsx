import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function FacultyDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/faculty/leaves`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      console.log("Faculty fetched:", res.data);
      const data = res.data.leaves ?? [];
      setLeaves(data);
    } catch (err) {
      console.error("Failed to fetch faculty leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateLeaveStatus = async (leaveId, action) => {
    const isApprove = action === "approve";
    setProcessingId(leaveId);

    try {
      const url = isApprove
        ? `${API_BASE}/api/faculty/approve/${leaveId}`
        : `${API_BASE}/api/faculty/reject/${leaveId}`;

      const body = isApprove ? {} : { reason: "Rejected by faculty" };

      const res = await axios.patch(url, body, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      });

      const updated = res.data?.leave;

      setLeaves((prev) =>
        prev.map((l) => (l._id === leaveId ? updated : l))
      );
    } catch (err) {
      console.error("Failed to update leave:", err);
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const s = (status || "pending").toLowerCase();
    if (s === "approved" || s === "approvedbyfaculty" || s === "approvedbyrector")
      return "bg-green-500/20 text-green-400";
    if (s === "rejected" || s.includes("rejected"))
      return "bg-red-500/20 text-red-400";
    return "bg-yellow-500/20 text-yellow-300";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h2 className="text-3xl mb-6 font-bold">Faculty Dashboard</h2>

      <div className="bg-gray-900 rounded-xl p-4 shadow-xl">
        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-gray-300">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">From</th>
                <th className="py-3 px-4">To</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((leave) => {
                const id = leave._id;
                const status = leave.status;
                const pending =
                  status === "pending" ||
                  status === "approvedByRector" ||
                  status === "pendingFaculty";

                return (
                  <tr key={id} className="border-b border-gray-700">
                    <td className="py-3 px-4">{leave.studentName}</td>
                    <td className="py-3 px-4 text-gray-400">
                      {leave.studentEmail}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(leave.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{leave.reason}</td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${getStatusBadge(
                          leave.status
                        )}`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      {pending ? (
                        <div className="flex gap-3 justify-center">
                          <button
                            className="bg-green-600 px-3 py-1 rounded-lg hover:bg-green-700 disabled:opacity-40"
                            disabled={processingId === id}
                            onClick={() => updateLeaveStatus(id, "approve")}
                          >
                            {processingId === id ? "..." : "Approve"}
                          </button>

                          <button
                            className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 disabled:opacity-40"
                            disabled={processingId === id}
                            onClick={() => updateLeaveStatus(id, "reject")}
                          >
                            {processingId === id ? "..." : "Reject"}
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
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
  );
}

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// // This component is for the Faculty Dashboard, so we'll rename it for clarity.
// const FacultyDashboard = () => {
//   const [leaves, setLeaves] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token = localStorage.getItem("token");
//   // Best practice: Use environment variables for API URLs
//   const apiurl = import.meta.env.VITE_API_URL || "http://localhost:5000";

//   useEffect(() => {
//     fetchLeaves();
//   }, []);

//   const fetchLeaves = async () => {
//     try {
//       const res = await axios.get(`${apiurl}/api/faculty/all`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setLeaves(res.data);
//     } catch (err) {
//       console.error("Failed to fetch leave applications:", err);
//       // It's good practice to handle errors, e.g., show a message to the user.
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateLeaveStatus = async (leaveId, status) => {
//     try {
//       await axios.put(
//         `${apiurl}/api/faculty/status/${leaveId}`,
//         { status },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setLeaves((prev) =>
//         prev.map((l) => (l._id === leaveId ? { ...l, status } : l))
//       );
//     } catch (err) {
//       console.error("Failed to update leave status:", err);
//       // Optionally show an error message to the user.
//     }
//   };

//   // Helper function to get status-specific styling
//   const getStatusBadge = (status) => {
//     switch (status.toLowerCase()) {
//       case "approved":
//         return "bg-green-500/20 text-green-400";
//       case "rejected":
//         return "bg-red-500/20 text-red-400";
//       case "pending":
//       default:
//         return "bg-amber-500/20 text-amber-400";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-6 sm:p-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-white mb-10">
//           Faculty - Leave Applications
//         </h2>

//         <div className="overflow-x-auto bg-slate-800 border border-slate-700 rounded-xl shadow-2xl shadow-slate-950">
//           {loading ? (
//             <p className="text-center text-slate-400 text-lg py-16">
//               Loading applications...
//             </p>
//           ) : (
//             <table className="w-full text-left border-collapse">
//               <thead className="bg-slate-900/50">
//                 <tr>
//                   <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">Student Name</th>
//                   <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">Email</th>
//                   <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">From</th>
//                   <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">To</th>
//                   <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">Reason</th>
//                   <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider">Status</th>
//                   <th className="px-6 py-4 text-sm font-bold text-slate-300 uppercase tracking-wider text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {leaves.length > 0 ? (
//                   leaves.map((leave) => (
//                     <tr
//                       key={leave._id}
//                       className="border-b border-slate-700 last:border-b-0 hover:bg-slate-700/50 transition-colors duration-200"
//                     >
//                       <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-200">{leave.studentId?.name || "N/A"}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-slate-300">{leave.studentId?.email || "N/A"}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-slate-300">{new Date(leave.fromDate).toLocaleDateString()}</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-slate-300">{new Date(leave.toDate).toLocaleDateString()}</td>
//                       <td className="px-6 py-4 max-w-xs truncate text-slate-300" title={leave.reason}>{leave.reason}</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusBadge(leave.status)}`}>
//                           {leave.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         {leave.status === "pending" && (
//                           <div className="flex items-center justify-center gap-3">
//                             <button
//                               className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-transform transform hover:scale-105"
//                               onClick={() => updateLeaveStatus(leave._id, "approved")}
//                             >
//                               Approve
//                             </button>
//                             <button
//                               className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-transform transform hover:scale-105"
//                               onClick={() => updateLeaveStatus(leave._id, "rejected")}
//                             >
//                               Reject
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="text-center py-16 text-slate-400">
//                       No leave applications found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Renaming the export to match the component name
// export default FacultyDashboard;


// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // const RectorDashboard = () => {
// //   const [leaves, setLeaves] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const token = localStorage.getItem("token");
// //   const apiurl = "http://localhost:5000"; // change to your backend URL

// //   useEffect(() => {
// //     fetchLeaves();
// //   }, []);

// //   const fetchLeaves = async () => {
// //     try {
// //       const res = await axios.get(`${apiurl}/api/faculty/all`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setLeaves(res.data);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error(err);
// //       setLoading(false);
// //     }
// //   };

// //   const updateLeaveStatus = async (leaveId, status) => {
// //     try {
// //       await axios.put(
// //         `${apiurl}/api/faculty/status/${leaveId}`,
// //         { status },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       setLeaves((prev) =>
// //         prev.map((l) => (l._id === leaveId ? { ...l, status } : l))
// //       );
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   if (loading) return <p>Loading...</p>;

// //   return (
// //     <div className="p-4">
// //       <h2 className="text-2xl font-bold mb-4">Faculty - Leave Applications</h2>
// //       <table className="min-w-full bg-white border border-gray-200 shadow">
// //         <thead>
// //           <tr className="bg-gray-100">
// //             <th className="p-2 border">Student Name</th>
// //             <th className="p-2 border">Email</th>
// //             <th className="p-2 border">From</th>
// //             <th className="p-2 border">To</th>
// //             <th className="p-2 border">Reason</th>
// //             <th className="p-2 border">Status</th>
// //             <th className="p-2 border">Actions</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {leaves.map((leave) => (
// //             <tr key={leave._id}>
// //               <td className="p-2 border">{leave.studentId?.name}</td>
// //               <td className="p-2 border">{leave.studentId?.email}</td>
// //               <td className="p-2 border">
// //                 {new Date(leave.fromDate).toLocaleDateString()}
// //               </td>
// //               <td className="p-2 border">
// //                 {new Date(leave.toDate).toLocaleDateString()}
// //               </td>
// //               <td className="p-2 border">{leave.reason}</td>
// //               <td className="p-2 border">{leave.status}</td>
// //               <td className="p-2 border">
// //                 {leave.status === "pending" && (
// //                   <>
// //                     <button
// //                       className="bg-green-500 text-white px-2 py-1 rounded mr-2"
// //                       onClick={() => updateLeaveStatus(leave._id, "approved")}
// //                     >
// //                       Approve
// //                     </button>
// //                     <button
// //                       className="bg-red-500 text-white px-2 py-1 rounded"
// //                       onClick={() => updateLeaveStatus(leave._id, "rejected")}
// //                     >
// //                       Reject
// //                     </button>
// //                   </>
// //                 )}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default RectorDashboard;
