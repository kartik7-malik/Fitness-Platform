import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Verify token expiration
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp < currentTime) {
          // Token expired
          logout();
        } else {
          // Set auth token header
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          // Get current user
          getCurrentUser();
        }
      } catch (err) {
        console.error('Invalid token', err);
        logout();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  // Register user
  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.post('/api/auth/register', userData);
      
      // Set token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Set current user
      setCurrentUser(res.data.user);
      setIsAuthenticated(true);
      toast.success('Registration successful!');
      
      return res.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      // Set token to localStorage
      localStorage.setItem('token', res.data.token);
      
      // Set auth token header
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      // Set current user
      setCurrentUser(res.data.user);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      
      return res.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['Authorization'];
    
    // Reset state
    setCurrentUser(null);
    setIsAuthenticated(false);
    setError(null);
    
    toast.info('You have been logged out');
  };

  // Get current user
  const getCurrentUser = async () => {
    setIsLoading(true);
    
    try {
      const res = await axios.get('/api/auth/me');
      setCurrentUser(res.data.data.user);
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Error fetching current user', err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.patch('/api/auth/updateMe', userData);
      setCurrentUser(res.data.data.user);
      toast.success('Profile updated successfully!');
      return res.data.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      toast.error(err.response?.data?.message || 'Failed to update profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        error,
        register,
        login,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};