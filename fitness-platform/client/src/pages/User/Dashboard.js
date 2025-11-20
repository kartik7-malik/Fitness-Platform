import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FiActivity, FiCalendar, FiTrendingUp, FiUser } from 'react-icons/fi';

const UserDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    completedWorkouts: 0,
    activeWorkoutPlans: 0,
    progressEntries: 0
  });
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user stats
        const statsRes = await axios.get('/api/progress/stats');
        
        // Fetch recent workouts
        const workoutsRes = await axios.get('/api/workouts?limit=3');
        
        setStats({
          completedWorkouts: statsRes.data.data.completedWorkouts || 0,
          activeWorkoutPlans: workoutsRes.data.results || 0,
          progressEntries: statsRes.data.data.totalEntries || 0
        });
        
        setRecentWorkouts(workoutsRes.data.data.workouts || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {currentUser.name}</h1>
          <p className="text-gray-600">Here's an overview of your fitness journey</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/user/workouts"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Browse Workouts
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <FiActivity className="text-blue-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Completed Workouts</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.completedWorkouts}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FiCalendar className="text-green-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Active Workout Plans</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.activeWorkoutPlans}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-purple-100 p-3 mr-4">
            <FiTrendingUp className="text-purple-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Progress Entries</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.progressEntries}</h3>
          </div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Workouts</h2>
          <Link to="/user/workouts" className="text-blue-500 hover:text-blue-700">
            View All
          </Link>
        </div>
        
        {recentWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentWorkouts.map((workout) => (
              <div key={workout._id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4">
                  <h3 className="font-semibold text-lg mb-1">{workout.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {workout.difficulty} • {workout.duration} min
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiUser className="mr-1" />
                    <span>By {workout.creator.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {workout.description}
                  </p>
                  <Link
                    to={`/user/workouts/${workout._id}`}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recent workouts found. Start exploring!</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/user/workouts"
            className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-300"
          >
            <FiActivity className="text-blue-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800">Find Workouts</span>
          </Link>
          
          <Link
            to="/user/progress"
            className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-300"
          >
            <FiTrendingUp className="text-green-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800">Track Progress</span>
          </Link>
          
          <Link
            to="/user/profile"
            className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-300"
          >
            <FiUser className="text-purple-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800">Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;