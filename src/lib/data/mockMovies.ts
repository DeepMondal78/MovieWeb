import { Movie } from '../types/movie';

export const mockMovies: Movie[] = [
  {
    _id: '1',
    title: 'Projapoti (Bengali)',
    overview: 'An emotional family drama revolving around a father and son.',
    posterPath: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60',
    backdropPath: '',
    releaseDate: '2022',
    genres: ['Drama', 'Family'],
    language: 'bengali',
    type: 'movie',
    qualities: ['360p', '720p', '1080p'],
    videoUrls: {}
  },
  {
    _id: '2',
    title: 'Pathaan (Hindi)',
    overview: 'An Indian spy on a track of a dangerous threat to his country.',
    posterPath: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60',
    backdropPath: '',
    releaseDate: '2023',
    genres: ['Action', 'Thriller'],
    language: 'hindi',
    type: 'movie',
    qualities: ['360p', '720p', '1080p'],
    videoUrls: {}
  },
  {
    _id: '3',
    title: 'Oppenheimer (English)',
    overview: 'The story of American scientist J. Robert Oppenheimer and the atomic bomb.',
    posterPath: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=500&auto=format&fit=crop&q=60',
    backdropPath: '',
    releaseDate: '2023',
    genres: ['Biography', 'Drama'],
    language: 'english',
    type: 'movie',
    qualities: ['360p', '720p', '1080p'],
    videoUrls: {}
  },
  {
    _id: '4',
    title: 'Farzi (Hindi Web Series)',
    overview: 'A brilliant small-time artist gets sucked into the high-stakes world of counterfeiting.',
    posterPath: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&auto=format&fit=crop&q=60',
    backdropPath: '',
    releaseDate: '2023',
    genres: ['Crime', 'Thriller'],
    language: 'hindi',
    type: 'series',
    qualities: ['360p', '720p', '1080p'],
    videoUrls: {}
  }
];