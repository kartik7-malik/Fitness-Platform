import React from 'react';

const ProgressTracker = () => {
  // Mock data - in a real app, you would fetch from API
  const progressData = {
    weight: [
      { date: '2023-01-01', value: 75 },
      { date: '2023-02-01', value: 73 },
      { date: '2023-03-01', value: 72 },
      { date: '2023-04-01', value: 70 }
    ],
    workoutsCompleted: 24,
    totalMinutes: 720,
    achievements: [
      { name: 'First Workout', date: '2023-01-05' },
      { name: '10 Workouts Completed', date: '2023-02-15' },
      { name: 'Weight Goal Reached', date: '2023-03-20' }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Current Weight</h2>
          <p className="text-3xl font-bold text-blue-500">{progressData.weight[progressData.weight.length - 1].value} kg</p>
          <p className="text-sm text-gray-500 mt-1">
            {progressData.weight[0].value - progressData.weight[progressData.weight.length - 1].value > 0 
              ? `Lost ${progressData.weight[0].value - progressData.weight[progressData.weight.length - 1].value} kg since you started` 
              : 'Maintaining weight'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Workouts Completed</h2>
          <p className="text-3xl font-bold text-green-500">{progressData.workoutsCompleted}</p>
          <p className="text-sm text-gray-500 mt-1">Keep up the good work!</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Total Time</h2>
          <p className="text-3xl font-bold text-purple-500">{progressData.totalMinutes} mins</p>
          <p className="text-sm text-gray-500 mt-1">That's {Math.round(progressData.totalMinutes / 60)} hours of exercise</p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Weight Progress</h2>
        <div className="h-64 flex items-end justify-between">
          {progressData.weight.map((entry, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className="bg-blue-500 w-16" 
                style={{ 
                  height: `${(entry.value / progressData.weight[0].value) * 200}px`,
                  minHeight: '20px'
                }}
              ></div>
              <p className="text-xs mt-2">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short' })}</p>
              <p className="text-xs font-medium">{entry.value} kg</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Achievements</h2>
        <div className="space-y-4">
          {progressData.achievements.map((achievement, index) => (
            <div key={index} className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium">{achievement.name}</p>
                <p className="text-sm text-gray-500">{new Date(achievement.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;