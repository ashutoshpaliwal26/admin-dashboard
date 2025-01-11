import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Products from './pages/Products';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Pricing from './pages/Pricing';
import Settings from './pages/Settings';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

// Mock authentication state
const isAuthenticated = true;

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={isAuthenticated ? <Navigate to="/" /> : <SignUp />}
            />
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <div className="min-h-screen bg-[var(--background-color,#070B16)] text-white">
                    <Sidebar />
                    <div className="ml-64">
                      <Header />
                      <main>
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/analytics" element={<Analytics />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/tasks" element={<Tasks />} />
                          <Route path="/users" element={<Users />} />
                          <Route path="/pricing" element={<Pricing />} />
                          <Route path="/settings" element={<Settings />} />
                        </Routes>
                      </main>
                    </div>
                  </div>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;