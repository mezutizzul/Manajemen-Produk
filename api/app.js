const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load .env
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Untuk membaca JSON body

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
