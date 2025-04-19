import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  imageUrl: String,
  price: Number,
  location: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export default mongoose.model('Item', ItemSchema);
