const express = require('express');
const cors = require('cors');
// ... other imports

require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

console.log("🚀 Attempting to start server...");

// This is the function that keeps your terminal window "alive"
app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`🟢 SERVER IS LIVE`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌍 Test Link: http://localhost:${PORT}`);
  console.log(`=================================\n`);
});