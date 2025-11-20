import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FiUsers, FiActivity, FiPlus, FiCheckCircle } from 'react-icons/fi';

const TrainerDashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalWorkouts: 0,
    pendingApprovals: 0,
    totalClients: 0
  });
  const [recentClients, setRecentClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch trainer stats
        const workoutsRes = await axios.get('/api/workouts?creator=me');
        const usersRes = await axios.get('/api/users?role=user&limit=5');
        
        setStats({
          totalWorkouts: workoutsRes.data.results || 0,
          pendingApprovals: workoutsRes.data.data.workouts.filter(w => !w.approved).length || 0,
          totalClients: usersRes.data.results || 0
        });
        
        setRecentClients(usersRes.data.data.users || []);
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
          <h1 className="text-3xl font-bold text-gray-800">Trainer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/trainer/workouts/create"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center"
          >
            <FiPlus className="mr-2" />
            Create Workout
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
            <p className="text-gray-600 text-sm">Total Workouts</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalWorkouts}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 p-3 mr-4">
            <FiCheckCircle className="text-yellow-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Pending Approvals</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.pendingApprovals}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
          <div className="rounded-full bg-green-100 p-3 mr-4">
            <FiUsers className="text-green-500 text-xl" />
          </div>
          <div>
            <p className="text-gray-600 text-sm">Total Clients</p>
            <h3 className="text-2xl font-bold text-gray-800">{stats.totalClients}</h3>
          </div>
        </div>
      </div>

      {/* Recent Clients */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Recent Clients</h2>
        </div>
        
        {recentClients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-center">Fitness Goal</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {recentClients.map((client) => (
                  <tr key={client._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {client.photo ? (
                            <img
                              src={client.photo}
                              alt={client.name}
                              className="w-8 h-8 rounded-full"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {client.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <span>{client.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">{client.email}</td>
                    <td className="py-3 px-6 text-center">{client.fitnessGoals || 'Not specified'}</td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <Link
                          to={`/trainer/clients/${client._id}/progress`}
                          className="text-blue-500 hover:text-blue-700 mx-2"
                        >
                          View Progress
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No clients found.</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/trainer/workouts/create"
            className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-300"
          >
            <FiPlus className="text-blue-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800">Create Workout</span>
          </Link>
          
          <Link
            to="/trainer/workouts"
            className="bg-green-50 hover:bg-green-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-300"
          >
            <FiActivity className="text-green-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800">Manage Workouts</span>
          </Link>
          
          <Link
            to="/trainer/profile"
            className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg flex flex-col items-center justify-center text-center transition duration-300"
          >
            <FiUsers className="text-purple-500 text-2xl mb-2" />
            <span className="font-medium text-gray-800">Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;