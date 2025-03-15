import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Home-Page-Components/Header";
import SearchPage from "./Search";

// Component for a single playlist card
const PlaylistCard = ({ playlist }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors group">
    <div className="aspect-square overflow-hidden">
      <img
        src={playlist.imageUrl}
        alt={playlist.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg">{playlist.title}</h3>
      <p className="text-gray-400 text-sm mt-1">{playlist.description}</p>
    </div>
  </div>
);

// Component for a single release card
const ReleaseCard = ({ release }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors group">
    <div className="aspect-square overflow-hidden">
      <img
        src={release.imageUrl}
        alt={release.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="p-4">
      <h3 className="font-bold text-lg">{release.title}</h3>
      <p className="text-gray-400 text-sm mt-1">{release.artist}</p>
    </div>
  </div>
);

// Component for a genre tile
const GenreTile = ({ genre }) => (
  <div
    className="h-24 rounded-lg flex items-center justify-center font-semibold bg-gradient-to-r from-purple-900 to-indigo-800 hover:from-purple-800 hover:to-indigo-700 hover:scale-105 transition-all cursor-pointer"
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/api/placeholder/300/300')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {genre}
  </div>
);

// Component for the hero section
const HeroSection = ({ searchQuery, setSearchQuery, toggleSearchPage }) => (
  <section className="my-8 rounded-xl overflow-hidden">
    <div
      className="bg-gradient-to-r from-purple-900 to-indigo-900 py-20 px-8 text-center relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(76, 29, 149, 0.7), rgba(30, 27, 75, 0.9)), url('/api/placeholder/1200/500')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
        Your Music, Your Way
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
        Stream millions of songs and podcasts. Discover new artists and create
        the perfect playlist for every moment.
      </p>

      <div
        className="max-w-xl mx-auto flex rounded-full overflow-hidden bg-gray-800"
        onClick={(e) => {
          e.stopPropagation();
          toggleSearchPage();
        }}
      >
        <input
          type="text"
          placeholder="Search for songs, artists, or podcasts..."
          className="flex-1 py-4 px-6 bg-transparent text-white focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="bg-purple-600 px-6 py-4 font-medium hover:bg-purple-700 transition-colors">
          Search
        </button>
      </div>
    </div>
  </section>
);

// Component for featured playlists section
const FeaturedPlaylists = ({ playlists }) => (
  <section className="my-12 relative">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Featured Playlists</h2>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {playlists.map((playlist) => (
        <PlaylistCard key={playlist.id} playlist={playlist} />
      ))}
    </div>

    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl cursor-pointer hover:text-white transition-colors">
      &gt;
    </span>
  </section>
);

// Component for new releases section
const NewReleases = ({ releases }) => (
  <section className="my-12 relative">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">New Releases</h2>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {releases.map((release) => (
        <ReleaseCard key={release.id} release={release} />
      ))}
    </div>

    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-3xl cursor-pointer hover:text-white transition-colors">
      &gt;
    </span>
  </section>
);

// Component for genres section
const GenresSection = ({ genres }) => (
  <section className="my-12">
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Browse Genres</h2>
      <a href="#" className="text-purple-500 hover:text-purple-400 font-medium">
        View All
      </a>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {genres.map((genre, index) => (
        <GenreTile key={index} genre={genre} />
      ))}
    </div>
  </section>
);

