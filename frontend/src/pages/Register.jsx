// --- src/pages/Register.jsx ---
import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const apiurl = import.meta.env.VITE_API_URL;


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiurl}/api/auth/register`, formData);
      alert("Registered successfully! Please login now.");
      // Optionally navigate to login page after successful registration
      // navigate("/");
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Registration failed: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occurred during registration. Please try again.");
      }
    }
  };


  

  return (
    <>
     <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
    
    <div className="w-full max-w-md p-8 border border-slate-700 rounded-xl bg-slate-800 shadow-2xl shadow-slate-950 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-center mb-6 text-white tracking-wide">Register</h2>
      <p className="text-center mb-6 text-slate-300">
           Already have an account? Please
          <NavLink
            to="/"
            className="text-teal-400 hover:text-teal-300 hover:underline font-semibold transition-colors duration-200 ml-2"
          >
            Login
          </NavLink>
        </p>
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          className="p-4 w-full border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-lg"
          required
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
          className="p-4 w-full border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-lg"
          required
        />
        <input
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Password"
          className="p-4 w-full border border-slate-600 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-lg"
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="p-4 w-full border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 text-lg appearance-none"
        >
          <option value="student">Student</option>
          <option value="faculty">Faculty</option>
          <option value="rector">Rector</option>
        </select>
        <button
          type="submit"
          className="p-4 rounded-lg font-bold text-lg w-full transition-all duration-300 ease-in-out transform hover:scale-105 bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-900/50"
        >
          Register
        </button>
      </form>
    </div>
    </div>
     </>
  );
};

export default Register;

// // --- src/pages/Register.jsx ---
// import React, { useState } from "react";
// import axios from "axios";
// import { NavLink, useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "student",
//   });
//   const apiurl = import.meta.env.VITE_API_URL;


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post(`${apiurl}/api/auth/register`, formData);
//     alert("Registered successfully! Login now.");
//   };


  

//   return (
//     <>
//      <div className="flex justify-center mt-50">
    
//     <div className="p-6 w-lg flex flex-col items-center">
//       <h2 className="text-2xl font-bold mb-4 ">Register</h2>
//       <h5 className="p-5">
//            have an account? Please
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive ? "text-blue-400" : " link font-medium text-lg ml-2"
//             }
//           >
//             login
//           </NavLink>
//         </h5>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           value={formData.name}
//           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//           placeholder="Name"
//           className="w-full p-2 border rounded bg-blue-500"
//         />
//         <input
//           type="email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           placeholder="Email"
//           className="w-full p-2 border rounded"
//         />
//         <input
//           type="password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//           placeholder="Password"
//           className="w-full p-2 border rounded"
//         />
//         <select
//           value={formData.role}
//           onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//           className="w-full p-2 border rounded"
//         >
//           <option value="student">Student</option>
//           <option value="faculty">Faculty</option>
//           <option value="rector">Rector</option>
//         </select>
//         <button
//           type="submit"
//           className="w-full bg-green-600 text-white py-2 rounded"
//         >
//           Register
//         </button>
//       </form>
//     </div>
//     </div>
//      </>
//   );
// };

// export default Register;
