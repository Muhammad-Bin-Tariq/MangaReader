import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import UserContext

const Navbar = () => {
  const { user, setUser } = useContext(UserContext); // Access user context
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user context
    localStorage.removeItem("user"); // Remove user from localStorage
    navigate("/Homepage"); // Redirect to homepage
  };

  const handleUsernameClick = () => {
    navigate("/dashboard"); // Redirect to dashboard on username click
  };

  return (
    <nav className="bg-DeepOrange text-White shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              <img
                src="https://api.mangadex.org/favicon.ico"
                alt="MangaDex Logo"
                className="w-6 h-6 inline-block ml-2"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {!user ? (
              <>
                <a href="/Homepage" className="hover:text-LightOrange">
                  Homepage
                </a>
                <a href="/Login" className="hover:text-LightOrange">
                  Login
                </a>
                <a href="/Register" className="hover:text-LightOrange">
                  Sign Up
                </a>
              </>
            ) : (
              <>
                <a href="/Homepage" className="hover:text-LightOrange">
                  Homepage
                </a>
                <a href="/dashboard" className="hover:text-LightOrange">
                  {user.username}/Dashboard
                </a>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleLogout}
                    className="text-White hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-700">
                {!user ? (
                  <>
                    <a
                      href="/Homepage"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-600"
                    >
                      Homepage
                    </a>
                    <a
                      href="/login"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-600"
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-600"
                    >
                      Sign Up
                    </a>
                  </>
                ) : (
                  <>
                    <a
                      href="/Homepage"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-600"
                    >
                      Homepage
                    </a>
                    <a
                      href="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-slate-600"
                    >
                      Dashboard
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-slate-600"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
