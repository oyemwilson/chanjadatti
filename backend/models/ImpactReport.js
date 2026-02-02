import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
const ImpactReportSchema = new Schema({
  year: {
    type: Number,
    required: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const ImpactReport = mongoose.model('impactReport', ImpactReportSchema);

export default ImpactReport;
