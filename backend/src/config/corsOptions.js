const corsOptions = {
  origin: (origin, callback) => {
    // Allows requests from your .env FRONTEND_URL or local ports
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://localhost:5174'
    ];
    
    // Check if the origin is allowed or if it's a local request (no origin)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;