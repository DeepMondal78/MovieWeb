import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const apiKey = "f0c497d3ce5a490f2ed7ee48b6d71943";
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const genre = searchParams.get("genre");
    const search = searchParams.get("search");

    let baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;

    const genreMap: { [key: string]: number } = {
      action: 28,
      adventure: 12,
      animation: 16,
      comedy: 35,
      crime: 80,
      documentary: 99,
      drama: 18,
      family: 10751,
      fantasy: 14,
      horror: 27,
      mystery: 9648,
      romance: 10749,
      "sci-fi": 878,
      thriller: 53,
      war: 10752,
    };

    if (category === "tollywood") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=bn&region=IN&with_origin_country=IN&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "bollywood") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=hi&region=IN&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "hollywood") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=en&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "hindi-dubbed") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=te|ta|ml&region=IN&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "south-hindi") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_original_language=te|ta|kn|ml&region=IN&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "trending-series") {
      baseUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&first_air_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "action-thriller") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28,53&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "romantic-drama") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749,18&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "scifi-fantasy") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878,14&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "anime") {
      baseUrl = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=16&first_air_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (category === "adult") {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&certification_country=US&certification=R&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    } else if (genre && genreMap[genre]) {
      baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreMap[genre]}&primary_release_date.gte=2025-01-01&sort_by=popularity.desc`;
    }

    if (search) {
      baseUrl = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(search)}`;
    }

    let allResults: any[] = [];
    const totalPagesToFetch = 25;

    for (let page = 1; page <= totalPagesToFetch; page++) {
      const pageUrl = `${baseUrl}&page=${page}`;
      const res = await fetch(pageUrl);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        allResults = [...allResults, ...data.results];
      } else {
        break;
      }

      if (search) break;
    }

    // Remove duplicate movies based on item.id
    const uniqueResults = Array.from(
      new Map(allResults.map((item) => [item.id, item])).values(),
    );

    const formattedMovies = await Promise.all(
      uniqueResults.map(async (item: any) => {
        const mediaType =
          item.media_type || (item.first_air_date ? "tv" : "movie");
        let trailerKey = "ZZ5LpwO-An4";
        let castList = [];
        let imageList = [];

        try {
          const [videoRes, creditsRes, imagesRes] = await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/${mediaType}/${item.id}/videos?api_key=${apiKey}`,
            ),
            fetch(
              `https://api.themoviedb.org/3/${mediaType}/${item.id}/credits?api_key=${apiKey}`,
            ),
            fetch(
              `https://api.themoviedb.org/3/${mediaType}/${item.id}/images?api_key=${apiKey}&include_image_language=en,null`,
            ),
          ]);

          const videoData = await videoRes.json();
          const creditsData = await creditsRes.json();
          const imagesData = await imagesRes.json();

          // ট্রেইলার ফিল্টার
          const officialTrailer = videoData.results?.find(
            (vid: any) => vid.site === "YouTube" && vid.type === "Trailer",
          );
          if (officialTrailer) trailerKey = officialTrailer.key;

          // কাস্ট বা অ্যাক্টর লিস্ট (প্রথম ১০ জন)
          castList =
            creditsData.cast?.slice(0, 10).map((actor: any) => ({
              name: actor.name,
              character: actor.character,
              profilePath: actor.profile_path
                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                : null,
            })) || [];

          // মুভির স্ক্রিনশট বা ব্যাকড্রপ ইমেজ (কমপক্ষে ৫টি নিশ্চিত করার লজিক)
          let rawImages =
            imagesData.backdrops?.map(
              (img: any) => `https://image.tmdb.org/t/p/w780${img.file_path}`
            ) || [];

          if (rawImages.length < 5) {
            const extraImages = [
              item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : null,
              item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : null,
              item.backdrop_path ? `https://image.tmdb.org/t/p/original${item.backdrop_path}` : null,
            ].filter(Boolean);

            rawImages = [...rawImages, ...extraImages];
          }

          while (rawImages.length > 0 && rawImages.length < 5) {
            rawImages.push(rawImages[0]);
          }

          imageList = rawImages.slice(0, 5);
        } catch (err) {
          // ইগ্নোর এরর
        }

        // ফুল মুভি স্ট্রিম করার জন্য ডাইনামিক এমবেড লিংক তৈরি
        const fullMovieEmbedUrl = mediaType === "tv"
          ? `https://vidsrc.xyz/embed/tv?tmdb=${item.id}&season=1&episode=1`
          : `https://vidsrc.xyz/embed/movie?tmdb=${item.id}`;

        return {
          _id: item.id.toString(),
          title:
            item.title ||
            item.name ||
            item.original_title ||
            item.original_name,
          overview: item.overview || "No description available.",
          posterPath: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
          backdropPath: item.backdrop_path
            ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
            : "",
          releaseDate: item.release_date || item.first_air_date || "2025",
          genres: ["Action", "Drama"],
          language: item.original_language || "en",
          type: mediaType,
          qualities: ["360p", "720p", "1080p"],
          trailerKey: trailerKey,
          fullMovieUrl: fullMovieEmbedUrl, // নতুন যুক্ত করা ফুল মুভি লিংক
          cast: castList,
          images: imageList,
        };
      }),
    );

    return NextResponse.json(formattedMovies);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}