const express = require("express");
const upload = require("../middleware/upload").default;

const router = express.Router(); 

router.post("/", upload.single("file"), (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const fileUrl = req.file.path;

    return res.json({
      success: true,
      fileUrl: fileUrl,
      fileType: req.file.mimetype,
      originalName: req.file.originalname
    });

  } catch (error) {

    console.error("Upload error:", error);

    return res.status(500).json({
      success: false,
      message: "File upload failed"
    });

  }

});

module.exports = router;