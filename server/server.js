import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import contactRoutes from './routes/contact.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

// In production (Vercel), only use process.env.MONGO_URI
const MONGO_URI = process.env.MONGO_URI;

const app = express();
const PORT = process.env.PORT || 5000;

// Health Check for Vercel troubleshooting
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'online', 
    db_configured: !!process.env.MONGO_URI,
    time: new Date().toISOString()
  });
});

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Static frontend for production
const frontendPath = path.join(__dirname, '../website/dist');
app.use(express.static(frontendPath));

// Catch-all route to serve index.html for SPA (must be last)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  
  // Only serve index.html if it exists (usually in production)
  const indexPath = path.join(frontendPath, 'index.html');
  if (req.accepts('html')) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        res.status(200).send('<h1>Rosette Backend API</h1><p>The backend is running perfectly on port 5000! ✨ Please use <b>localhost:5173</b> to view the website during development.</p>');
      }
    });
  } else {
    next();
  }
});

// Start Server Immediately
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Connect to MongoDB in background
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to Local MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

export default app;