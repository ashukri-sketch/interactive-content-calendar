/**
 * MAIN APP — MULTI-PAGE CONTENT CALENDAR
 * React Router setup with all 9 pages and animations
 */

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TopNavBar } from './components/navigation/TopNavBar';
import { AnimatePresence } from 'motion/react';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CalendarPage } from './pages/CalendarPage';
import { CampaignDetailPage } from './pages/CampaignDetailPage';
import { TasksPage } from './pages/TasksPage';
import { TeamPage } from './pages/TeamPage';
import { SettingsPage } from './pages/SettingsPage';
import { ChatPage } from './pages/ChatPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { DesignSystemPage } from './pages/DesignSystemPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen relative">
      {/* Tahoe Animated Background Orbs */}
      {isAuthenticated && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="tahoe-orb-primary" style={{ top: '10%', left: '5%' }} />
          <div className="tahoe-orb-secondary" style={{ bottom: '15%', right: '10%' }} />
          <div className="tahoe-orb-accent" style={{ top: '50%', right: '20%' }} />
        </div>
      )}
      
      <div className="relative z-10">
        {isAuthenticated && <TopNavBar />}
        {children}
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/calendar" element={
        <ProtectedRoute>
          <CalendarPage />
        </ProtectedRoute>
      } />
      
      <Route path="/campaign/:id" element={
        <ProtectedRoute>
          <CampaignDetailPage />
        </ProtectedRoute>
      } />
      
      <Route path="/tasks" element={
        <ProtectedRoute>
          <TasksPage />
        </ProtectedRoute>
      } />
      
      <Route path="/team" element={
        <ProtectedRoute>
          <TeamPage />
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/chat" element={
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      } />
      
      <Route path="/analytics" element={
        <ProtectedRoute>
          <AnalyticsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/design-system" element={
        <ProtectedRoute>
          <DesignSystemPage />
        </ProtectedRoute>
      } />
      
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppLayout>
            <AnimatePresence mode="wait">
              <AppRoutes />
            </AnimatePresence>
          </AppLayout>
        </AuthProvider>
      </ThemeProvider>
    </HashRouter>
  );
}