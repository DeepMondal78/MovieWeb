export interface Movie {
  _id?: string;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  releaseDate: string;
  genres: string[];
  language: 'bengali' | 'hindi' | 'english';
  type: 'movie' | 'series';
  qualities: ('360p' | '720p' | '1080p')[];
  videoUrls: {
    '360p'?: string;
    '720p'?: string;
    '1080p'?: string;
  };
}