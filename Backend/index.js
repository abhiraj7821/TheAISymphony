const express = require('express')
const app = express();

// Cors to access post route
const cors = require('cors');

// Middleware
app.use(express.json());
const corsOptions = {
  origin: 'https://abhishekrajput.in/TheAISymphony/', // Your frontend origin
  methods: ['POST', 'OPTIONS'], // Include OPTIONS for preflight
  allowedHeaders: ['Content-Type'],
  credentials: true // If you need cookies/auth
};
app.use(cors(corsOptions));

// Import routes
const aiRoutes = require('./routes/routes.js');
app.use('/api/v1', aiRoutes);


// Connect to the database
const connectDB = require('./config/database');
connectDB();

// Connect to cloudinary
const cloudinary = require('./config/cloudinary');

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the AISymphony API');
});