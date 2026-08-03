const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Fetch trending movies from TMDB API
router.get('/tmdb/trending', async (req, res) => {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);
    const data = await response.json();

    // Format TMDB data to match your Movie Schema
    const formattedMovies = data.results.map((item) => ({
      _id: item.id.toString(),
      title: item.title || item.name,
      overview: item.overview,
      posterPath: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1',
      backdropPath: item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : '',
      releaseDate: item.release_date || item.first_air_date || '2023',
      genres: ['Action', 'Drama'],
      language: item.original_language || 'english',
      type: item.media_type === 'tv' ? 'series' : 'movie',
      qualities: ['360p', '720p', '1080p'],
      videoUrls: {}
    }));

    res.json(formattedMovies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;