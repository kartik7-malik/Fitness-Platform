import React from 'react';

const ClientProgress = () => {
  // Mock data
  const clients = [
    {
      id: 1,
      name: 'Alice Johnson',
      workoutsCompleted: 15,
      progress: 75,
      lastActive: '2023-04-10'
    },
    {
      id: 2,
      name: 'Bob Smith',
      workoutsCompleted: 8,
      progress: 40,
      lastActive: '2023-04-12'
    },
    {
      id: 3,
      name: 'Carol Davis',
      workoutsCompleted: 22,
      progress: 90,
      lastActive: '2023-04-15'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Client Progress</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {clients.map(client => (
          <div key={client.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{client.name}</h2>
              
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{client.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${client.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <div>
                  <p className="font-medium text-gray-700">{client.workoutsCompleted}</p>
                  <p>Workouts</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">{new Date(client.lastActive).toLocaleDateString()}</p>
                  <p>Last Active</p>
                </div>
              </div>
              
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-medium">Alice Johnson completed "Full Body Strength"</p>
              <p className="text-sm text-gray-500">Today, 10:30 AM</p>
            </div>
            
            <div className="border-l-4 border-yellow-500 pl-4 py-2">
              <p className="font-medium">Bob Smith missed scheduled workout "HIIT Cardio"</p>
              <p className="text-sm text-gray-500">Yesterday, 6:00 PM</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <p className="font-medium">Carol Davis achieved weight goal (70kg)</p>
              <p className="text-sm text-gray-500">Apr 14, 2023</p>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <p className="font-medium">Bob Smith completed "Yoga for Beginners"</p>
              <p className="text-sm text-gray-500">Apr 12, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProgress;