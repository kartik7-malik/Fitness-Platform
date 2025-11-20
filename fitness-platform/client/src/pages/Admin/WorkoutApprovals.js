import React from 'react';

const WorkoutApprovals = () => {
  // Mock data
  const pendingWorkouts = [
    {
      id: 1,
      title: 'Advanced HIIT Circuit',
      trainer: 'Jane Smith',
      submitted: '2023-04-10',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Core Strength Basics',
      trainer: 'John Doe',
      submitted: '2023-04-12',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Flexibility Flow',
      trainer: 'Mike Johnson',
      submitted: '2023-04-15',
      status: 'pending'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Workout Approvals</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Workout</th>
              <th className="py-3 px-6 text-left">Trainer</th>
              <th className="py-3 px-6 text-center">Submitted</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm">
            {pendingWorkouts.map(workout => (
              <tr key={workout.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left">{workout.title}</td>
                <td className="py-3 px-6 text-left">{workout.trainer}</td>
                <td className="py-3 px-6 text-center">{new Date(workout.submitted).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <span className="py-1 px-3 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded mr-2">
                      View
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded mr-2">
                      Approve
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recently Approved</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Workout</th>
                <th className="py-3 px-6 text-left">Trainer</th>
                <th className="py-3 px-6 text-center">Approved Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left">Full Body Strength</td>
                <td className="py-3 px-6 text-left">John Doe</td>
                <td className="py-3 px-6 text-center">Apr 8, 2023</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-6 text-left">Yoga for Beginners</td>
                <td className="py-3 px-6 text-left">Mike Johnson</td>
                <td className="py-3 px-6 text-center">Apr 5, 2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkoutApprovals;