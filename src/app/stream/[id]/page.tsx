"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiGlobe, FiCalendar } from "react-icons/fi";

export default function StreamPage() {
  const params = useParams();
  const id = params?.id;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const categories = [
      "",
      "?category=tollywood",
      "?category=bollywood",
      "?category=hollywood",
      "?category=trending-series",
    ];

    Promise.all(
      categories.map((cat) =>
        fetch(`/api/movies/trending${cat}`)
          .then((res) => res.json())
          .catch(() => []),
      ),
    )
      .then((results) => {
        const allMovies = results.flat().filter(Boolean);
        const uniqueMovies = Array.from(
          new Map(allMovies.map((m: any) => [m._id, m])).values(),
        );
        const foundMovie = uniqueMovies.find((m: any) => m._id === id);
        setMovie(foundMovie || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">Movie not found for streaming!</h1>
        <Link
          href="/"
          className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
      {/* টপ হেডার বার */}
      <header className="w-full bg-zinc-900/80 backdrop-blur border-b border-zinc-800 px-6 py-4 flex items-center justify-between z-20">
        <Link
          href={`/watch/${movie._id}`}
          className="inline-flex items-center space-x-2 text-zinc-300 hover:text-white transition text-sm font-semibold"
        >
          <FiArrowLeft size={18} /> <span>Back to Movie Details</span>
        </Link>
        <h1 className="text-lg font-bold text-white truncate max-w-md hidden sm:block">
          Now Playing: <span className="text-red-500">{movie.title}</span>
        </h1>
        <span className="bg-red-600/20 text-red-500 border border-red-600/30 text-xs font-bold px-3 py-1 rounded uppercase">
          {movie.type} Stream
        </span>
      </header>

      {/* মূল ফুল মুভি ভিডিও প্লেয়ার (Full Screen Iframe) */}
      <div className="flex-1 w-full bg-black relative flex items-center justify-center">
        <iframe
          src={movie.fullMovieUrl || `https://2embed.cc/embed/movie?tmdb=${movie._id}`}
          title={movie.title}
          className="w-full h-[calc(100vh-73px)] border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
}