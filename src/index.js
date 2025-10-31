require("dotenv").config();
require("./configs/database.config");
const { defineAssociations } = require("./models/associations");
const express = require("express");
const app = express();
const port = process.env.PORT;
const allRoute = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Define model associations
defineAssociations();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://frontend-cellphones-i6hv.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Set-Cookie"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set("trust proxy", 1);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", allRoute);

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
