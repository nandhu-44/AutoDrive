const express = require("express");
const multer = require("multer");
const { uploadFile, deleteFile, generatePublicUrl } = require("./utils/gdrive");
const { saveFileRecord, getFileRecords } = require("./utils/db");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Route to upload a file and save the file ID and name
router.post("/upload", upload.single("file"), async (req, res) => {
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const mimeType = req.file.mimetype;  // Get MIME type from multer

    try {
        const fileId = await uploadFile(fileName, filePath, mimeType);

        // Save the file ID and name to the database
        saveFileRecord(fileId, fileName);

        // Respond with the file ID and name
        res.send({ fileId, fileName });
    } catch (error) {
        res.status(500).send("Error uploading the file.");
    }
});

// Route to delete a file by ID
router.delete("/delete/:fileId", async (req, res) => {
    const fileId = req.params.fileId;

    try {
        await deleteFile(fileId);
        res.send("File deleted successfully.");
    } catch (error) {
        res.status(500).send("Error deleting the file.");
    }
});

// Route to generate a public URL for a file by ID
router.get("/share/:fileId", async (req, res) => {
    const fileId = req.params.fileId;

    try {
        const publicUrls = await generatePublicUrl(fileId);
        res.send(publicUrls);
    } catch (error) {
        res.status(500).send("Error generating public URL.");
    }
});

// Route to get all stored file records
router.get("/file-records", (req, res) => {
    const fileRecords = getFileRecords();
    res.send(fileRecords);
});

module.exports = router;
