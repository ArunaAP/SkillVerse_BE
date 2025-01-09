import mongoose from 'mongoose';

const DesignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  brief: { type: mongoose.Schema.Types.ObjectId, ref: 'Brief' }, // Link to the brief
  designer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Correctly reference the User model
  image: { type: String, required: true }, // URL or path to the design file
  likes: { type: Number, default: 0 }, // Number of likes
}, { timestamps: true });

const Design = mongoose.model('Design', DesignSchema);
export default Design;

