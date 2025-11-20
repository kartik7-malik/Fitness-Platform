import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiUsers, FiUserCheck, FiActivity, FiCheckCircle } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    userCount: 0,
    trainerCount: 0,
    workoutCount: 0,
    pendingWorkoutCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/admin/stats');
        setStats(res.data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FiUsers className="text-blue-500 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.userCount}</p>
          <Link to="/admin/users" className="text-blue-500 text-sm mt-2 inline-block">
            View all users →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FiUserCheck className="text-green-500 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Trainers</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.trainerCount}</p>
          <Link to="/admin/trainers" className="text-blue-500 text-sm mt-2 inline-block">
            Manage trainers →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <FiActivity className="text-purple-500 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Workouts</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.workoutCount}</p>
          <span className="text-gray-500 text-sm mt-2 inline-block">
            Total workout plans
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <FiCheckCircle className="text-yellow-500 text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Pending Approvals</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{stats.pendingWorkoutCount}</p>
          <Link to="/admin/workouts/approvals" className="text-blue-500 text-sm mt-2 inline-block">
            Review workouts →
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/users"
            className="bg-blue-50 hover:bg-blue-100 p-6 rounded-lg flex items-center transition duration-300"
          >
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FiUsers className="text-blue-500 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Users</h3>
              <p className="text-gray-600 text-sm">Add, edit or remove users</p>
            </div>
          </Link>

          <Link
            to="/admin/trainers"
            className="bg-green-50 hover:bg-green-100 p-6 rounded-lg flex items-center transition duration-300"
          >
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FiUserCheck className="text-green-500 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Trainers</h3>
              <p className="text-gray-600 text-sm">Approve and manage trainers</p>
            </div>
          </Link>

          <Link
            to="/admin/workouts/approvals"
            className="bg-yellow-50 hover:bg-yellow-100 p-6 rounded-lg flex items-center transition duration-300"
          >
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <FiCheckCircle className="text-yellow-500 text-xl" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Workout Approvals</h3>
              <p className="text-gray-600 text-sm">Review and approve workouts</p>
            </div>
          </Link>
        </div>
      </div>

      {/* System Overview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">User Distribution</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Regular Users</span>
                <span className="font-medium">{stats.userCount - stats.trainerCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-blue-500 h-2.5 rounded-full" 
                  style={{ width: `${((stats.userCount - stats.trainerCount) / stats.userCount) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Trainers</span>
                <span className="font-medium">{stats.trainerCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(stats.trainerCount / stats.userCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Workout Status</h3>
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Approved Workouts</span>
                <span className="font-medium">{stats.workoutCount - stats.pendingWorkoutCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-purple-500 h-2.5 rounded-full" 
                  style={{ width: `${((stats.workoutCount - stats.pendingWorkoutCount) / stats.workoutCount) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Pending Approvals</span>
                <span className="font-medium">{stats.pendingWorkoutCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-yellow-500 h-2.5 rounded-full" 
                  style={{ width: `${(stats.pendingWorkoutCount / stats.workoutCount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;