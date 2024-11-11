const express = require("express");
const fs = require("fs");
const upload = require("./rafsan_file/upload");
const cors = require("cors");
const { cd, ls, download } = require("./rafsan_file/tools");
const app = express();
const port = 5000;

process.env.RFS_HOME = process.env.RFS_HOME || process.cwd();
process.chdir(process.env.RFS_HOME);

app.use("/", express.static("app"));
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(
    `Server is running on port ${port}\nServer home: ${process.env.RFS_HOME}`
  );
});

app.get("/api/ls", (_req, res) => {
  res.send(ls());
});

app.post("/api/cd", (req, res) => {
  console.log(req.body);
  res.sendStatus(cd(req.body.dir));
});

function existed(req, res, next) {
  console.log(req.headers);
  // fs.writeFileSync("IO.txt",JSON.stringify(req))
  res.end();
}

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.sendStatus(200);
});

app.get("/api/download", download);
