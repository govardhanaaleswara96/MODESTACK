const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3000;
const modeRouter = require("./routes/mode_routes");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/mode-stack", modeRouter);

mongoose
  // .connect("mongodb://localhost:27017/ModeStack", {
  .connect("mongodb+srv://root:root@cluster0-mum29.mongodb.net/mode-stack", {
    urlencoded: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((result) => {
    console.log("Db Connected");
  })
  .catch((err) => {
    console.log("Db Connection Failed");
  });

app.listen(port, () => {
  console.log(`server running Port ${port}`);
});
