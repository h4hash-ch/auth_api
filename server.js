const supabase = require("./Supabase");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Server is running"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        console.error("Failed to connect to Supabase:", error.message);
    } else {
        console.log("Connected to Supabase successfully!");
    }
});