const { QuickDB } = require('quick.db');
const db = new QuickDB();

// Save the file ID and name to the database
async function saveFileRecord(fileId, fileName) {
    try {
        // Retrieve existing records
        let fileRecords = await db.get('fileRecords') || [];
        fileRecords.push({ fileId, fileName });
        await db.set('fileRecords', fileRecords);
    } catch (error) {
        console.error('Error saving file record:', error);
    }
}

// Get all file records from the database
async function getFileRecords() {
    try {
        return await db.get('fileRecords') || [];
    } catch (error) {
        console.error('Error retrieving file records:', error);
        return [];
    }
}

module.exports = {
    saveFileRecord,
    getFileRecords,
};
