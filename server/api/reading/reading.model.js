var mongoose = require('mongoose');

var ReadingSchema = new mongoose.Schema({
  when: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

// Export the Mongoose model
module.exports = mongoose.model('Reading', ReadingSchema);