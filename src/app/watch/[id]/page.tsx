"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import {
  FiPlay,
  FiCalendar,
  FiGlobe,
  FiArrowLeft,
  FiFilm,
} from "react-icons/fi";
import Link from "next/link";

export default function WatchPage() {
  const params = useParams();
  const id = params?.id;
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  
  // একদম নিচের ফুল মুভি প্লেয়ারের স্টেট (শুরুতে ফালস থাকবে, ক্লিক করলে ট্রু হবে)
  const [isPlayingFullMovie, setIsPlayingFullMovie] = useState(false);

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
      <div className="min-h-screen bg-zinc-950 text-white">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-red-500">Movie not found!</h1>
          <Link
            href="/"
            className="mt-4 inline-block bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  const youtubeEmbedUrl =
    movie.trailerKey && movie.trailerKey !== "ZZ5LpwO-An4"
      ? `https://www.youtube.com/embed/${movie.trailerKey}`
      : `https://www.youtube.com/embed/2QKg5SZ_TSg`;

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">
      <Navbar />

      {/* ব্যানার সেকশন */}
      <div className="relative w-full h-[50vh] md:h-[70vh] mt-20 md:mt-24 overflow-hidden bg-zinc-950 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-40 scale-125"
          style={{
            backgroundImage: `url(${movie.backdropPath || movie.posterPath})`,
          }}
        ></div>
        <img
          src={movie.backdropPath || movie.posterPath}
          alt={movie.title}
          className="relative h-full w-auto max-w-none md:max-w-full object-contain z-0 drop-shadow-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>

        <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 max-w-4xl z-10">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-zinc-400 hover:text-white mb-4 transition font-medium text-sm"
          >
            <FiArrowLeft /> <span>Back to Browse</span>
          </Link>
          <div className="flex items-center space-x-3">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
              {movie.type}
            </span>
            <span className="bg-zinc-800/80 backdrop-blur-md text-zinc-300 text-xs px-2.5 py-1 rounded border border-zinc-700">
              HD Quality
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mt-3 text-white drop-shadow-2xl tracking-tight">
            {movie.title}
          </h1>
          <div className="flex items-center space-x-6 mt-4 text-sm text-zinc-300 font-medium">
            <span className="flex items-center space-x-1.5 bg-zinc-900/60 px-3 py-1 rounded-md border border-zinc-800">
              <FiCalendar className="text-red-500" />
              <span>{movie.releaseDate}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-zinc-900/60 px-3 py-1 rounded-md border border-zinc-800">
              <FiGlobe className="text-red-500" />
              <span className="uppercase">{movie.language}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* বাম দিকের মূল কন্টেন্ট */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* ১. ট্রেইলার সেকশন (এখানে শুধু অফিশিয়াল ট্রেইলার দেখাবে) */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3 flex items-center gap-2">
              <FiFilm className="text-red-500" /> Official Trailer
            </h3>
            <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative shadow-2xl">
              <iframe
                src={youtubeEmbedUrl}
                title={`${movie.title} Trailer`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* কোয়ালিটি সিলেকশন বার */}
          <div className="bg-zinc-900/90 backdrop-blur border border-zinc-800 p-4 rounded-xl flex items-center justify-between shadow-lg">
            <span className="text-sm font-medium text-zinc-400">
              Streaming Quality:
            </span>
            <div className="flex space-x-2">
              {["480p", "720p", "1080p", "4K"].map((q) => (
                <button
                  key={q}
                  onClick={() => setSelectedQuality(q)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${
                    selectedQuality === q
                      ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Cast / Actors Section */}
          {movie.cast && movie.cast.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">
                Top Cast
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {movie.cast.map((actor: any, idx: number) => (
                  <div
                    key={idx}
                    className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-2.5 text-center flex flex-col items-center"
                  >
                    {actor.profilePath ? (
                      <img
                        src={actor.profilePath}
                        alt={actor.name}
                        className="w-16 h-16 rounded-full object-cover mb-2 border border-zinc-700 shadow-md"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 mb-2">
                        No Image
                      </div>
                    )}
                    <h4 className="text-xs font-bold text-zinc-200 truncate w-full">
                      {actor.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 truncate w-full">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Movie Screenshots Section */}
          {movie.images && movie.images.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">
                Movie Scenes & Screenshots
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {movie.images.map((imgUrl: string, idx: number) => (
                  <div
                    key={idx}
                    className="group relative aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl transition-all duration-300 hover:border-red-600/60 hover:shadow-red-600/10 cursor-pointer"
                  >
                    <img
                      src= {imgUrl}
                      alt={`Movie Scene ${idx + 1}`}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-xs font-semibold text-zinc-200 tracking-wide">
                        Scene Clip #{idx + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ২. স্ক্রিনশট ক্লিপগুলোর নিচে ফুল মুভি প্লেয়ার এবং বাটন সেকশন */}
          <div className="space-y-4 pt-6 border-t border-zinc-800">
            <h3 className="text-xl font-bold text-white border-l-4 border-red-600 pl-3">
              Stream Full Movie ({selectedQuality})
            </h3>

            {/* ফুল মুভি প্লে করার বক্স */}
            <div className="aspect-video bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-2xl">
              {!isPlayingFullMovie ? (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-sm"
                    style={{ backgroundImage: `url(${movie.posterPath})` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative z-10 text-center p-6">
                    <button
                      onClick={() => setIsPlayingFullMovie(true)}
                      className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl hover:scale-110 transition-transform cursor-pointer"
                    >
                      <FiPlay size={36} className="ml-1" />
                    </button>
                    <p className="mt-4 font-bold text-xl text-white tracking-wide">
                      Click to Play Full Movie
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
                      High Speed Secure Streaming Server
                    </p>
                  </div>
                </>
              ) : (
                <iframe
                  src={`https://vidlink.pro/movie/${movie._id}`}
                  title={movie.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* নিচে বাটন দুটি */}
            <div className="bg-zinc-900/90 backdrop-blur border border-zinc-800 p-4 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => setIsPlayingFullMovie(true)}
                className="w-full sm:flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-red-600/30 transition text-center cursor-pointer"
              >
                <FiPlay size={16} /> <span>Watch Now (Full Movie)</span>
              </button>
              <a
                href="#download"
                className="w-full sm:flex-1 flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 py-3 rounded-xl text-sm font-bold border border-zinc-700 transition text-center"
              >
                <span>Download Options</span>
              </a>
            </div>
          </div>
        </div>

        {/* ডান দিকের সাইডবার */}
        <div
          id="download"
          className="bg-zinc-900/90 backdrop-blur border border-zinc-800 p-6 rounded-2xl space-y-6 h-fit shadow-xl"
        >
          <div>
            <h3 className="text-xl font-bold border-b border-zinc-800 pb-3 mb-3 text-white">
              Storyline
            </h3>
            <p className="text-zinc-300 text-sm leading-relaxed">
              {movie.overview || "No overview available for this title."}
            </p>
          </div>

          <div className="space-y-3 pt-2 border-t border-zinc-800">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Category:</span>
              <span className="font-semibold capitalize text-zinc-200">
                {movie.type}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Language:</span>
              <span className="font-semibold uppercase text-zinc-200">
                {movie.language}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400">Server Status:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                Online
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              Download Links ({selectedQuality})
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white py-2 rounded-xl text-xs font-semibold transition text-center cursor-pointer">
                Server 1 (Fast)
              </button>
              <button className="bg-zinc-800 hover:bg-red-600 text-zinc-200 hover:text-white py-2 rounded-xl text-xs font-semibold transition text-center cursor-pointer">
                Server 2 (VIP)
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}