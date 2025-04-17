const mongoose = require('mongoose');

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  meetingTimes: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Club', ClubSchema);
