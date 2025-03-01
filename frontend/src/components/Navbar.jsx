import React, { useState } from 'react';
import { Home, Search, Library, Heart, User, Volume2, Disc } from 'lucide-react';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'search', label: 'Search', icon: <Search size={20} /> },
    { id: 'library', label: 'Library', icon: <Library size={20} /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <div className="relative flex h-14 items-center justify-center border-b-2 '">
      {/* Top navigation bar */}
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <div className="flex items-center gap-2">
          <Disc className="text-green-500" size={28} />
          <span className="text-white font-bold text-xl">Harmony</span>
        </div>
        
        <div className=" md:flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center gap-2 px-2 py-1 rounded transition ${
                activeTab === tab.id
                  ? 'text-green-500 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white">
            <Volume2 size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium">
            JS
          </div>
        </div>
      </div>
      
      
      
      
    </div>
  );
};

export default Navbar;