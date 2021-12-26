const express = require("express");
var cors = require('cors');

const app = express();
app.use(cors());

const mongoose = require("mongoose");
const url = "mongodb://admin:password@localhost:27017/db";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("open", () => {
  console.log("MongoDB: Connected");
});
mongoose.connection.on("error", (err) => {
  console.log("MongoDB: Error", err);
});

const Schema = new mongoose.Schema({
  dateText: { type: String, unique: false, required: true },
  year: { type: Number, unique: false, required: true },
  typeName: { type: String, unique: false, required: true },
  text: { type: String, unique: true, required: true },
});

const history = mongoose.model("history", Schema);

app.get("/year/:year", function (req, res, next) {
  console.log("history.js: get /year/:year");
  history
    .find({ year: req.params.year })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);
