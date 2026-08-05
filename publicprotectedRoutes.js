const express = require("express");
const supabase = require("./supabase");
const authenticateUser = require("./authMiddleware");

const router = express.Router();

router.get("/public/info", (req, res) => {
    res.status(200).json({
        message: "Welcome stranger! This info is public."
    });
});

router.get(
    "/protected/profile",
    authenticateUser,
    (req, res) => {
        res.status(200).json({
            id: req.user.id,
            email: req.user.email,
            created_at: req.user.created_at
        });
    }
);

router.get(
    "/protected/dashboard",
    authenticateUser,
    (req, res) => {
        res.status(200).json({
            message: `Welcome ${req.user.email}`,
            dashboard: "Protected dashboard"
        });
    }
);

module.exports = router;