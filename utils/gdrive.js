require("dotenv").config();
const { google } = require("googleapis");
const fs = require("fs");
const mime = require("mime-types");

// Google Drive API setup
const clientID = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = "https://developers.google.com/oauthplayground";
const refreshToken = process.env.REFRESH_TOKEN;

// OAuth2 client configuration
const oauth2Client = new google.auth.OAuth2(clientID, clientSecret, redirectURI);
oauth2Client.setCredentials({ refresh_token: refreshToken });

const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

// Upload a file to Google Drive
async function uploadFile(filenameToUpload, filePath, mimeType) {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: filenameToUpload,
                mimeType: mimeType,
            },
            media: {
                mimeType: mimeType,
                body: fs.createReadStream(filePath),
            },
        });

        return response.data.id; // Return the file ID
    } catch (error) {
        console.error("Error uploading file:", error.message);
    }
}

// Function to delete a file from Google Drive
async function deleteFile(fileId) {
    try {
        const response = await drive.files.delete({
            fileId: fileId,
        });

        console.log(response.data, response.status, "File deleted successfully");
    } catch (error) {
        console.error("Error deleting file:", error.message);
    }
}

// Function to generate a public URL for a file
async function generatePublicUrl(fileId) {
    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });

        const result = await drive.files.get({
            fileId: fileId,
            fields: "webViewLink, webContentLink",
        });

        console.log(result.data);
        return result.data; // Return the public URLs
    } catch (error) {
        console.error("Error generating public URL:", error.message);
    }
}

module.exports = {
    uploadFile,
    deleteFile,
    generatePublicUrl,
};
