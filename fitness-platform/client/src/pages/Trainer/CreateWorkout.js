import React, { useState } from 'react';

const CreateWorkout = () => {
  const [workout, setWorkout] = useState({
    title: '',
    description: '',
    duration: '',
    level: 'beginner',
    exercises: [{ name: '', sets: '', reps: '', rest: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout(prev => ({ ...prev, [name]: value }));
  };

  const handleExerciseChange = (index, e) => {
    const { name, value } = e.target;
    const exercises = [...workout.exercises];
    exercises[index] = { ...exercises[index], [name]: value };
    setWorkout(prev => ({ ...prev, exercises }));
  };

  const addExercise = () => {
    setWorkout(prev => ({
      ...prev,
      exercises: [...prev.exercises, { name: '', sets: '', reps: '', rest: '' }]
    }));
  };

  const removeExercise = (index) => {
    const exercises = [...workout.exercises];
    exercises.splice(index, 1);
    setWorkout(prev => ({ ...prev, exercises }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Workout created:', workout);
    alert('Workout created successfully!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Workout</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Workout Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            name="title"
            value={workout.title}
            onChange={handleChange}
            placeholder="e.g. Full Body Strength"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={workout.description}
            onChange={handleChange}
            placeholder="Describe the workout"
            rows="3"
            required
          ></textarea>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
              Duration (minutes)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="duration"
              type="number"
              name="duration"
              value={workout.duration}
              onChange={handleChange}
              placeholder="e.g. 45"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
              Difficulty Level
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="level"
              name="level"
              value={workout.level}
              onChange={handleChange}
              required
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Exercises</h2>
        
        {workout.exercises.map((exercise, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Exercise {index + 1}</h3>
              {workout.exercises.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExercise(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`exercise-name-${index}`}>
                  Exercise Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`exercise-name-${index}`}
                  type="text"
                  name="name"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(index, e)}
                  placeholder="e.g. Push-ups"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`exercise-sets-${index}`}>
                  Sets
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`exercise-sets-${index}`}
                  type="number"
                  name="sets"
                  value={exercise.sets}
                  onChange={(e) => handleExerciseChange(index, e)}
                  placeholder="e.g. 3"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`exercise-reps-${index}`}>
                  Reps
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`exercise-reps-${index}`}
                  type="text"
                  name="reps"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(index, e)}
                  placeholder="e.g. 12 or 30 sec"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={`exercise-rest-${index}`}>
                  Rest Time
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={`exercise-rest-${index}`}
                  type="text"
                  name="rest"
                  value={exercise.rest}
                  onChange={(e) => handleExerciseChange(index, e)}
                  placeholder="e.g. 60 sec"
                  required
                />
              </div>
            </div>
          </div>
        ))}
        
        <div className="mb-6">
          <button
            type="button"
            onClick={addExercise}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            + Add Exercise
          </button>
        </div>
        
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Workout
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWorkout;