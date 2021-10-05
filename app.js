var express = require("express"),
  multer = require("multer"),
  // Set Storage Engine
  storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, next) {
      next(null, req.body.fname);
    },
  }),
  upload = multer({ storage: storage }).single("data"),
  app = express();

app.use(express.static("."));
const fs = require("fs");
const path = require("path");
const os = require("os");

app.get("/", function (req, res) {
  res.redirect("/videoCapture.html");
});
app.get("/view", function (req, res) {
  res.redirect("/view.html");
});

app.post("/", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(" Deu merda" + err);
    } else {
      console.log(req.file);
      res.send("test");
    }
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