// Component for the music player
const MusicPlayer = () => (
  <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4">
    <div className="bg-gray-800 rounded-lg p-4 flex items-center shadow-2xl">
      <div className="w-14 h-14 rounded overflow-hidden mr-4">
        <img
          src="/api/placeholder/100/100"
          alt="Now playing"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 mr-4">
        <h4 className="font-medium text-sm">Midnight Shadows</h4>
        <p className="text-gray-400 text-xs truncate">Luna Ray</p>
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-gray-400 hover:text-white">
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

        <button className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-200">
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

        <button className="text-gray-400 hover:text-white">
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="hidden md:flex items-center flex-1 mx-4">
        <span className="text-xs text-gray-400 min-w-[40px] text-right mr-2">
          1:45
        </span>
        <div className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-purple-500 w-1/3"></div>
        </div>
        <span className="text-xs text-gray-400 min-w-[40px] ml-2">4:30</span>
      </div>

      <div className="hidden md:flex items-center">
        <button className="text-gray-400 hover:text-white mr-2">
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
              d="M15.536 8.464a5 5 0 010 7.072M12 9.64a3 3 0 010 4.72m-3.536-8.727a8 8 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0110 4v16a1 1 0 01-1.707.707L3.586 16H2a1 1 0 01-1-1v-4a1 1 0 011-1h1.586z"
            />
          </svg>
        </button>
        <div className="w-20 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gray-400 w-2/3"></div>
        </div>
      </div>
    </div>
  </div>
);

// Component for the footer
const Footer = () => (
  <footer className="bg-gray-800 mt-20 pt-12 pb-24">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold text-lg mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Jobs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                For the Record
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Communities</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                For Artists
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Developers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Advertising
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Investors
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Useful Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Web Player
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Mobile App
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Connect with us</h4>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>

            <a
              href="#"
              className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400 text-sm">
        <p>© 2025 Harmony Music. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// Mock data initialization
const getMockData = () => {
  // Featured playlists data
  const featuredPlaylists = [
    {
      id: 1,
      title: "Today's Hits",
      description: "The biggest hits right now",
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 2,
      title: "Chill Vibes",
      description: "Relaxing beats for your day",
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 3,
      title: "Workout Mix",
      description: "Energy boosters for your workout",
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 4,
      title: "Indie Discoveries",
      description: "Fresh indie tracks for you",
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 5,
      title: "Classic Rock",
      description: "Timeless rock anthems",
      imageUrl: "/api/placeholder/200/200",
    },
  ];

  // New releases data
  const newReleases = [
    {
      id: 1,
      title: "Midnight Shadows",
      artist: "Luna Ray",
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 2,
      title: "Electric Dreams",
      artist: "Neon Pulse",
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 3,
      title: "Wilderness",
      artist: "The Explorers",
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 4,
      title: "Urban Poetry",
      artist: "Street Verses",
      imageUrl: "/api/placeholder/200/200",
    },
    {
      id: 5,
      title: "Celestial",
      artist: "Astral Echoes",
      imageUrl: "/api/placeholder/200/200",
    },
  ];

  // Genres data
  const genres = [
    "Pop",
    "Rock",
    "Hip Hop",
    "R&B",
    "Jazz",
    "Electronic",
    "Classical",
    "Country",
  ];

  return { featuredPlaylists, newReleases, genres };
};

// Main MusicHomepage component
const MusicHomepage = (params) => {
  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data from location state or params
  const data = location.state?.data || undefined;

  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchPage, setShowSearchPage] = useState(false);
  const [profileData, setProfileData] = useState(() => 
    // data !== undefined ? data.user : params?.user ?? {}
    params.user
  );
  
  // Check if profile data needs to be set from params
  console.log(profileData); 
   
  // Get mock data for display
  const { featuredPlaylists, newReleases, genres } = getMockData();

  // Toggle search page visibility
  const toggleSearchPage = () => {
    setShowSearchPage(!showSearchPage);
  };

  // Close search page and reset query
  const closeSearchPage = () => {
    setShowSearchPage(false);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header Component */}
      <Header profileData={profileData} />

      {/* Search Page Component (conditionally rendered) */}
      {showSearchPage && (
        <SearchPage
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={closeSearchPage}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-24">
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          toggleSearchPage={toggleSearchPage}
        />

        {/* Featured Playlists */}
        <FeaturedPlaylists playlists={featuredPlaylists} />

        {/* New Releases */}
        <NewReleases releases={newReleases} />

        {/* Genres */}
        <GenresSection genres={genres} />
      </main>

      {/* Music Player (fixed at bottom) */}
      <MusicPlayer />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MusicHomepage;
