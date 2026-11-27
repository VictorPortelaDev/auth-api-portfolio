const express = require("express");
const ensureAuthenticated = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/me", ensureAuthenticated, userController.getProfile)

module.exports = router;