// Add these lines right after creating your app
const express = require('express');
const app = express();
const cors = require('cors'); // Make sure to add this

app.use(cors()); // Allow all origins for now
app.use(express.json());

// Rest of your code follows...
