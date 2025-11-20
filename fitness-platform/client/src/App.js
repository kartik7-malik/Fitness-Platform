import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth Components
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// User Dashboard Components
import UserDashboard from './pages/User/Dashboard';
import UserProfile from './pages/User/Profile';
import WorkoutList from './pages/User/WorkoutList';
import WorkoutDetail from './pages/User/WorkoutDetail';
import ProgressTracker from './pages/User/ProgressTracker';

// Trainer Dashboard Components
import TrainerDashboard from './pages/Trainer/Dashboard';
import TrainerProfile from './pages/Trainer/Profile';
import CreateWorkout from './pages/Trainer/CreateWorkout';
import ManageWorkouts from './pages/Trainer/ManageWorkouts';
import ClientProgress from './pages/Trainer/ClientProgress';

// Admin Dashboard Components
import AdminDashboard from './pages/Admin/Dashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ManageTrainers from './pages/Admin/ManageTrainers';
import WorkoutApprovals from './pages/Admin/WorkoutApprovals';
import SystemStats from './pages/Admin/SystemStats';

// Context Provider
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* User Routes */}
              <Route 
                path="/user/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <UserDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user/profile" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <UserProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user/workouts" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <WorkoutList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user/workouts/:id" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <WorkoutDetail />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/user/progress" 
                element={
                  <ProtectedRoute allowedRoles={['user']}>
                    <ProgressTracker />
                  </ProtectedRoute>
                } 
              />
              
              {/* Trainer Routes */}
              <Route 
                path="/trainer/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['trainer']}>
                    <TrainerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trainer/profile" 
                element={
                  <ProtectedRoute allowedRoles={['trainer']}>
                    <TrainerProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trainer/workouts/create" 
                element={
                  <ProtectedRoute allowedRoles={['trainer']}>
                    <CreateWorkout />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trainer/workouts" 
                element={
                  <ProtectedRoute allowedRoles={['trainer']}>
                    <ManageWorkouts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/trainer/clients/:id/progress" 
                element={
                  <ProtectedRoute allowedRoles={['trainer']}>
                    <ClientProgress />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Routes */}
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/users" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageUsers />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/trainers" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <ManageTrainers />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/workouts/approvals" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <WorkoutApprovals />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/stats" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <SystemStats />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer />
      </Router>
    </AuthProvider>
  );
}

export default App;