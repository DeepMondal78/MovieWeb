const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  posterPath: { type: String, required: true },
  backdropPath: { type: String },
  releaseDate: { type: String },
  genres: [String],
  language: { type: String, enum: ['bengali', 'hindi', 'english'], required: true },
  type: { type: String, enum: ['movie', 'series'], required: true },
  qualities: [{ type: String, enum: ['360p', '720p', '1080p'] }],
  videoUrls: {
    '360p': String,
    '720p': String,
    '1080p': String
  }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);