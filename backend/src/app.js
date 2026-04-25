const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const contactRoutes = require('./routes/contactRoutes');

console.log("🛠️  Initializing Express App...");

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Base Route for testing
app.get('/', (req, res) => {
  res.send('Apurba Portfolio API is Running! 🚀');
});

// Routes
app.use('/api/contact', contactRoutes);

console.log("✅ App logic loaded successfully.");

module.exports = app;