import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const apiurl = import.meta.env.VITE_API_URL;
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const handleApplyLeaveClick = () => {
    window.location.href = "/student/apply";
  };

  useEffect(() => {
    const fetchLeaves = async () => {
      if (!apiurl) {
        console.error("VITE_API_URL is not defined");
        setError("API base URL not configured");
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiurl}/api/leaves/my-leaves`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // log for debugging
        console.log("[StudentDashboard] fetch", `${apiurl}/api/leaves/my-leaves`, "status:", res.status);

        const data = await res.json().catch(() => null);
        if (res.ok) {
          // backend returns { leaves: [...] } — use defensive access
          setLeaves(Array.isArray(data?.leaves) ? data.leaves : []);
        } else {
          console.error("Failed to fetch leaves", data);
          setLeaves([]);
          setError(data?.message || `Failed to fetch (${res.status})`);
        }
      } catch (err) {
        console.error("An error occurred while fetching leaves:", err);
        setError("Network error");
        setLeaves([]);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchLeaves();
    else setLeaves([]); // no token -> empty
  }, [token, apiurl]);

  const getStatusBadge = (status) => {
    const st = (status || "pending").toString().toLowerCase();
    switch (st) {
      case "approved":
        return "bg-green-500 text-green-900";
      case "rejected":
        return "bg-red-500 text-red-900";
      case "semi-approved":
        return "bg-indigo-500 text-indigo-900";
      case "pending":
      default:
        return "bg-yellow-500 text-yellow-900";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-6 sm:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide">
            My Leave Applications
          </h2>
          <button
            onClick={handleApplyLeaveClick}
            className="px-5 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg shadow-teal-900/50 transform hover:scale-105 hover:bg-teal-700 transition-all duration-300 ease-in-out text-base"
          >
            Apply Leave
          </button>
        </div>

        {/* Status / Error */}
        {loading && <p className="text-center text-slate-400 mb-4">Loading your leaves...</p>}
        {error && <p className="text-center text-red-400 mb-4">{error}</p>}

        {/* Leave Applications List */}
        <div className="space-y-4">
          {leaves.length > 0 ? (
            leaves.map((l) => (
              <div
                key={l._id}
                className="border border-slate-700 p-5 rounded-xl bg-slate-800 shadow-lg flex justify-between items-center transition-transform transform hover:shadow-cyan-900/50"
              >
                <div className="flex-1">
                  <span className="text-slate-400 text-sm">Reason</span>
                  <p className="text-lg font-medium text-slate-100">{l.reason || "—"}</p>
                  <div className="text-sm text-slate-400 mt-2">
                    <span>From: {l.fromDate ? new Date(l.fromDate).toLocaleDateString() : "—"}</span>
                    <span className="mx-3">|</span>
                    <span>To: {l.toDate ? new Date(l.toDate).toLocaleDateString() : "—"}</span>
                  </div>
                </div>
                <div className="ml-6 flex items-center">
                  <span
                    className={`px-3 py-1 text-sm font-bold rounded-full ${getStatusBadge(l.status)}`}
                  >
                    {l.status || "pending"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            !loading && (
              <div className="text-center py-10 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50">
                <p className="text-slate-400 text-lg">You have not applied for any leaves yet.</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;



// import React, { useEffect, useState } from "react";

// const StudentDashboard = () => {
//   const apiurl = import.meta.env.VITE_API_URL;
//   const [leaves, setLeaves] = useState([]);
//   const token = localStorage.getItem("token");

//   const handleApplyLeaveClick = () => {
//     window.location.href = "/student/apply";
//   };

//   useEffect(() => {
//     const fetchLeaves = async () => {
//       try {
//         const res = await fetch(`${apiurl}/api/leaves/my-leaves`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (res.ok) {
//           const data = await res.json();
//           setLeaves(data);
//         } else {
//           console.error("Failed to fetch leaves");
//           setLeaves([]); // Clear leaves on error
//         }
//       } catch (error) {
//         console.error("An error occurred while fetching leaves:", error);
//       }
//     };
//     if (token) fetchLeaves();
//   }, [token, apiurl]);

//   const getStatusBadge = (status) => {
//     switch (status.toLowerCase()) {
//       case "approved":
//         return "bg-green-500 text-green-900";
//       case "rejected":
//         return "bg-red-500 text-red-900";
//       case "pending":
//       default:
//         return "bg-yellow-500 text-yellow-900";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white p-6 sm:p-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header Section */}
//         <div className="flex justify-between items-center mb-10">
//           <h2 className="text-3xl sm:text-4xl font-extrabold tracking-wide">
//             My Leave Applications
//           </h2>
//           <button
//             onClick={handleApplyLeaveClick}
//             className="px-5 py-3 bg-teal-600 text-white font-bold rounded-lg shadow-lg shadow-teal-900/50 transform hover:scale-105 hover:bg-teal-700 transition-all duration-300 ease-in-out text-base"
//           >
//             Apply Leave
//           </button>
//         </div>

//         {/* Leave Applications List */}
//         <div className="space-y-4">
//           {leaves.length > 0 ? (
//             leaves.map((l) => (
//               <div
//                 key={l._id}
//                 className="border border-slate-700 p-5 rounded-xl bg-slate-800 shadow-lg flex justify-between items-center transition-transform transform hover:shadow-cyan-900/50"
//               >
//                 <div className="flex-1">
//                   <span className="text-slate-400 text-sm">Reason</span>
//                   <p className="text-lg font-medium text-slate-100">{l.reason}</p>
//                 </div>
//                 <div className="ml-6 flex items-center">
//                   <span
//                     className={`px-3 py-1 text-sm font-bold rounded-full ${getStatusBadge(
//                       l.status
//                     )}`}
//                   >
//                     {l.status}
//                   </span>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-10 border-2 border-dashed border-slate-700 rounded-xl bg-slate-800/50">
//               <p className="text-slate-400 text-lg">
//                 You have not applied for any leaves yet.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

// // import React, { useEffect, useState } from "react";

// // const StudentDashboard = () => {
// //   const apiurl = import.meta.env.VITE_API_URL;
// //   const [leaves, setLeaves] = useState([]);
// //   const token = localStorage.getItem("token");

// //   const handleApplyLeaveClick = () => {
// //     window.location.href = "/student/apply";
// //   };

// //   useEffect(() => {
// //     const fetchLeaves = async () => {
// //       const res = await fetch(`${apiurl}/api/leaves/my-leaves`, {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       const data = await res.json();
// //       setLeaves(data);
// //     };
// //     if (token) fetchLeaves();
// //   }, [token, apiurl]);

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-xl font-bold">My Leave Applications</h2>
// //       <div className="text-center mb-6">
// //         <button
// //           onClick={handleApplyLeaveClick}
// //           className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg "
// //         >
// //           Apply Leave
// //         </button>
// //       </div>{" "}
// //       <ul className="mt-4">
// //         {leaves.length > 0 ? (
// //           leaves.map((l) => (
// //             <li key={l._id} className="border p-2 my-2">
// //               reason: {l.reason}, Status: {l.status}
// //             </li>
// //           ))
// //         ) : (
// //           <p>No leave applications found.</p>
// //         )}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default StudentDashboard;