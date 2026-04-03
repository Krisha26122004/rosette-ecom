import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(`🌸 Fetched ${products.length} products from Database!`);
    res.json(products);
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET single product by ID
router.get('/id/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET products by category
router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;
    let products;
    if (category === 'all') {
      products = await Product.find({});
    } else {
      products = await Product.find({ category });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST Add a review
router.post('/:id/reviews', async (req, res) => {
  const { user, rating, comment } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      const review = { user, rating: Number(rating), comment, date: new Date() };
      product.reviews.push(review);
      // Update overall rating (0 if no reviews)
      if (product.reviews.length > 0) {
        const totalRating = product.reviews.reduce((acc, item) => item.rating + acc, 0);
        product.rating = Math.round((totalRating / product.reviews.length) * 10) / 10;
      } else {
        product.rating = 0;
      }

      await product.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
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
    await Product.insertMany(products);
    res.status(201).json({ message: "Database seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
