const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require("./routes/attendanceRoutes");
const marksRoutes = require("./routes/marksRoutes");
const geminiRoutes = require("./routes/geminiRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/query", queryRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI,)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));