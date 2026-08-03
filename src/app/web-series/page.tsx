import Navbar from '@/components/common/Navbar';
import MovieCard from '@/components/movie/MovieCard';
import { mockMovies } from '@/lib/data/mockMovies';

export default function WebSeriesPage() {
  // Filter only web series
  const series = mockMovies.filter((m) => m.type === 'series');

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">
      <Navbar />
      
      <div className="pt-28 px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 border-l-4 border-red-600 pl-3">
          All Web Series
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {series.map((item) => (
            <MovieCard key={item._id} movie={item} />
          ))}
        </div>
      </div>
    </main>
  );
}