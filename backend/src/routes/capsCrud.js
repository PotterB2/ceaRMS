const express = require('express');
const router = express.Router();
const connection = require('../database/connection');
const multer = require('multer');
const path = require('path');
const { error } = require('console');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // Get the original file extension
        const ext = path.extname(file.originalname);
        // Generate a unique filename by combining current timestamp and original extension
        const filename = Date.now() + ext;
        // Pass the filename to the callback function
        cb(null, filename);
    }
});

// Initialize multer upload middleware
const upload = multer({ storage: storage });

router.post('/upload', upload.single('Image'), (req, res) => {
    const { Title, Program, Author, Year } = req.body;
    const imagePath = req.file ? req.file.filename : null; // Get only the filename

    // Check if imagePath is not null
    if (!imagePath) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const query = 'INSERT INTO capstone_tbl (Title, Program, Author, PublishedYear, Image) VALUES (?, ?, ?, ?, ?)';
    const values = [Title, Program, Author, Year, imagePath]; // Use only the filename for the image column

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error inserting into database:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json({ message: 'File uploaded and data inserted successfully' });
    });
});

router.get('/projects', (req, res) => {
    const query = 'SELECT * FROM capstone_tbl';

    connection.query(query, (error, results, fields) => {
        if (error) {
            console.error('Error retrieving data from database:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        // Send the retrieved data as a response
        res.status(200).json(results);
    });
});

router.delete('/delete-project', (req, res) => {
    const { Title } = req.body;

    if (!Title) {
        return res.status(400).send({ error: 'Title is required' });
    }

    const query = 'DELETE FROM capstone_tbl WHERE Title = ?';
    const values = [Title];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error(`Error executing the query: ${error}`);
            return res.status(500).send({ message: 'An error occurred while deleting data' });
        }
        if (results.affectedRows === 0) {
            return res.status(400).send({ message: 'Title not found' });
        } else {
            return res.status(200).send({ message: 'Project successfully deleted' });
        }
    });
});


module.exports = router;
