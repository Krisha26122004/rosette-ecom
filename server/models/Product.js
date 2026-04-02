import mongoose from 'mongoose';

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
export default Product;
