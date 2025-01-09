import mongoose from 'mongoose';

const BriefSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

const Brief = mongoose.model('Brief', BriefSchema);
export default Brief;
