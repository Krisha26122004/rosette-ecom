import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  dob: { type: Date, required: false },
  address: { type: String, required: false },
  country: { type: String, required: false },
  city: { type: String, required: false },
  phone: { type: String, required: false },
  gender: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);
export default User;
