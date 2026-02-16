import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TOOLBOX_CSV_URL, COMMON_AI_CSV_URL } from './data/config';
import Sidebar from './components/Sidebar';
import ToolPage from './components/ToolPage';
import './App.css';

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <Router>
      <div className="app-container">
        {/* Background Decorative Shapes */}
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>

        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        <main className="app-main">
          <Routes>
            <Route
              path="/toolbox"
              element={<ToolPage csvUrl={TOOLBOX_CSV_URL} title="袋鼠老師的幼教魔法AI口袋" />}
            />
            <Route
              path="/common-ai"
              element={<ToolPage csvUrl={COMMON_AI_CSV_URL} title="常用 AI 工具" />}
            />
            <Route path="/" element={<Navigate to="/toolbox" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
