import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TOOLBOX_CSV_URL, COMMON_AI_CSV_URL } from './data/config';
import ToolPage from './components/ToolPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Background Decorative Shapes */}
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>

        {/* Route Definitions 
            Each route renders ToolPage with specific config.
            ToolPage handles the Sidebar and TopNav internally.
        */}
        <Routes>
          <Route
            path="/toolbox"
            element={<ToolPage csvUrl={TOOLBOX_CSV_URL} title="袋鼠老師的自製 AI 工具" />}
          />
          <Route
            path="/common-ai"
            element={<ToolPage csvUrl={COMMON_AI_CSV_URL} title="常用 AI 工具箱" />}
          />
          <Route path="/" element={<Navigate to="/toolbox" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
