const express = require('express');
const router = express.Router();
const connection = require('../database/connection');

router.post('/register', (req, res) => {
    const { Username, Email, Password } = req.body;

    const query = 'INSERT INTO users_tbl (Username, Email, Password) VALUES (?, ?, ?)';
    const values = [Username, Email, Password];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send({ error: 'An error occurred while creating user.' });
            return;
        }
        console.log('User registered successfully');
        res.status(200).send({ message: 'User registered successfully' });
    });
});

// POST endpoint for user login
router.post('/login', (req, res) => {
    const { Username, Password } = req.body;

    const query = 'SELECT Username, isAdmin FROM users_tbl WHERE Username = ? AND Password = ?';
    const values = [Username, Password];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send({ error: 'An error occurred while logging in.' });
            return;
        }
        if (results.length > 0) {
            console.log('User logged in successfully');
            res.status(200).send({ message: 'User logged in successfully', user: results[0] });
        } else {
            res.status(401).send({ error: 'Credentials not found!' });
        }
    });
});

router.get('/users',(req, res) => {
    const query = 'SELECT * FROM users_tbl';

    connection.query(query,(error, results, fields)=> {
        if (error){
            console.log(`Error Fetching the data from database ${error}`)
            return res.status(500).json(`${error} Internal server error`)
        }
        else{
            res.status(200).json(results);
        }
    })
})

/* USER ROUTES */


router.post('/create', (req, res) => {
    const { Username, Password, isAdmin } = req.body;
    const query = 'INSERT INTO users_tbl (Username, Password, isAdmin) VALUES (?, ?, ?)'; // Using parameterized query
    const values = [Username, Password, isAdmin];

    connection.query(query, values, (error, results, fields) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            return res.status(500).send({ error: 'An error occurred while creating user' });
        }
        console.log('User registered successfully');
        res.status(200).send({ message: 'User registered successfully' });
    });
});


router.delete('/delete', (req, res) => {
    const { Username } = req.body; // Destructure Username from request body

    if (!Username) {
        return res.status(400).send({ error: 'Username is required' });
    }

    const query = 'DELETE FROM users_tbl WHERE Username = ?'; // Use parameterized query
    const values = [Username]; // Array of values for the query

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error(`Error executing the query: ${error}`);
            return res.status(500).send({ error: 'An error occurred while deleting the user' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send({ message: 'User deleted successfully' });
    });
});


router.put('/update', (req, res) => {
    const { Username, Password, isAdmin } = req.body;

    const query = 'UPDATE users_tbl SET Password = ?, isAdmin = ? WHERE Username = ?';
    const values = [Password, isAdmin, Username];

    connection.query(query, values, (error, results) => {
        if (error) {
            console.error(`Error executing the query: ${error}`);
            return res.status(500).send({ error: 'An error occurred while updating the user' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        return res.status(200).send({ message: 'User updated successfully' });
    });
});




module.exports = router;
