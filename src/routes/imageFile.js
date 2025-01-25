const express = require("express");
const { userAuth } = require("../middlewares/auth");
const upload = require("../middlewares/multerConfig");

const fileRouter = express.Router();
const fileUpload = upload.single("photo");

fileRouter.post("/upload", userAuth, async (req, res) => {
  try {
    fileUpload(req, res, async (err) => {
      try {
        if (err) {
          throw new Error("Error uploading");
          //return res.status(400).json({ message: "Error Uploading File" });
        }
        const loggedInUser = req.user;
        if (!req.file) {
          res.status(400).json({ error: "No file uploaded!" });
        }
        loggedInUser.photoUrl = `/uploads/${req.file.filename}`;
        await loggedInUser.save();
        res
          .status(200)
          .json({ message: "Photo Uploaded Successfully", loggedInUser });
      } catch (err) {
        return res.status(400).json({ message: "Error Uploading File" });
      }
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err);
  }
});

module.exports = fileRouter;
