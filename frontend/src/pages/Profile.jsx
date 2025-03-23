import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar"

const ProfilePage = ({ userData }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const location = useLocation();
  const data = location.state?.data;
  console.log(data);
  // Sample user data - replace with actual data from props
  const user = userData || {
    firstName: "Pakshu",
    lastName: "Namdev",
    userName: "vitthalnamdev",
    profileImage: null, // Optional profile image
    bio: "Music enthusiast and aspiring producer. I love discovering new artists and sharing playlists.",
    favoriteGenres: ["Hip Hop", "Electronic", "Jazz", "Alternative"],
    recentlyPlayed: [
      { id: 1, title: "Midnight City", artist: "M83", albumArt: "/api/placeholder/60/60" },
      { id: 2, title: "Redbone", artist: "Childish Gambino", albumArt: "/api/placeholder/60/60" },
      { id: 3, title: "Flashing Lights", artist: "Kanye West", albumArt: "/api/placeholder/60/60" }
    ]
  };
  
  // First initial for the profile picture placeholder
  const firstInitial = data?.firstName ? data.firstName.charAt(0).toUpperCase() : 'V';
  const firstName = data?.firstName || user.firstName;
  const lastName = data?.lastName || user.lastName;
  const userName = data?.Username || user.userName;
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      
      {/* Profile Header with smooth gradient transition */}
      <div className="relative">
        {/* Semi-transparent overlay that extends from navbar */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
        
        {/* Main profile gradient that starts with transparency to blend with navbar */}
        <div className="pt-16 pb-10 bg-gradient-to-b from-gray-900/0 via-purple-900/90 to-gray-900">
          <div className="container mx-auto px-4 pt-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Profile Picture */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-purple-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-lg shadow-purple-900/50 z-20">
                {firstInitial}
              </div>
              
              {/* Profile Info */}
              <div className="text-center md:text-left z-20">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {firstName} {lastName}
                </h1>
                <p className="text-purple-400 text-lg mt-1">@{userName}</p>
                <p className="max-w-lg mt-4 text-gray-300">{user.bio}</p>
                
                <div className="mt-6 flex flex-wrap gap-2 justify-center md:justify-start">
                  {user.favoriteGenres.map((genre, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-gray-800/80 backdrop-blur-sm rounded-full text-sm transition-all hover:bg-purple-800/50"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 border-b border-gray-800">
        <div className="flex overflow-x-auto">
          <button 
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'profile' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button 
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'playlists' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab("playlists")}
          >
            Playlists
          </button>
          <button 
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'following' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
          <button 
            className={`px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'activity' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setActiveTab("activity")}
          >
            Activity
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Account Information */}
            <div className="bg-gray-800 rounded-lg p-6 md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Account Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-400 text-sm">First Name</h3>
                  <p className="mt-1">{firstName}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-400 text-sm">Last Name</h3>
                  <p className="mt-1">{lastName}</p>
                </div>
                
                <div>
                  <h3 className="text-gray-400 text-sm">Username</h3>
                  <p className="mt-1">@{userName}</p>
                </div>
                
                <div className="pt-4">
                  <button className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            
            {/* Recently Played */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Recently Played</h2>
              
              <div className="space-y-3">
                {user.recentlyPlayed.map(track => (
                  <div key={track.id} className="flex items-center gap-3">
                    <img 
                      src={track.albumArt} 
                      alt={`${track.title} album art`} 
                      className="w-12 h-12 rounded"
                    />
                    <div>
                      <p className="font-medium">{track.title}</p>
                      <p className="text-sm text-gray-400">{track.artist}</p>
                    </div>
                  </div>
                ))}
                
                <button className="w-full mt-2 px-4 py-2 border border-gray-600 rounded-md text-sm hover:border-white transition-colors">
                  View Music History
                </button>
              </div>
            </div>
            
            {/* Music Stats */}
            <div className="bg-gray-800 rounded-lg p-6 md:col-span-3">
              <h2 className="text-xl font-bold mb-4">Music Overview</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Playlists</p>
                  <p className="text-2xl font-bold mt-1">12</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Following</p>
                  <p className="text-2xl font-bold mt-1">48</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Followers</p>
                  <p className="text-2xl font-bold mt-1">27</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Favorite Artists</p>
                  <p className="text-2xl font-bold mt-1">15</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "playlists" && (
          <div className="text-center py-16">
            <p className="text-gray-400">Playlists tab content would appear here</p>
          </div>
        )}
        
        {activeTab === "following" && (
          <div className="text-center py-16">
            <p className="text-gray-400">Following tab content would appear here</p>
          </div>
        )}
        
        {activeTab === "activity" && (
          <div className="text-center py-16">
            <p className="text-gray-400">Activity tab content would appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;