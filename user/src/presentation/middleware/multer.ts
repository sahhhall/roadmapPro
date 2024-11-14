// Importing the 'multer' module to handle file uploads
import multer from 'multer';

// Setting up memory storage for multer
// The files will be stored in memory (as a buffer) instead of being saved to the disk
const storage = multer.memoryStorage();

// Exporting a multer instance configured with the memory storage
// This will be used to handle file uploads in routes
export const upload = multer({ storage: storage });
