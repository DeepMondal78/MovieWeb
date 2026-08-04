"use client";
import Link from "next/link";
import { useState } from "react";
import { FiSearch, FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [webSeriesOpen, setWebSeriesOpen] = useState(false);
  const [genresOpen, setGenresOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // 18+ Age Verification Modal State
  const [showAgeModal, setShowAgeModal] = useState(false);

  const webSeriesCategories = [
    { name: "Trending Series", href: "/?category=trending-series" },
    { name: "Action & Thriller", href: "/?category=action-thriller" },
    { name: "Romantic & Drama", href: "/?category=romantic-drama" },
    { name: "Sci-Fi & Fantasy", href: "/?category=scifi-fantasy" },
    { name: "Anime & Animation", href: "/?category=anime" },
  ];

  const genresList = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  // 18+ Click Handler
  const handle18PlusClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const isVerified = localStorage.getItem("age_verified");
    if (isVerified === "true") {
      window.location.href = "/?category=adult";
    } else {
      setShowAgeModal(true);
    }
  };

  const handleAgree = () => {
    localStorage.setItem("age_verified", "true");
    setShowAgeModal(false);
    window.location.href = "/?category=adult";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900">
        <div className="w-full px-3 sm:px-6 lg:px-4 xl:px-8">
          <div className="flex items-center justify-between h-20 gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <span className="text-3xl flex font-[Antonio] text-red-600 tracking-tighter">
                <Image
                  src="/m2.webp"
                  alt="MuviFlex Logo"
                  width={40}
                  height={40}
                  className="mr-0.5"
                />
                <span className="text-white font-[Syne] mr-0.5 lowercase">uvie</span>Flex
              </span>
            </Link>

            {/* Desktop Category Pills Menu (1024px friendly flex) */}
            <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-2 shrink-0">
              {[
                { name: "Tollywood", query: "tollywood" },
                { name: "Bollywood", query: "bollywood" },
                { name: "Hollywood", query: "hollywood" },
                { name: "Hindi Dubbed", query: "hindi-dubbed" },
                { name: "South Hindi", query: "south-hindi" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={`/?category=${cat.query}`}
                  className="px-3 xl:px-4 py-1.5 rounded-full border border-zinc-700/60 text-[11px] xl:text-[13px] font-[Antonio] text-zinc-300 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition whitespace-nowrap"
                >
                  {cat.name}
                </Link>
              ))}

              {/* Web Series Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setWebSeriesOpen(!webSeriesOpen);
                    setGenresOpen(false);
                  }}
                  className="flex items-center space-x-1 px-3 xl:px-4 py-1.5 rounded-full border border-zinc-700/60 text-[11px] xl:text-[13px] font-[Antonio] text-zinc-300 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition cursor-pointer whitespace-nowrap"
                >
                  <span>Web Series</span>
                  <FiChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${webSeriesOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute top-full mt-3 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-2 z-50 transition-all duration-300 transform origin-top ${webSeriesOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                >
                  {webSeriesCategories.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setWebSeriesOpen(false)}
                      className="block px-4 py-2 text-xs text-zinc-300 hover:bg-red-600 hover:text-white transition"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* 18+ Badge Pill */}
              <button
                onClick={handle18PlusClick}
                className="px-2.5 py-1 rounded-full border border-zinc-800 hover:border-red-600 text-[11px] xl:text-[13px] font-[Antonio] text-zinc-400 hover:text-white transition cursor-pointer shrink-0"
              >
                18+
              </button>

              {/* Genres Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setGenresOpen(!genresOpen);
                    setWebSeriesOpen(false);
                  }}
                  className="flex items-center space-x-1 px-2.5 xl:px-3.5 py-1.5 rounded-full border border-zinc-700/60 text-[11px] xl:text-xs font-medium text-zinc-300 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition cursor-pointer whitespace-nowrap"
                >
                  <span>GENREs</span>
                  <FiChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${genresOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`absolute top-full mt-3 w-48 max-h-64 overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl py-2 z-50 transition-all duration-300 transform origin-top ${genresOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
                >
                  {genresList.map((genre) => (
                    <Link
                      key={genre}
                      href={`/?genre=${genre.toLowerCase()}`}
                      onClick={() => setGenresOpen(false)}
                      className="block px-4 py-2 text-xs text-zinc-300 hover:bg-red-600 hover:text-white transition"
                    >
                      {genre}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Search & Sign Up */}
            <div className="flex items-center space-x-2 shrink-0">
              <form
                onSubmit={handleSearch}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="bg-zinc-950 border border-zinc-800 rounded-full pl-3.5 lg:pl-4 pr-11 py-2 text-xs text-zinc-300 placeholder-zinc-400 focus:border-red-600 w-32 focus:outline-none sm:w-44 lg:w-40 xl:w-52 transition"
                />
                <button
                  type="submit"
                  className="absolute right-1 w-7 h-7 bg-red-700 hover:bg-red-800 rounded-full flex items-center justify-center text-white transition shadow-sm cursor-pointer"
                >
                  <FiSearch size={12} />
                </button>
              </form>

              <Link
                href="/signup"
                className="hidden sm:inline-block bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 xl:px-5 py-2 rounded-full transition shadow-lg shadow-red-600/30 whitespace-nowrap"
              >
                Sign Up
              </Link>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-zinc-400 hover:text-white focus:outline-none transition-transform active:scale-90 cursor-pointer"
                >
                  {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Slide-Down Animation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-900 ${isOpen ? "max-h-[90vh] opacity-100 py-6 px-6 shadow-2xl" : "max-h-0 opacity-0 py-0 px-6"}`}
        >
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            {[
              { name: "Tollywood", query: "tollywood" },
              { name: "Bollywood", query: "bollywood" },
              { name: "Hollywood", query: "hollywood" },
              { name: "Hindi Dubbed", query: "hindi-dubbed" },
              { name: "South Hindi", query: "south-hindi" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/?category=${cat.query}`}
                onClick={() => setIsOpen(false)}
                className="text-center px-3 py-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-300 hover:border-red-600 hover:bg-red-600/10 transition"
              >
                {cat.name}
              </Link>
            ))}
            
            <button
              onClick={() => {
                setIsOpen(false);
                const isVerified = localStorage.getItem("age_verified");
                if (isVerified === "true") {
                  window.location.href = "/?category=adult";
                } else {
                  setShowAgeModal(true);
                }
              }}
              className="text-center px-3 py-2.5 rounded-xl border border-zinc-800 text-xs text-zinc-400 hover:border-red-600 hover:bg-red-600/10 transition cursor-pointer"
            >
              18+ Content
            </button>
          </div>

          <div className="border-t border-zinc-800/80 pt-4 mt-4">
            <p className="text-xs font-bold text-red-500 mb-2.5 uppercase tracking-wider">
              Web Series
            </p>
            <div className="grid grid-cols-2 gap-2">
              {webSeriesCategories.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-zinc-400 hover:text-white py-1 transition"
                >
                  • {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="border-t border-zinc-800/80 pt-4 mt-4">
            <p className="text-xs font-bold text-red-500 mb-2.5 uppercase tracking-wider">
              Genres
            </p>
            <div className="grid grid-cols-3 gap-2">
              {genresList.slice(0, 9).map((genre) => (
                <Link
                  key={genre}
                  href={`/?genre=${genre.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-[11px] text-zinc-400 hover:text-white py-1 transition"
                >
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/signup"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-full text-sm font-bold mt-6 shadow-lg shadow-red-600/30 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* 18+ Age Verification Modal */}
      {showAgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl relative">
            <div className="w-12 h-12 bg-red-600/10 border border-red-600/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              18+
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Age Verification Required</h3>
            
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
              This section contains mature content and adult themes intended strictly for audiences aged 18 and above. By clicking &quot;Agree & Enter&quot;, you confirm that you are at least 18 years old and agree to our Terms & Conditions.
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowAgeModal(false)}
                className="flex-1 py-3 rounded-xl border border-zinc-700 text-zinc-300 text-xs sm:text-sm font-semibold hover:bg-zinc-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAgree}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/30 transition cursor-pointer"
              >
                Agree & Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}