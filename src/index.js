require("dotenv").config();
require("./configs/database.config");
const express = require("express");
const app = express();
const port = process.env.PORT;
const allRoute = require("./routes/index");
const cors = require("cors");

app.use(cors());
app.use(
  cors({
    origin: "https://frontend-cellphones.vercel.app", // đổi thành URL thật FE Vercel của bạn
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", allRoute);

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
