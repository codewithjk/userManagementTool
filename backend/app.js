const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

//this line is for access image from server
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
