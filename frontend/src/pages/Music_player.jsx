import React, { useRef, useState, useEffect } from "react";
import { useAudio } from '../services/AudioProvider';

const MusicPlayer = ({ song }) => {
  const { 
    audioRef,
    isPlaying, 
    currentTime, 
    duration,
    volume,
    currentSong,
    loadSong,
    togglePlay,
    seekTo,
    setAudioVolume
  } = useAudio();
  const progressBarRef = useRef(null);
  const [formattedDuration, setFormattedDuration] = useState("0:00");
  
  // Load the song when component mounts or song changes
  useEffect(() => {
    if (song && song.audioSrc) {
      loadSong(song);
    }
  }, [song, loadSong]);
  
  // Update formatted duration when duration changes
  useEffect(() => {
    if (duration) {
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      setFormattedDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    }
  }, [duration]);
  
  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Calculate progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Skip forward/backward by 10 seconds
  const skipForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    seekTo(newTime);
  };

  const skipBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    seekTo(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setAudioVolume(newVolume);
  };

  // Handle seek when clicking on the progress bar
  const handleSeek = (e) => {
    if (!progressBarRef.current) return;
    
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    
    // Calculate the percentage of the click position
    const percentage = offsetX / width;
    
    // Calculate the new time based on the percentage and duration
    const newTime = percentage * duration;
    
    // Update the audio's current time
    seekTo(newTime);
  };

  // Get title, artist, and cover image from the current song or the prop
  const title = currentSong?.title || song?.title || "Unknown Title";
  const artists = currentSong?.artists || song?.artists || "Unknown Artist";
  const coverImage = currentSong?.coverImage || song?.coverImage || "coverImage.jpg";

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4">
      <div className="bg-gray-600 rounded-lg p-4 flex items-center shadow-2xl">
        {/* Cover image */}
        <div className="w-14 h-14 rounded overflow-hidden mr-4">
          <img
            src={coverImage}
            alt={`${title} by ${artists}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "coverImage.jpg"; // Fallback to default image on error
            }}
          />
        </div>

        {/* Song info */}
        <div className="flex-1 min-w-0 mr-4">
          <h4 className="font-medium text-sm text-white">{title}</h4>
          <p className="text-gray-400 text-xs truncate">{artists}</p>
        </div>

        {/* Player controls */}
        <div className="flex items-center space-x-4">
          <button
            className="text-gray-400 hover:text-white"
            onClick={skipBackward}
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

          <button
            className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-purple-700 shadow-md transition-all duration-200"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button
            className="text-gray-400 hover:text-white"
            onClick={skipForward}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="hidden md:flex items-center flex-1 mx-4">
          <span className="text-xs text-gray-400 min-w-[40px] text-right mr-2 ">
            {formatTime(currentTime)}
          </span>
          <div 
            className="h-1 flex-1 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
            ref={progressBarRef}
            onClick={handleSeek}
          >
            <div
              className="h-full bg-purple-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-400 min-w-[40px] ml-2">
            {formattedDuration}
          </span>
        </div>

        {/* Volume control */}
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
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 h-1"
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;