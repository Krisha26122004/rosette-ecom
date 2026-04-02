import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// GET user orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST Create new order
router.post('/', protect, async (req, res) => {
  const { items, totalAmount } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  try {
    const order = await Order.create({
      userId: req.user.id,
      items,
      totalAmount
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
