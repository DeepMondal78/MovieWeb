'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/common/Navbar';
import MovieCard from '@/components/movie/MovieCard';
import { Movie } from '@/lib/types/movie';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/movies/tmdb/trending')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching TMDB movies:', err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">
      <Navbar />
      
      <section className="pt-28 px-4 max-w-7xl mx-auto">
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Stream Bengali, Hindi & Hollywood Content
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg mb-8">
            Watch your favorite movies and web series from 360p to Full HD quality instantly.
          </p>
        </div>

        {/* Latest Movies Grid Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-600 pl-3">
            Trending Releases (TMDB)
          </h2>
          
          {loading ? (
            <div className="text-center py-20 text-zinc-500">Loading movies from TMDB API...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}