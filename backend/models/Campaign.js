import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
const CampaignSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Campaign = mongoose.model('campaign', CampaignSchema);

export default Campaign;
