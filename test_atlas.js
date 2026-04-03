import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, './.env') });

const MONGO_URI = process.env.MONGO_URI;

async function check() {
  console.log('Connecting to:', MONGO_URI.split('@')[1]); // Log host without credentials
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected!');
    
    // Check Collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections Found:', collections.map(c => c.name));
    
    // Check Product Count
    const count = await mongoose.connection.db.collection('products').countDocuments();
    console.log('🌸 Product Count in Atlas:', count);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection Failed:', err.message);
    process.exit(1);
  }
}

check();
