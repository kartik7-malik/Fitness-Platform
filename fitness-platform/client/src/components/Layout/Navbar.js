import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Determine dashboard link based on user role
  const getDashboardLink = () => {
    if (!currentUser) return '/';
    
    switch (currentUser.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'trainer':
        return '/trainer/dashboard';
      default:
        return '/user/dashboard';
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={isAuthenticated ? getDashboardLink() : '/'} className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">FitnessPro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                {/* Navigation links based on user role */}
                {currentUser.role === 'admin' && (
                  <>
                    <Link to="/admin/users" className="text-gray-600 hover:text-blue-600">
                      Users
                    </Link>
                    <Link to="/admin/workouts/approvals" className="text-gray-600 hover:text-blue-600">
                      Approvals
                    </Link>
                    <Link to="/admin/stats" className="text-gray-600 hover:text-blue-600">
                      Stats
                    </Link>
                  </>
                )}

                {currentUser.role === 'trainer' && (
                  <>
                    <Link to="/trainer/workouts" className="text-gray-600 hover:text-blue-600">
                      My Workouts
                    </Link>
                    <Link to="/trainer/workouts/create" className="text-gray-600 hover:text-blue-600">
                      Create Workout
                    </Link>
                  </>
                )}

                {currentUser.role === 'user' && (
                  <>
                    <Link to="/user/workouts" className="text-gray-600 hover:text-blue-600">
                      Workouts
                    </Link>
                    <Link to="/user/progress" className="text-gray-600 hover:text-blue-600">
                      Progress
                    </Link>
                  </>
                )}

                {/* User dropdown */}
                <div className="relative group">
                  <button className="flex items-center text-gray-600 hover:text-blue-600 focus:outline-none">
                    <span className="mr-1">{currentUser.name}</span>
                    <FiUser />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link
                      to={`/${currentUser.role}/profile`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="text-gray-600 hover:text-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-4">
                <Link
                  to={getDashboardLink()}
                  className="text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>

                {/* Navigation links based on user role */}
                {currentUser.role === 'admin' && (
                  <>
                    <Link
                      to="/admin/users"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Users
                    </Link>
                    <Link
                      to="/admin/workouts/approvals"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Approvals
                    </Link>
                    <Link
                      to="/admin/stats"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Stats
                    </Link>
                  </>
                )}

                {currentUser.role === 'trainer' && (
                  <>
                    <Link
                      to="/trainer/workouts"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Workouts
                    </Link>
                    <Link
                      to="/trainer/workouts/create"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Create Workout
                    </Link>
                  </>
                )}

                {currentUser.role === 'user' && (
                  <>
                    <Link
                      to="/user/workouts"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Workouts
                    </Link>
                    <Link
                      to="/user/progress"
                      className="text-gray-600 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Progress
                    </Link>
                  </>
                )}

                <Link
                  to={`/${currentUser.role}/profile`}
                  className="text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-gray-600 hover:text-blue-600"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;