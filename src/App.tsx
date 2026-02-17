
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/layout/Navigation';
import { DashboardPage } from './components/pages/DashboardPage';
import { SavedPage } from './components/pages/SavedPage';
import { DigestPage } from './components/pages/DigestPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { ProofPage } from './components/pages/ProofPage';
import './components/layout/AppLayout.css'; // Re-use layout styles if applicable

function App() {
  return (
    <Router>
      <div className="app-layout" style={{ paddingTop: '64px' }}>
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/digest" element={<DigestPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/proof" element={<ProofPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
