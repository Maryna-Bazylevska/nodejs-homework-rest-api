const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();
const { DB_HOST, PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("DB is working");
    app.listen(PORT);
  })
  .then(() => {
    console.log(`Server is on ${PORT}`);
  })
  .catch((err) => {
    console.log("ERROR", err);
    process.exit(1);
  });
