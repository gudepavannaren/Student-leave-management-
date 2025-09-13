const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors());


// ---------- Routes ----------
const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const rectorRoutes = require('./routes/rectorRoutes');
const facultyRoutes=require('./routes/facultyRoutes');
// const testRoute = require('./routes/testRoute');
// const pdfRoutes = require('./routes/pdfRoutes');

// ---------- Route Handlers ----------
app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/rector', rectorRoutes);
app.use('/api/faculty', facultyRoutes);


// app.use('/api/pdf', pdfRoutes);
// app.use('/api/test', testRoute);

// ---------- MongoDB Connection ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

  app.get("/",(req,res)=>{
    res.send("welcome to the pavan's Project")
  })