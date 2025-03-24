import React, { useState } from "react";
import { Play, Clock, Heart, MoreHorizontal, ChevronLeft } from "lucide-react";
import { useLocation } from "react-router-dom";
import MusicPlayer from "./Music_player";
import myImage from "./coverImage.jpg";
import { useQueue } from "./contexts/queueContext";
import { useAudio } from "./contexts/AudioProvider";

const totaltime = (songs) => {
  let time = 0;

  songs.forEach((element) => {
    time += element.duration;
  });
  time = Math.floor(time / 60);
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  if (hours === 0) {
    return `${minutes} min`;
  } else if (hours === 1) {
    return `${hours} hour ${minutes} min`;
  }
  return `${hours} hours ${minutes} min`;
};

const getArtists = (artists) => {
  let updatedArtists = "";
  let flag = 0;
  let count = 0;
  artists.forEach((artist) => {
    if (count >= 2) {
      flag = 1;
      return;
    }
    if (updatedArtists) updatedArtists += ", ";
    updatedArtists += artist.name;
    count++;
  });
  if (flag) {
    updatedArtists += "...";
  }
  return updatedArtists;
};

const getTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds}`;
};

const Playlist = ({ playlistData, similarPlaylists, song, setSong }) => {
  const [hoveredTrack, setHoveredTrack] = useState(null);
  const {
    next,
    prev,
    enqueuenext,
    dequeuenext,
    clearnext,
    peeknext,
    sizenext,
    enqueueprev,
    dequeueprev,
    clearprev,
    peekprev,
    sizeprev,
  } = useQueue();
  const {loadSong}  = useAudio();
  const handleSongClick = (track, index) => {
    // Clear queue before adding new songs
    clearprev();

    // console.log("before update" , song);
    // Set current song
    loadSong({
      title: track.name, // Fixed: was track.naame
      artists: getArtists(track.artists.primary),
      coverImage:
        track.image[Object.keys(track.image).length - 1].url ||
        "https://via.placeholder.com/50",
      audioSrc:
        track.downloadUrl[Object.keys(track.downloadUrl).length - 1].url || "",
      duration: track.duration,
      currentTime: 0,
      isPlaying: true,
    });
    
    // Add remaining songs to queue one by one

    for (let i = index + 1; i < Object.keys(playlistData.songs).length; i++) {
       enqueuenext(playlistData.songs[i]);
    }
    
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen w-screen text-white font-sans">
      {/* Header with back button */}
      <header className="p-6 flex items-center">
        <button className="p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <h2 className="ml-4 text-xl font-medium">Playlist</h2>
      </header>

      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Side - Playlist Info */}
        <div className="w-full lg:w-2/5 flex flex-col p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          {/* Playlist Cover and Info */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative group w-64 h-64 mb-8 shadow-2xl">
              <img
                src={
                  playlistData?.imageUrl || "https://via.placeholder.com/150"
                }
                alt="Playlist Cover"
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button className="bg-green-500 p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Play size={24} fill="white" />
                </button>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-2 text-center lg:text-left">
              {playlistData?.title || "Unknown Title"}
            </h1>
            <p className="text-gray-300 text-lg mb-6 max-w-lg text-center lg:text-left">
              {playlistData?.description || "No Description"}
            </p>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-gray-400 text-sm">
                {playlistData?.songsCount || 0} songs • Approximately{" "}
                {totaltime(playlistData.songs)}
              </span>
            </div>

            <div className="flex gap-4 mb-8">
              <button className="bg-green-500 hover:bg-green-600 transition-colors py-3 px-8 rounded-full font-medium flex items-center gap-2">
                <Play size={18} fill="white" /> Play
              </button>
              <button className="bg-transparent border border-gray-600 hover:border-white transition-colors py-3 px-6 rounded-full">
                <Heart size={18} />
              </button>
            </div>
          </div>

          {/* Similar Playlists */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">More like this</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {similarPlaylists?.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group flex items-center p-3 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer"
                >
                  <img
                    src={playlist.image || "https://via.placeholder.com/150"}
                    alt={playlist.playlist_name}
                    className="w-16 h-16 rounded-md shadow-md mr-3"
                  />
                  <span className="text-gray-300 group-hover:text-white transition-colors text-sm font-medium">
                    {playlist.playlist_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Track List */}
        <div className="w-full lg:w-3/5 flex flex-col h-full overflow-y-auto p-6 lg:border-l border-gray-800 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <div className="p-4 bg-gray-800/40 sticky top-0 backdrop-blur-md z-10 rounded-md">
            <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm uppercase tracking-wider">
              <div className="col-span-1 text-center">#</div>
              <div className="col-span-7">Title</div>
              <div className="col-span-3">Artist</div>
              <div className="col-span-1 flex justify-end">
                <Clock size={16} />
              </div>
            </div>
          </div>

          <div className="mt-2">
            {playlistData?.songs?.map((track, index) => (
              <div
                key={track.id}
                className="group grid grid-cols-12 gap-4 items-center p-3 hover:bg-gray-800/40 transition-colors rounded-md mb-1 cursor-pointer"
                onMouseEnter={() => setHoveredTrack(track.id)}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() =>
                  handleSongClick(
                    track , index
                  )
                }
              >
                <div className="col-span-1 text-center text-gray-400 flex justify-center">
                  {hoveredTrack === track.id ? (
                    <Play size={14} className="text-white" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="col-span-7 flex items-center">
                  <img
                    src={track.image[2].url || "https://via.placeholder.com/50"}
                    alt={track.name}
                    className="w-10 h-10 rounded shadow-md mr-3"
                  />
                  <h3 className="text-white font-medium group-hover:text-green-400 transition-colors">
                    {track.name}
                  </h3>
                </div>
                <div className="col-span-3 text-sm text-gray-400 truncate">
                  {getArtists(track.artists.primary)}
                </div>
                <div className="col-span-1 flex justify-end items-center gap-3">
                  <span className="text-gray-400 text-sm">
                    {getTime(track.duration)}
                  </span>
                  <Heart
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MusicPlayer song={song} />
    </div>
  );
};

const MyPlaylist = () => {
  const location = useLocation();
  const playlist = location?.state?.playlist || {}; // Ensure playlistData is an empty object if not found
  const [song, setSong] = useState({
    title: "Midnight Shadows",
    artist: "Luna Ray",
    coverImage: myImage,
    audioSrc: "",
    duration: 270,
    currentTime: 0,
    isPlaying: false,
    audioRef: new Audio(),
  });
  const similarPlaylistsData = [
    {
      id: 1,
      playlist_name: "Relaxing Jazz",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      playlist_name: "Lofi Beats",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      playlist_name: "Ambient Sounds",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      playlist_name: "Mellow Piano",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      playlist_name: "Chill Study Music",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Playlist
      playlistData={playlist}
      similarPlaylists={similarPlaylistsData}
      song={song}
      setSong={setSong}
    />
  );
};

export default MyPlaylist;
