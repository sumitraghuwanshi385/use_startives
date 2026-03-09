import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

/*
  POST /api/upload
  Upload images or documents
*/

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

export default router;