const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const dbConnect = require("./config/db");
const indexRouter = require("./router/indexRouter");
const app = express();

dbConnect();
const port = process.env.PORT || 3001;
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", indexRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
