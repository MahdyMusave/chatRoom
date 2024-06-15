const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
router.use("/api/user", userRouter);
router.use("/api/auth", authRouter);
// router.use("/api/message", messageRouter);

module.exports = router;
