import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Assuming run from server/ or with proper env setup

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  category: { type: String, required: true },
  image: { type: String, required: true },
  reviews: [
    {
      user: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
});

const Product = mongoose.model('Product', productSchema);

const products = [
  { name: "Ivory Tulip Bouquet", price: 899, rating: 0.0, category: "bouquets", image: "/images/flower1.jpg" },
  { name: "Little Bird Keychain", price: 149, rating: 0.0, category: "keychains", image: "/images/keychain.2.jpg" },
  { name: "MushRoom Jewels [Jellewey Orgainzer]", price: 399, rating: 0.0, category: "accessories", image: "/images/accesories.jpg" },
  { name: "Home Decor", price: 499, rating: 0.0, category: "accessories", image: "/images/pot.jpg" },
  { name: "Berry Cozy Pods", price: 249, rating: 0.0, category: "accessories", image: "/images/Airpodes.jpg" },
  { name: "Lavender Lace Tote", price: 499, rating: 0.0, category: "accessories", image: "/images/bag.jpg" },
  { name: "The Ivy Wrap", price: 699, rating: 0.0, category: "accessories", image: "/images/cutrain.jpg" },
  { name: "Dream Catcher", price: 349, rating: 0.0, category: "accessories", image: "/images/dreamcatcher.jpg" },
  { name: "Gloss Guard", price: 199, rating: 0.0, category: "accessories", image: "/images/lipgloss.jpg" },
  { name: "Starry Snuggle", price: 549, rating: 0.0, category: "accessories", image: "/images/pillows.jpg" },
  { name: "The Stitch Case", price: 149, rating: 0.0, category: "accessories", image: "/images/phonecase.jpg" },
  { name: "Loom-Top Cover", price: 799, rating: 0.0, category: "accessories", image: "/images/laptopcase.jpg" },
  { name: "Late Lock Mirror", price: 299, rating: 0.0, category: "accessories", image: "/images/mirror.jpg" },
  { name: "Sunny Crochet Bloom", price: 449, rating: 0.0, category: "bouquets", image: "/images/flower2.jpg" },
  { name: "Roses Boquet", price: 1299, rating: 0.0, category: "bouquets", image: "/images/flowerr.jpg" },
  { name: "Blue Lily and white Roses Coquette", price: 599, rating: 0.0, category: "bouquets", image: "/images/flower.jpg" },
  { name: "Rose Ribbon Wrap", price: 499, rating: 0.0, category: "bouquets", image: "/images/flower4.jpg" },
  { name: "Blue Lilys and white Roses", price: 649, rating: 0.0, category: "bouquets", image: "/images/flowwer3.jpg" },
  { name: "Sunflower Brightness", price: 99, rating: 0.0, category: "keychains", image: "/images/keychain.1.jpg" },
  { name: "Cherry Blossom", price: 99, rating: 0.0, category: "keychains", image: "/images/keychain.3.jpg" },
  { name: "Blueberry Peep", price: 129, rating: 0.0, category: "keychains", image: "/images/keychain.4.jpg" },
  { name: "Midnight Bow", price: 149, rating: 0.0, category: "keychains", image: "/images/keychain.5.jpg" },
  { name: "Hair Tiara", price: 199, rating: 0.0, category: "accessories", image: "/images/hair3.jpg" },
  { name: "Combo of Daisy Hair Clip", price: 149, rating: 0.0, category: "accessories", image: "/images/hair2.jpg" },
  { name: "Sun-Kissed Jasmine", price: 129, rating: 0.0, category: "accessories", image: "/images/hair4.jpg" }
];

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
       throw new Error('MONGO_URI not found in env');
    }
    console.log('Connecting to Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');
    
    await Product.deleteMany({});
    console.log('Cleared existing products.');
    
    await Product.insertMany(products);
    console.log('Database seeded successfully! ✨');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
