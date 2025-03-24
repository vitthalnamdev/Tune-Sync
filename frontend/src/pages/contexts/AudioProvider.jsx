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
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState({
    title: "Apna Bana Le",
    artists : "Sachin-Jigar, Arijit Singh",
    coverImage: "https://c.saavncdn.com/815/Bhediya-Hindi-2023-20230927155213-500x500.jpg", 
    audioSrc: "https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_320.mp4",
    duration: 261,
    currentTime: 0
  });
  
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
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    

    const handleEnded = () => {

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
  }, []);
  

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
  function loadSong(song){
    const audio = audioRef.current;
  
    // If it's the same song that was already loaded, don't reload
    if (currentSong && song.audioSrc === currentSong.audioSrc) {
      return;
    }
    console.log("SONG:" , song);
    setCurrentSong(song);
    // Set the new song
    audio.src = song.audioSrc;
    // Load the new audio source
    audio.load();
    audio.play();
    
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

  function nextSong(){
    const length = sizenext();
  
    
    if (length > 0) {
      const curr = peeknext();
      dequeuenext();
      enqueueprev(currentSong);
      const _currentSong = {
        title: curr.name, // Fixed: was track.naame
        artists: getArtists(curr.artists.primary),
        coverImage:
          curr.image[Object.keys(curr.image).length - 1].url ||
          "https://via.placeholder.com/50",
        audioSrc:
          curr.downloadUrl[Object.keys(curr.downloadUrl).length - 1].url || "",
        duration: curr.duration,
        currentTime: 0,
        isPlaying: true,
        audioRef: new Audio(
          curr.downloadUrl[Object.keys(curr.downloadUrl).length - 1].url || ""
        ),
      }
      
      if (!_currentSong || !_currentSong.audioSrc) {
        console.error("Invalid song object:", curr);
        return false;
      }
      loadSong(_currentSong);
      console.log("HELLO after setting");
    } else {
      console.warn("No next song available");
    }
  };
  

  const seekTo = (time) => {
    const audio = audioRef.current;
    audio.currentTime = time;
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