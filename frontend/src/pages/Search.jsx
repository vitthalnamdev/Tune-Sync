import React, { useState, useEffect } from "react";
import { fetchSuggetions } from "../services/operations/songsAPI";

const SearchPage = (params) => {
  const [recentSearches, setRecentSearches] = useState([
    "Luna Ray",
    "Neon Pulse",
    "Classic Rock",
    "Today's Hits",
  ]);
  
  const [topResults, setTopResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample categories for search suggestions
  const searchCategories = [
    "Artists", "Songs", "Albums", "Playlists", "Podcasts"
  ];
  
  // Mock search results - in a real app, this would come from your API
  // const mockSearchResults = {
  //   artists: [
  //     { id: 1, name: "Luna Ray", imageUrl: "/api/placeholder/100/100", type: "Artist" },
  //     { id: 2, name: "Neon Pulse", imageUrl: "/api/placeholder/100/100", type: "Artist" },
  //   ],
  //   songs: [
  //     { id: 1, title: "Midnight Shadows", artist: "Luna Ray", imageUrl: "/api/placeholder/100/100", type: "Song" },
  //     { id: 2, title: "Electric Dreams", artist: "Neon Pulse", imageUrl: "/api/placeholder/100/100", type: "Song" },
  //   ],
  //   albums: [
  //     { id: 1, title: "Wilderness", artist: "The Explorers", imageUrl: "/api/placeholder/100/100", type: "Album" },
  //     { id: 2, title: "Urban Poetry", artist: "Street Verses", imageUrl: "/api/placeholder/100/100", type: "Album" },
  //   ],
  //   playlists: [
  //     { id: 1, title: "Today's Hits", description: "The biggest hits right now", imageUrl: "/api/placeholder/100/100", type: "Playlist" },
  //     { id: 2, title: "Chill Vibes", description: "Relaxing beats for your day", imageUrl: "/api/placeholder/100/100", type: "Playlist" },
  //   ]
  // };

  // Handle search when query changes
  useEffect(() => {
    if (params.searchQuery.trim() === '') {
      setTopResults([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    const timer = setTimeout(async() => {
      // Flatten and combine results for display
      const results = await fetchSuggetions(params.searchQuery);
      console.log("response",results);
      // const results = [
      //   // ...mockSearchResults.artists.filter(artist => 
      //   //   artist.name.toLowerCase().includes(params.searchQuery.toLowerCase())
      //   // ),
      //   // mockSearchResults.songs.filter(song => 
      //   //   song.title.toLowerCase().includes(params.searchQuery.toLowerCase()) || 
      //   //   song.artist.toLowerCase().includes(params.searchQuery.toLowerCase())
      //   // ),
      //   // ...mockSearchResults.albums.filter(album => 
      //   //   album.title.toLowerCase().includes(params.searchQuery.toLowerCase()) || 
      //   //   album.artist.toLowerCase().includes(params.searchQuery.toLowerCase())
      //   // ),
      //   // ...mockSearchResults.playlists.filter(playlist => 
      //   //   playlist.title.toLowerCase().includes(params.searchQuery.toLowerCase())
      //   // )
      // ];
      
      setTopResults(results.songs);
      setIsLoading(false);
      
      // // Add to recent searches if it's a new search
      // if (params.searchQuery.trim() !== '' && !recentSearches.includes(params.searchQuery)) {
      //   setRecentSearches(prev => [params.searchQuery, ...prev.slice(0, 3)]);
      // }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [params.searchQuery]);

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
                  
                  className="flex items-center bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
                >
                  <div className=" w-[20%] bg-fuchsia-700 rounded-full  mr-4 overflow-hidden"> 
                    <img
                      src={result.coverImageUrl}
                      alt={result.name || result.title}
                      className=""
                    />
                  </div>
                  
                  <div className=" w-[75%]">
                    <h3 className="font-medium">{result.name || result.title}</h3>
                    <p className="text-sm text-gray-400">
                      {result.artist ? `${result.type} • ${result.artist}` : result.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Results by category */}
            {topResults.some(r => r.type === "Artist") && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Artists</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {topResults.filter(r => r.type === "Artist").map((artist, index) => (
                    <div key={index} className="text-center">
                      <div className="aspect-square rounded-full overflow-hidden mb-2 mx-auto max-w-24">
                        <img
                          src={artist.imageUrl}
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-medium truncate">{artist.name}</h4>
                      <p className="text-xs text-gray-400">Artist</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {topResults.some(r => r.type === "Song") && (
              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Songs</h3>
                <div className="space-y-2">
                  {topResults.filter(r => r.type === "Song").map((song, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
                    >
                      <img
                        src={song.imageUrl}
                        alt={song.title}
                        className="w-12 h-12 rounded object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{song.title}</h4>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                      <button className="text-gray-400 hover:text-white p-2">
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
            )}
            
            {/* Similar sections for Albums and Playlists would go here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;