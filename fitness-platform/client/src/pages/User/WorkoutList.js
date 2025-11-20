import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch workouts from the API
    // For now, we'll use mock data
    setTimeout(() => {
      setWorkouts([
        {
          id: 1,
          title: 'Full Body Strength',
          description: 'A complete workout targeting all major muscle groups',
          duration: '45 minutes',
          level: 'Intermediate',
          trainer: 'John Doe'
        },
        {
          id: 2,
          title: 'HIIT Cardio Blast',
          description: 'High intensity interval training to boost your metabolism',
          duration: '30 minutes',
          level: 'Advanced',
          trainer: 'Jane Smith'
        },
        {
          id: 3,
          title: 'Yoga for Beginners',
          description: 'Gentle yoga flow for flexibility and relaxation',
          duration: '60 minutes',
          level: 'Beginner',
          trainer: 'Mike Johnson'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Available Workouts</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading workouts...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.map(workout => (
            <div key={workout.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{workout.title}</h2>
                <p className="text-gray-600 mb-4">{workout.description}</p>
                
                <div className="flex flex-wrap text-sm text-gray-500 mb-4">
                  <div className="mr-4 mb-2">
                    <span className="font-medium">Duration:</span> {workout.duration}
                  </div>
                  <div className="mr-4 mb-2">
                    <span className="font-medium">Level:</span> {workout.level}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Trainer:</span> {workout.trainer}
                  </div>
                </div>
                
                <Link 
                  to={`/user/workouts/${workout.id}`}
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutList;