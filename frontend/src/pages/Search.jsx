import React, { useState, useEffect } from "react";
import { fetchSuggetions } from "../services/operations/songsAPI";
import MusicPlayer from "./Music_player";
import myImage from "./coverImage.jpg";

const SearchPage = (params) => {
  const [recentSearches, setRecentSearches] = useState([
    "Luna Ray",
    "Neon Pulse",
    "Classic Rock",
    "Today's Hits",
  ]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [topResults, setTopResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const updatedUsers = topResults.map(song => ({
    ...song,
    coverImageUrl: song.coverImageUrl ?? myImage // Set default if null
  }));
  // Sample categories for search suggestions
  const searchCategories = [
    "Artists", "Songs", "Albums", "Playlists", "Podcasts"
  ];
  
  // Handle search when query changes
  useEffect(() => {
    if (params.searchQuery.trim() === '') {
      setTopResults([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // Fetch suggestions after a short delay
    const timer = setTimeout(async() => {
      try {
        const results = await fetchSuggetions(params.searchQuery);
        console.log(results);
        setTopResults(results?.songs || []);
        const updatedUsers = Array.isArray(results?.songs) ? results.songs.map(song => ({
          ...song,
          coverImageUrl: song.coverImageUrl ?? myImage, // Default cover image
        })) : [];
        console.log(updatedUsers);
        setTopResults(updatedUsers || []);
        // Add to recent searches if it's a new search
        if (params.searchQuery.trim() !== '' && !recentSearches.includes(params.searchQuery)) {
          setRecentSearches(prev => [params.searchQuery, ...prev.slice(0, 3)]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setTopResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [params.searchQuery]);

  // Handle song selection
  const handleSongSelect = (song) => {
    // Format the song data for the MusicPlayer component
    params.setSong({
      title: song.name || song.title,
      artist: song.artist,
      coverImage: song.coverImageUrl || myImage,
      audioSrc: song.cloudinaryUrl || "",
      duration: song.duration || 180 // Default to 3 minutes if duration not available
    });
  };
  
  // Clear a specific recent search
  const removeRecentSearch = (search) => {
    setRecentSearches(recentSearches.filter(item => item !== search));
  };

  // Clear all recent searches
  const clearAllRecentSearches = () => {
    setRecentSearches([]);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 text-white z-50 overflow-y-auto pt-20 transition-opacity duration-300 ease-in-out">
      {/* Search Header */}
      <div className="sticky top-0 bg-gray-900 shadow-lg z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex rounded-full overflow-hidden bg-gray-800 max-w-3xl mx-auto">
            <button
              onClick={params.onClose}
              className="p-4 text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search for songs, artists, or podcasts..."
              className="flex-1 py-4 px-4 bg-transparent text-white focus:outline-none"
              value={params.searchQuery}
              onChange={(e) => params.setSearchQuery(e.target.value)}
              autoFocus
            />
            {params.searchQuery && (
              <button
                onClick={() => params.setSearchQuery("")}
                className="p-4 text-gray-400 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          
          {/* Search filters/categories */}
          <div className="flex items-center justify-center mt-4 space-x-4 overflow-x-auto py-2">
            {searchCategories.map((category, index) => (
              <button
                key={index}
                className="px-4 py-1 rounded-full text-sm bg-gray-800 hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search content */}
      <div className="container mx-auto px-4 py-6">
        {/* Show appropriate content based on search state */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : params.searchQuery.trim() === "" ? (
          // When no search query, show recent searches
          <div>
            {recentSearches.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Recent Searches</h2>
                  <button
                    onClick={clearAllRecentSearches}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Clear All
                  </button>
                </div>
                <ul className="space-y-3">
                  {recentSearches.map((search, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
                    >
                      <button
                        className="flex-1 text-left"
                        onClick={() => params.setSearchQuery(search)}
                      >
                        {search}
                      </button>
                      <button
                        onClick={() => removeRecentSearch(search)}
                        className="text-gray-400 hover:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Trending Searches */}
            <div>
              <h2 className="text-xl font-bold mb-4">Trending Searches</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {["Hip Hop Hits", "Workout Playlists", "Focus Music", "Top Charts", "New Releases", "Chill Vibes", "Party Mix", "90s Nostalgia"].map((trend, index) => (
                  <button
                    key={index}
                    className="bg-gray-800 hover:bg-gray-700 p-4 rounded-lg text-left transition-colors"
                    onClick={() => params.setSearchQuery(trend)}
                  >
                    {trend}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : topResults.length === 0 ? (
          // No results found
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No results found for "{params.searchQuery}"</p>
            <p className="text-gray-500 mt-2">Try searching for something else</p>
          </div>
        ) : (
          // Show search results
          <div>
            <h2 className="text-xl font-bold mb-6">Top Results for "{params.searchQuery}"</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {topResults.slice(0, 4).map((result, index) => (
                <div
                  key={index} 
                  className="flex items-center bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => handleSongSelect(result)}
                >
                  <img
                    src={result.coverImageUrl}
                    alt={result.name || result.title}
                    className="w-12 h-12 rounded object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-medium">{result.name || result.title}</h3>
                    <p className="text-sm text-gray-400">
                      {result.artist ? `${result.type || 'Song'} • ${result.artist}` : (result.type || 'Song')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Songs section */}
            <div className="mb-8">
              <h3 className="text-lg font-bold mb-4">Songs</h3>
              <div className="space-y-2">
                {topResults.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => handleSongSelect(song)}
                  >
                    <img
                      src={song.coverImageUrl || "/api/placeholder/100/100"}
                      alt={song.name || song.title}
                      className="w-12 h-12 rounded object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{song.name || song.title}</h4>
                      <p className="text-sm text-gray-400">{song.artist}</p>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-white p-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSongSelect(song);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Music Player - Only show when a song is selected */}
       <params.MusicPlayer song = {params.song}/>
    </div>
  );
};

export default SearchPage;