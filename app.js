var express = require("express"),
  multer = require("multer"),
  // Set Storage Engine
  storage = multer.diskStorage({
    destination: "./public/uploads",
    filename: function (req, file, next) {
      next(null, "candidato-" + Date.now() + req.body.fname);
    },
  }),
  upload = multer({ storage: storage }).single("data"),
  app = express();

app.use(express.static("."));
const fs = require("fs");
const path = require("path");
const os = require("os");
// const multipart = require("connect-multiparty");
// const mid = multipart();

app.get("/", function (req, res) {
  res.redirect("/videoCapture.html");
});
app.get("/view", function (req, res) {
  res.redirect("/view.html");
});

// app.post("/", mid, function (req, res) {
//   console.log("files", req);
// let location = path.join(os.tmpdir(), "upload.webm");
// fs.rename(req.files.data.path, location);
// console.log(`upload successful, file written to ${location}`);
// res.send(`upload successful, file written to ${location}`);
// });

app.post("/", function (req, res, next) {
  console.log("pegando a porra dos dados");
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
