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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'online', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Default response for other routes (No static file serving in dev)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.status(200).send('Rosette Backend is running locally! ✨ (Vite handles the website at localhost:5173)');
});

// MongoDB + Start Server
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/rosette';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB Atlas', err);
    process.exit(1);
  });

export default app;