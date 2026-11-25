const express = require("express")
const cors = require("cors")
const pool = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json())

//Rota de Health Check
app.get("/health",async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        return res.status(200).json({
        status: "ok",
        message: "API and Database are running smoothly",
        dbTime: result.rows[0].now,
    });
    } catch (error) {
        console.error("Database connection error: ", error);
        return res.status(500).json({
            status: "error",
            message: "Failed to connect to the database",
        });
    }
});

module.exports = app;
