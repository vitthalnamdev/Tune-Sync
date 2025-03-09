import React from "react";

const Header = (params) => {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 bg-gray-900/90 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-bold">
              TuneSync<span className="text-purple-500">.</span>
            </a>

            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <a href="#" className="text-white font-medium">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    Connect
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    Library
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    Artists
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors font-medium"
                  >
                    You
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex space-x-4">
              <button className="px-4 py-2 rounded-full border border-gray-600 text-white font-medium hover:border-white transition-colors">
                Log In
              </button>
              <button className="px-4 py-2 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
