# AutoDrive

AutoDrive is a simple file upload application that integrates with Google Drive. It allows users to upload files, which are then stored on Google Drive. The file details, including the file ID and name, are saved in local storage and displayed in the user interface. Users can also download their files from Google Drive.

## Features

- Upload files to Google Drive.
- Store file IDs and names in local storage.
- Display uploaded files with options to download them.
- Enforce file size limit (less than 10 MB).

## Prerequisites

- Google Drive API credentials (CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN)
- QuickDB package
- Node.js (I used v20.17.0)

## Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/nandhu-44/AutoDrive.git
   cd AutoDrive
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your Google Drive API credentials:

   ```
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   REFRESH_TOKEN=your_refresh_token
   ```

4. **Run the application:**

   ```
   node index.js
   ```

   The server will start, and you can access the application at [`http://localhost:3000`](http://localhost:3000).

## File Structure

- `index.js` - Main server file that initializes the Express app and sets up routes.
- `routes.js` - Defines API routes for uploading, deleting, and sharing files.
- `utils/` - Contains utility functions for Google Drive operations and database interactions.
  - `db.js` - Functions for saving and retrieving file IDs from QuickDB.
  - `gdrive.js` - Functions for interacting with Google Drive (upload, delete, generate shareable links).
- `public/` - Contains static files like HTML, CSS, and JavaScript.
- `.env` - Environment variables for API credentials.
- `package.json` - Lists dependencies and scripts.

## Usage

1. **Upload a file:**

   - Select a file and click the "Upload File" button.
   - The file will be uploaded to Google Drive, and its ID will be saved locally.

2. **View uploaded files:**

   - Uploaded files will be listed with their names and a download button.
   - Click the "Download" button to access the file.

3. **Delete a file:**

   - To delete a file, use the corresponding API route (e.g., `DELETE /delete/:fileId`). The file will be removed from Google Drive and local storage.
