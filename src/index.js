const express = require("express");
const app = express();
const port = 3000;
const allRoute = require("./routes/index");

app.use("/api", allRoute);

app.listen(port, () => {
  console.log(`Server is running port ${port}`);
});
