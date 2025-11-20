import React from 'react';

const SystemStats = () => {
  // Mock data
  const stats = {
    totalUsers: 120,
    activeUsers: 85,
    totalTrainers: 15,
    totalWorkouts: 45,
    completedWorkouts: 320,
    averageRating: 4.7
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">System Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-blue-500">{stats.totalUsers}</p>
          <p className="text-sm text-gray-500 mt-1">
            {Math.round((stats.activeUsers / stats.totalUsers) * 100)}% active
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Total Trainers</h2>
          <p className="text-3xl font-bold text-green-500">{stats.totalTrainers}</p>
          <p className="text-sm text-gray-500 mt-1">
            {Math.round(stats.totalWorkouts / stats.totalTrainers)} workouts per trainer
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Total Workouts</h2>
          <p className="text-3xl font-bold text-purple-500">{stats.totalWorkouts}</p>
          <p className="text-sm text-gray-500 mt-1">
            {stats.completedWorkouts} completed sessions
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">User Growth</h2>
          <div className="h-64 flex items-end justify-between">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-blue-500 w-12" 
                  style={{ 
                    height: `${(index + 1) * 30}px`,
                    minHeight: '20px'
                  }}
                ></div>
                <p className="text-xs mt-2">{month}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Workout Popularity</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Strength Training</span>
                <span className="text-sm font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">HIIT</span>
                <span className="text-sm font-medium">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Yoga</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Other</span>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStats;