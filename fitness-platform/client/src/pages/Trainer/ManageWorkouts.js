import React from 'react';
import { Link } from 'react-router-dom';

const ManageWorkouts = () => {
  // Mock data
  const workouts = [
    {
      id: 1,
      title: 'Full Body Strength',
      level: 'Intermediate',
      duration: '45 min',
      status: 'active',
      clients: 12
    },
    {
      id: 2,
      title: 'HIIT Cardio Blast',
      level: 'Advanced',
      duration: '30 min',
      status: 'active',
      clients: 8
    },
    {
      id: 3,
      title: 'Yoga for Beginners',
      level: 'Beginner',
      duration: '60 min',
      status: 'draft',
      clients: 0
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Workouts</h1>
        <Link 
          to="/trainer/create-workout"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
        >
          Create New Workout
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Workout</th>
              <th className="py-3 px-6 text-center">Level</th>
              <th className="py-3 px-6 text-center">Duration</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Clients</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {workouts.map(workout => (
              <tr key={workout.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left">
                  <div className="font-medium">{workout.title}</div>
                </td>
                <td className="py-3 px-6 text-center">{workout.level}</td>
                <td className="py-3 px-6 text-center">{workout.duration}</td>
                <td className="py-3 px-6 text-center">
                  <span className={`py-1 px-3 rounded-full text-xs ${
                    workout.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {workout.status.charAt(0).toUpperCase() + workout.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-6 text-center">{workout.clients}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button className="transform hover:text-blue-500 hover:scale-110 transition-all duration-150 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="transform hover:text-yellow-500 hover:scale-110 transition-all duration-150 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button className="transform hover:text-red-500 hover:scale-110 transition-all duration-150">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageWorkouts;