// Entry point for Vidya Mitra application
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Vidya Mitra Backend Running");
});

module.exports = app;
