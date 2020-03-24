const express = require("express");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const _ = require("lodash");
const fs = require("fs");

const app = express();

const DIR = "./public/images/";

const storageDS = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(DIR)) {
      fs.mkdirSync(DIR, { recursive: true });
      cb(null, DIR);
    } else {
      cb(null, DIR);
    }
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    cb(null, fileName);
  }
});

const upload = multer({
  storage: storageDS,
  // eslint-disable-next-line consistent-return
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/svg+xml"
    ) {
      return cb(null, true);
    }
    cb(null, false);
    return cb(new Error("Only .png, .jpg, .jpeg and .svg format allowed!"));
  }
});

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3001" }));

app.get("/", (req, res) => {
  res.status(200).send("Bonjour");
});

app.post("/upload-files", upload.array("filesInput"), async (req, res) => {
  console.log("files", req.files);
  try {
    console.log("files created");
    return res
      .status(201)
      .json({
        status: true,
        message: "Upload complete",
        data: { message: "Data send back" }
      });
  } catch (err) {
    res.status(500).json({status: false, message: "upload non complete", data: err});
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server's running on port ${PORT}`));
