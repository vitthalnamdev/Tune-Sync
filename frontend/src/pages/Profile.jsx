import React, { useState } from 'react';
import { User, Calendar, Mail, Phone, MapPin, Music, Headphones, Edit, Play, Share } from 'lucide-react';

const MusicProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    username: "musiclover42",
    location: "Los Angeles, CA",
    email: "alex@musicapp.com",
    joined: "March 2022",
    bio: "Music enthusiast who loves discovering new tracks and sharing them with friends. Let's listen together!",
    favoriteGenres: ["Electronic", "Indie Pop", "Alternative", "Hip-Hop", "Jazz"],
    currentlyListening: {
      // title: "Midnight City",
      // artist: "M83",
      // album: "Hurry Up, We're Dreaming",
      // coverUrl: "/api/placeholder/80/80"
    },
    stats: {
      // sessionsHosted: 48,
      // sessionsJoined: 152,
      // tracksShared: 437,
      // followers: 89,
      // following: 124
    },
    recentSessions: [
      // {
      //   name: "Friday Night Vibes",
      //   participants: 7,
      //   tracks: 22,
      //   isPrivate: false,
      //   date: "Yesterday"
      // },
      // {
      //   name: "Chill Study Session",
      //   participants: 3,
      //   tracks: 15,
      //   isPrivate: true,
      //   date: "3 days ago"
      // }
    ]
  });

  // Sample active rooms
  const [activeRooms, setActiveRooms] = useState([
    { name: "Global Indie Discoveries", members: 42, currentTrack: "The National - Smoke Detector" },
    { name: "Lo-fi Study Room", members: 127, currentTrack: "Nujabes - Feather" },
    { name: "Friday EDM Party", members: 64, currentTrack: "Disclosure - You & Me (Flume Remix)" }
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-100">Tune-Sync</h1>
          <div className="flex gap-3">  
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md flex items-center gap-2 hover:bg-purple-700 transition-colors">
              <Music size={16} />
              <span>Create Room</span>
            </button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md flex items-center gap-2 hover:bg-gray-600 transition-colors">
              <Edit size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Profile card */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-32 relative">
                <div className="absolute -bottom-16 left-4">
                  <div className="w-32 h-32 rounded-full border-4 border-gray-800 bg-gray-700 flex items-center justify-center overflow-hidden">
                    {/* Placeholder avatar with user's initials */}
                    <div className="w-full h-full bg-purple-900 flex items-center justify-center">
                      <span className="text-3xl font-bold text-purple-200">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-16 pb-6 px-6">
                <h2 className="text-2xl font-bold text-gray-100">{profile.name}</h2>
                <p className="text-purple-400 font-medium">@{profile.username}</p>
                
                {/* <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin size={18} className="text-gray-400" />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail size={18} className="text-gray-400" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar size={18} className="text-gray-400" />
                    <span>Joined {profile.joined}</span>
                  </div>
                </div> */}

                {/* Currently listening */}
                <div className="mt-6 p-3 bg-gray-700 rounded-lg flex items-center gap-3">
                  <img 
                    src={profile.currentlyListening.coverUrl} 
                    alt="Album cover" 
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{profile.currentlyListening.title}</p>
                    <p className="text-sm text-gray-400 truncate">{profile.currentlyListening.artist}</p>
                  </div>
                  <button className="p-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors">
                    <Play size={16} />
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-lg font-bold">{profile.stats.sessionsHosted}</p>
                    <p className="text-xs text-gray-400">Communities</p>
                  </div>
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-lg font-bold">{profile.stats.sessionsJoined}</p>
                    <p className="text-xs text-gray-400">Joined</p>
                  </div>
                  <div className="bg-gray-700 p-2 rounded">
                    <p className="text-lg font-bold">{profile.stats.tracksShared}</p>
                    <p className="text-xs text-gray-400">Shared</p>
                  </div>
                </div>
              </div>    
            </div>
          </div>
          
          {/* Right column - Details */}
          <div className="w-full md:w-2/3">
            {/* About section */}
            <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-100 mb-4">About</h3>
              <p className="text-gray-300">{profile.bio}</p>
              
              <h4 className="text-md font-medium text-gray-100 mt-4 mb-2">Favorite Genres</h4>
              <div className="flex flex-wrap gap-2">
                {profile.favoriteGenres.map((genre, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-purple-300 rounded-full text-sm font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Recent sessions */}
            <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-100 mb-4">Recent Listening Sessions</h3>
              <div className="space-y-4">
                {profile.recentSessions.map((session, index) => (
                  <div key={index} className="border-l-2 border-purple-500 pl-4 py-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-100">
                        {session.name} 
                        {session.isPrivate && (
                          <span className="ml-2 px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">Private</span>
                        )}
                      </h4>
                      <span className="text-sm text-gray-400">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400 mt-1">
                      <Headphones size={14} />
                      <span className="text-sm">{session.participants} participants</span>
                      <span className="text-gray-500">•</span>
                      <Music size={14} />
                      <span className="text-sm">{session.tracks} tracks</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button className="text-xs px-2 py-1 bg-purple-600 hover:bg-purple-700 rounded text-white transition-colors">
                        Replay
                      </button>
                      <button className="text-xs px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors flex items-center gap-1">
                        <Share size={12} />
                        Share
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Active listening rooms */}
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-100 mb-4">Alex's Rooms</h3>
              <div className="space-y-4">
                {activeRooms.map((room, index) => (
                  <div key={index} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-100">{room.name}</h4>
                      <span className="text-sm bg-purple-600 px-2 py-0.5 rounded-full">
                        {room.members} Members
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">
                      <span className="text-purple-400">Now playing:</span> {room.currentTrack}
                    </p>
                    <button className="mt-3 w-full py-2 bg-purple-600 hover:bg-purple-700 rounded text-white transition-colors flex items-center justify-center gap-2">
                      <Headphones size={16} />
                      Join Room
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MusicProfilePage;