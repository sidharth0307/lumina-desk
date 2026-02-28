import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, index: true },
    category: { type: String, required: true, index: true },
    stockQuantity: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, required: true }
}, { timestamps: true });

// Text index for searching by title
productSchema.index({ title: 'text' });

export default mongoose.model('Product', productSchema);