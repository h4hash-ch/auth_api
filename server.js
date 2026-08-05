require("dotenv").config();

const authRoutes = require("./authRoutes");
const supabase = require("./supabase");
const express = require("express");
const protectedRoutes = require("./publicprotectedRoutes");

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/", protectedRoutes);

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