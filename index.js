const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve the static frontend files
app.use(express.static(path.join(__dirname, 'frontend')));

// Route: /bfhl | Method: POST
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    
    // Replace these with actual user details
    const user_id = "your_name_ddmmyyyy"; 
    const email = "your_email@college.com"; 
    const roll_number = "your_roll_number"; 

    // Filter out numbers and alphabets from the data
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    
    // Find the highest lowercase alphabet
    const highest_lowercase_alphabet = alphabets
        .filter(item => item === item.toLowerCase())
        .sort()
        .slice(-1);

    // Send the response
    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet
    });
});

// Route: /bfhl | Method: GET
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

// Handle all other routes by sending back the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server on a specified or available port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
