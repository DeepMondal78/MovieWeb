import Link from 'next/link';
import { Movie } from '@/lib/types/movie';
import { FiPlay, FiStar } from 'react-icons/fi';

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/watch/${movie._id}`} className="group relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all duration-300 shadow-lg hover:shadow-red-600/20">
      
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-800">
        <img
          src={movie.posterPath}
          alt={movie.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Type Badge (Movie / Series) */}
        <span className="absolute top-3 left-3 bg-red-600/90 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded uppercase tracking-wider">
          {movie.type}
        </span>

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
            <FiPlay size={22} className="ml-1" />
          </div>
        </div>
      </div>

      {/* Details Info */}
      <div className="p-4">
        <h3 className="font-bold text-base text-zinc-100 truncate group-hover:text-red-500 transition-colors">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-2 text-xs text-zinc-400">
          <span>{movie.releaseDate?.substring(0, 4)}</span>
          <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
            Full HD
          </span>
        </div>
      </div>
    </Link>
  );
}