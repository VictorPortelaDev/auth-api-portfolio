const express = require("express")
const cors = require("cors")

const app = express();

app.use(cors());
app.use(express.json())

//Rota de Health Check
app.get("/health", (req, res) => {
    return res.status(200).json({
        status: "ok",
        message: "API is running smoothly",
        timestamp: new Date().toISOString()
    });
})

module.exports = app;
