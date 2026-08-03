'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import { FiPlay, FiCalendar, FiGlobe, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function WatchPage() {
  const params = useParams();
  const id = params?.id;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch('/api/movies/trending')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const foundMovie = data.find((m: any) => m._id === id);
          setMovie(foundMovie || null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-red-500">Movie not found!</h1>
          <Link href="/" className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition">
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  // Jodi TMDB theke shothik trailer key na ashe, tahole movie title diye YouTube search embed link toiri hobe
  const youtubeEmbedUrl = movie.trailerKey && movie.trailerKey !== 'dQw4w9WgXcQ'
    ? `https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1`
    : `https://www.youtube.com/embed?search_query=${encodeURIComponent(movie.title + ' official trailer')}`;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">
      <Navbar />

      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <img
          src={movie.backdropPath || movie.posterPath}
          alt={movie.title}
          className="w-full h-full object-cover filter brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent"></div>
        
        <div className="absolute bottom-8 left-4 md:left-12 max-w-4xl z-10">
          <Link href="/" className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white mb-4 transition">
            <FiArrowLeft /> <span>Back to Browse</span>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
              {movie.type}
            </span>
            <span className="bg-zinc-800/80 backdrop-blur text-zinc-300 text-xs px-2.5 py-1 rounded border border-zinc-700">
              HD Quality
            </span>
          </div>
          <h1 className="text-3xl md:text-6xl font-extrabold mt-3 text-white drop-shadow-lg">
            {movie.title}
          </h1>
          <div className="flex items-center space-x-6 mt-3 text-sm text-zinc-300">
            <span className="flex items-center space-x-1.5"><FiCalendar className="text-red-500" /> <span>{movie.releaseDate}</span></span>
            <span className="flex items-center space-x-1.5"><FiGlobe className="text-red-500" /> <span className="uppercase">{movie.language}</span></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-2xl">
            {!isPlaying ? (
              <>
                <div className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-sm" style={{ backgroundImage: `url(${movie.posterPath})` }}></div>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center p-6">
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                  >
                    <FiPlay size={36} className="ml-1" />
                  </button>
                  <p className="mt-4 font-bold text-xl text-white tracking-wide">Play Official Trailer</p>
                  <p className="text-xs text-zinc-400 mt-1">High Quality Streaming ({selectedQuality})</p>
                </div>
              </>
            ) : (
              <iframe
                src={youtubeEmbedUrl}
                title={movie.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <div className="bg-zinc-900/90 backdrop-blur border border-zinc-800 p-4 rounded-xl flex items-center justify-between shadow-lg">
            <span className="text-sm font-medium text-zinc-400">Streaming Quality:</span>
            <div className="flex space-x-2">
              {['360p', '720p', '1080p'].map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuality(q)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                    selectedQuality === q
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/90 backdrop-blur border border-zinc-800 p-6 rounded-2xl space-y-6 h-fit shadow-xl">
          <div>
            <h3 className="text-xl font-bold border-b border-zinc-800 pb-3 mb-3 text-white">Storyline</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {movie.overview || 'No overview available for this title.'}
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Category:</span>
              <span className="font-semibold capitalize text-zinc-200">{movie.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Language:</span>
              <span className="font-semibold uppercase text-zinc-200">{movie.language}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Server Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
              </span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}