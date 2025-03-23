import React from 'react';

const Playlist = ({ playlistData, similarPlaylists }) => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-7xl bg-gray-800 rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Left Side */}
        <div className="w-1/3 flex flex-col border-r border-gray-700">
          {/* Playlist Info */}
          <div className="bg-gradient-to-br from-purple-600 via-blue-800 to-gray-900 p-8">
            <div className="relative group">
              <img
                src={playlistData.imageUrl}
                alt="Playlist Cover"
                className="w-full rounded-xl shadow-lg transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
            </div>
            <h1 className="text-4xl font-bold text-white mt-6 mb-2">{playlistData.title}</h1>
            <p className="text-gray-300 text-sm leading-relaxed">{playlistData.description}</p>
          </div>

          {/* Similar Playlists */}
          <div className="p-6 bg-gray-850 flex-1">
            <h2 className="text-xl font-semibold text-white mb-4">More like this</h2>
            <div className="space-y-4">
              {similarPlaylists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="group flex items-center p-3 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
                >
                  <img
                    src={playlist.image}
                    alt={playlist.playlist_name}
                    className="w-16 h-16 rounded-md shadow-md mr-4"
                  />
                  <span className="text-gray-300 group-hover:text-white font-medium transition-colors">
                    {playlist.playlist_name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Track List */}
        <div className="w-2/3 flex flex-col">
          <div className="p-6 bg-gray-850 border-b border-gray-700">
            <div className="grid grid-cols-12 gap-4 text-gray-400 text-sm font-medium uppercase tracking-wider">
              <div className="col-span-1">#</div>
              <div className="col-span-8">Title</div>
              <div className="col-span-3 text-right">Duration</div>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {playlistData.tracks.map((track) => (
              <div
                key={track.id}
                className="group grid grid-cols-12 gap-4 items-center p-4 hover:bg-gray-700/30 transition-colors border-b border-gray-800 last:border-b-0"
              >
                <div className="col-span-1 text-gray-400 text-right">{track.id}</div>
                <div className="col-span-8 flex items-center">
                  <img
                    src={track.trackImage}
                    alt={track.title}
                    className="w-12 h-12 rounded-md shadow-md mr-4"
                  />
                  <div>
                    <h3 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                      {track.title}
                    </h3>
                    <p className="text-sm text-gray-400">{track.artist}</p>
                  </div>
                </div>
                <div className="col-span-3 text-right text-gray-400">{track.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


const MyPlaylist = () => {
  const myPlaylistData = {
    imageUrl: 'https://i.scdn.co/image/ab67616d0000b27376c96765796a58288331d5b3',
    title: 'Chill Vibes',
    description: 'Relaxing tunes for a calm day.',
    tracks: [
      {
        id: 1,
        title: 'Sunset Serenity',
        artist: 'Ambient Waves',
        duration: '4:23',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e028d7b3082987a030f25244585',
      },
      {
        id: 2,
        title: 'Gentle Breeze',
        artist: 'Soft Sounds',
        duration: '3:56',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e0202812239f1c97047970891d4',
      },
      {
        id: 3,
        title: 'Morning Dew',
        artist: 'Calm Melodies',
        duration: '5:12',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e02377b5828472f77839359e9a5',
      },
      {
        id: 4,
        title: 'Evening Calm',
        artist: 'Peaceful Tones',
        duration: '4:45',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e028d7b3082987a030f25244585',
      },
      {
        id: 5,
        title: 'Silent Stream',
        artist: 'Tranquil Music',
        duration: '3:30',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e0202812239f1c97047970891d4',
      },
      {
        id: 6,
        title: 'Dreamy Clouds',
        artist: 'Relaxing Beats',
        duration: '4:10',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e02377b5828472f77839359e9a5',
      },
      {
        id: 7,
        title: 'Whispering Woods',
        artist: 'Nature Sounds',
        duration: '5:00',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e028d7b3082987a030f25244585',
      },
      {
        id: 8,
        title: 'Starry Night',
        artist: 'Cosmic Vibes',
        duration: '3:48',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e0202812239f1c97047970891d4',
      },
      {
        id: 9,
        title: 'Ocean Waves',
        artist: 'Water Sounds',
        duration: '4:33',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e02377b5828472f77839359e9a5',
      },
      {
        id: 10,
        title: 'Golden Hour',
        artist: 'Mellow Tracks',
        duration: '4:05',
        trackImage: 'https://i.scdn.co/image/ab67616d00001e028d7b3082987a030f25244585',
      },
    ],
  };

  const similarPlaylistsData = [
    {
      id: 1,
      playlist_name: 'Relaxing Jazz',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      playlist_name: 'Lofi Beats',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      playlist_name: 'Ambient Sounds',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      playlist_name: 'Mellow Piano',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 5,
      playlist_name: 'Chill Study Music',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return <Playlist playlistData={myPlaylistData} similarPlaylists={similarPlaylistsData} />;
};

export default MyPlaylist;