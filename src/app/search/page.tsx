"use client";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="min-h-screen bg-zinc-950 text-white pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">
          Search Results for: <span className="text-red-600">&quot;{query}&quot;</span>
        </h1>
        
        {/* Ekhane tomar search results/movies er grid ba list render korbe */}
        <p className="text-zinc-400 text-sm">
          Searching movies matching &quot;{query}&quot;...
        </p>
      </div>
    </div>
  );
}