import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useQueue } from "./queueContext";
import myImage from "../coverImage.jpg";
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(
    localStorage.getItem("currentSong")
      ? JSON.parse(localStorage.getItem("currentSong"))
      : {
          title: "Apna Bana Le",
          artists: "Sachin-Jigar, Arijit Singh",
          coverImage: "https://c.saavncdn.com/815/Bhediya-Hindi-2023-20230927155213-500x500.jpg", 
          audioSrc: "https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_320.mp4",
          duration: 261,
          id: null
        }
  );
  const [currentTime, setCurrentTime] = useState(parseFloat(localStorage.getItem("currTime")) || 0);
  const [currentSongId, setCurrentSongId] = useState(null);
  
  const audioRef = useRef(new Audio(currentSong.audioSrc));
   
  const [duration, setDuration] = useState(currentSong.duration);
  const [volume, setVolume] = useState(0.7);
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

  useEffect(() => {
    const audio = audioRef.current;
    audio.currentTime = currentTime;
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      localStorage.setItem("currTime" , audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleEnded = () => {
      // When current song ends, play the next song automatically
      nextSong();
    };

    // Add event listeners
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    // Set initial volume
    audio.volume = volume;

    // Clean up
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);  // Keep this dependency array empty to only run once
  
  const togglePlay = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  const prevSong = () => {
    const length = sizeprev();

    if (length > 0) {
      const curr = peekprev();
      dequeueprev();
      loadSong(curr);
    } 
  };
  
  // Load and play a song
  function loadSong(song) {
    const audio = audioRef.current;
  
    // If it's the same song that was already loaded, don't reload
    if (currentSong && song.audioSrc === currentSong.audioSrc) {
      return;
    }
    
    // Update current song ID for highlighting
    setCurrentSongId(song.id);
    localStorage.setItem("currentSong", JSON.stringify(song));
    // Set the new song
    setCurrentSong(song);
    
    // Set the new audio source
    audio.src = song.audioSrc;
    
    // Load the new audio source
    audio.load();
    setIsPlaying(true);
    audio.play();
  }

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

  function nextSong() {
    const length = sizenext();
  
    if (length > 0) {
      const curr = peeknext();
      dequeuenext();
      // Only enqueue previous if there's a valid current song
      if (currentSong && currentSong.title) {
        enqueueprev(currentSong);
      }
      const _currentSong = {
        title: curr.name,
        artists: getArtists(curr.artists.primary),
        coverImage:
          curr.image[Object.keys(curr.image).length - 1].url ||
          "https://via.placeholder.com/50",
        audioSrc:
          curr.downloadUrl[Object.keys(curr.downloadUrl).length - 1].url || "",
        duration: curr.duration,
        id: curr.id // Store the song ID for highlighting
      };
      
      if (!_currentSong || !_currentSong.audioSrc) {
        console.error("Invalid song object:", curr);
        return false;
      }
      
      loadSong(_currentSong);
    } else {
      console.warn("No next song available");
      // If no next song, stop playing or loop back to the beginning
      const audio = audioRef.current;
      audio.pause();
      setIsPlaying(false);
    }
  }
  
  const seekTo = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
    localStorage.setItem("currTime", audio.currentTime);
    setCurrentTime(time);
  };

  const setAudioVolume = (newVolume) => {
    const audio = audioRef.current;
    audio.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        isPlaying,
        currentTime,
        duration,
        volume,
        currentSong,
        currentSongId, // Expose currentSongId to components
        loadSong,
        togglePlay,
        seekTo,
        setAudioVolume,
        nextSong,
        prevSong,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);