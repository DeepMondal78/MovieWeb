'use client';
import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/common/Navbar';
import MovieCard from '@/components/movie/MovieCard';
import { Movie } from '@/lib/types/movie';
import { FiArrowRight } from 'react-icons/fi';
import gsap from 'gsap';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  
  const category = searchParams.get('category');
  const genre = searchParams.get('genre');
  const search = searchParams.get('search');

  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-animate',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.25,
          ease: 'power3.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [category, genre, search]);

  useEffect(() => {
    setLoading(true);
    let url = '/api/movies/trending';
    
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (genre) params.append('genre', genre);
    if (search) params.append('search', search);

    if (params.toString()) {
      url = `/api/movies/trending?${params.toString()}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMovies(data);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setLoading(false);
      });
  }, [category, genre, search]);

  // Format header title nicely
  const getPageTitle = () => {
    if (category) {
      return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    if (genre) {
      return `${genre.charAt(0).toUpperCase() + genre.slice(1)} Movies`;
    }
    if (search) {
      return `Search Results for "${search}"`;
    }
    return 'Top Latest Movies';
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-20">
      <Navbar />
      
      {/* Hero Section (Hidden when filtering or searching) */}
      {!category && !genre && !search && (
        <section ref={heroRef} className="pt-36 md:pt-44 px-6 sm:px-12 lg:px-20 w-full text-center relative overflow-hidden">

          <h1 className="hero-animate text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase font-[Antonio]">
            <span className="text-zinc-200">WELCOME TO</span> <span className="text-red-600 font-[Antonio]">MuvieFlex</span>
          </h1>

          <p className="hero-animate text-zinc-400 max-w-2xl mx-auto font-[Antonio] text-base sm:text-lg leading-relaxed mt-6">
            Discover a world of blockbuster movies, binge-worthy TV shows, and timeless classics—all in one place. MovieFlex delivers a seamless streaming experience with stunning visuals, personalized recommendations, and entertainment that never stops.
          </p>

          <div className="hero-animate mt-10">
            <a 
              href="#movies-section"
              className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-9 py-4 rounded-full text-sm sm:text-base shadow-xl shadow-red-600/30 transition transform hover:scale-105"
            >
              <span>Explore Now</span>
              <FiArrowRight size={20} />
            </a>
          </div>
        </section>
      )}

      {/* Movies / Series Collection Section */}
      <section id="movies-section" className={`${category || genre || search ? 'pt-32' : 'pt-28'} px-6 sm:px-10 lg:px-12 w-full`}>
        <div className="border-b border-zinc-800 pb-4 mb-10 flex items-center justify-between">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white font-sans capitalize">
            {getPageTitle()} <span className="text-red-600 text-lg md:text-2xl font-normal ml-3">({movies.length}+ Items)</span>
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-28">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600 mx-auto"></div>
            <p className="text-zinc-500 mt-4 text-sm tracking-wider">Loading 100+ collection...</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center py-28 text-zinc-500">
            <p className="text-xl">No movies or series found for this selection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}