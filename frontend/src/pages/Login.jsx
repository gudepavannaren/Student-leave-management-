import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const apiurl = import.meta.env.VITE_API_URL; // Example: http://localhost:5000
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post(`${apiurl}/api/auth/login`, loginData);

      // Save token & user details in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      if (res.data.user.role === "rector") {
        navigate("/rector/dashboard");
      } else if (res.data.user.role === "student") {
        navigate("/student/dashboard");
      } 
      else if (res.data.user.role === "faculty") {
        navigate("/faculty/dashboard");
      } 
      else {
        navigate("/");
      }

      // Reset form
      setLoginData({ email: "", password: "" });
    } catch (error) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="w-full max-w-md p-8 border border-slate-700 rounded-xl bg-slate-800 shadow-2xl shadow-slate-950">
        <h2 className="text-4xl font-extrabold text-center mb-6 text-white tracking-wide">Login</h2>
        <p className="text-center mb-6 text-slate-300">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-teal-400 hover:text-teal-300 hover:underline font-semibold transition-colors duration-200"
          >
            Signup
          </NavLink>
        </p>

        {errorMsg && (
          <div className="text-red-400 text-sm font-medium mb-4 text-center bg-red-900 bg-opacity-30 p-2 rounded-md border border-red-700">
            {errorMsg}
          </div>
        )}

        <form
          className="flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Enter your Email"
            className="p-4 w-full border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-lg"
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            value={loginData.email}
            required
          />
          <input
            type="password"
            placeholder="Enter your Password"
            className="p-4 w-full border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-lg"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            value={loginData.password}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`p-4 rounded-lg font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${
              loading
                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                : "bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-900/50"
            }`}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const apiurl = import.meta.env.VITE_API_URL; // Example: http://localhost:5000
//   const navigate = useNavigate();

//   const [loginData, setLoginData] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     setLoading(true);

//     try {
//       const res = await axios.post(`${apiurl}/api/auth/login`, loginData);

//       // Save token & user details in localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Redirect based on role
//       if (res.data.user.role === "rector") {
//         navigate("/rector/dashboard");
//       } else if (res.data.user.role === "student") {
//         navigate("/student/dashboard");
//       } 
//       else if (res.data.user.role === "faculty") {
//         navigate("/faculty/dashboard");
//       } 
//       else {
//         navigate("/");
//       }

//       // Reset form
//       setLoginData({ email: "", password: "" });
//     } catch (error) {
//       if (error.response?.data?.message) {
//         setErrorMsg(error.response.data.message);
//       } else {
//         setErrorMsg("An unexpected error occurred. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 border border-gray-300 rounded-lg bg-white shadow-md">
//         <h2 className="text-3xl font-semibold text-center mb-4">Login</h2>
//         <p className="text-center mb-4">
//           Don't have an account?{" "}
//           <NavLink
//             to="/register"
//             className="text-blue-500 hover:underline"
//           >
//             Signup
//           </NavLink>
//         </p>

//         {errorMsg && (
//           <div className="text-red-500 text-sm font-medium mb-4 text-center">
//             {errorMsg}
//           </div>
//         )}

//         <form
//           className="flex flex-col gap-4"
//           onSubmit={handleSubmit}
//         >
//           <input
//             type="email"
//             placeholder="Enter your Email"
//             className="p-3 w-full border border-gray-400 rounded-lg"
//             onChange={(e) =>
//               setLoginData({ ...loginData, email: e.target.value })
//             }
//             value={loginData.email}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Enter your Password"
//             className="p-3 w-full border border-gray-400 rounded-lg"
//             onChange={(e) =>
//               setLoginData({ ...loginData, password: e.target.value })
//             }
//             value={loginData.password}
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`p-3 rounded-lg font-medium transition-all ${
//               loading
//                 ? "bg-gray-400 text-white"
//                 : "bg-blue-500 text-white hover:bg-blue-600"
//             }`}
//           >
//             {loading ? "Logging in..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;/