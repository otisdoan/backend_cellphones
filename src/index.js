require("dotenv").config();
require("./configs/database.config");
const express = require("express");
const app = express();
const port = process.env.PORT;
const allRoute = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", allRoute);

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
