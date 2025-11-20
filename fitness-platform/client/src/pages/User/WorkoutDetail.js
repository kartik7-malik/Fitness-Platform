import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const WorkoutDetail = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, you would fetch from API
    setTimeout(() => {
      setWorkout({
        id: parseInt(id),
        title: 'Full Body Strength',
        description: 'A complete workout targeting all major muscle groups',
        duration: '45 minutes',
        level: 'Intermediate',
        trainer: 'John Doe',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 12, rest: '60 sec' },
          { name: 'Squats', sets: 3, reps: 15, rest: '60 sec' },
          { name: 'Lunges', sets: 3, reps: 10, rest: '45 sec' },
          { name: 'Plank', sets: 3, duration: '30 sec', rest: '30 sec' }
        ]
      });
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading workout details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/user/workouts" className="text-blue-500 hover:underline mb-4 inline-block">
        &larr; Back to Workouts
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{workout.title}</h1>
          <p className="text-gray-600 mb-6">{workout.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{workout.duration}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-500">Difficulty Level</p>
              <p className="font-medium">{workout.level}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-500">Trainer</p>
              <p className="font-medium">{workout.trainer}</p>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Exercise Plan</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Exercise</th>
                  <th className="py-3 px-6 text-center">Sets</th>
                  <th className="py-3 px-6 text-center">Reps/Duration</th>
                  <th className="py-3 px-6 text-center">Rest</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {workout.exercises.map((exercise, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left">{exercise.name}</td>
                    <td className="py-3 px-6 text-center">{exercise.sets}</td>
                    <td className="py-3 px-6 text-center">{exercise.reps || exercise.duration}</td>
                    <td className="py-3 px-6 text-center">{exercise.rest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-200">
              Start Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;