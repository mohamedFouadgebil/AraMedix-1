const mongoose = require('mongoose');

const absenceSchema = new mongoose.Schema({
  doctorName: String,
  role: String,
  dates: [Date],
  reason: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  notificationMessage: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Absence', absenceSchema);
