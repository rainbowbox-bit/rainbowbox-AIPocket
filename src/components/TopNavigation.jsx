import React from 'react';
import { NavLink } from 'react-router-dom';
import { Rocket, Sparkles } from 'lucide-react';
import './TopNavigation.css';

const TopNavigation = () => {
    return (
        <nav className="top-navigation">
            <div className="nav-container">
                <NavLink
                    to="/toolbox"
                    className={({ isActive }) => `top-nav-item ${isActive ? 'active' : ''}`}
                >
                    <Rocket size={18} />
                    <span>自製 AI 工具</span>
                </NavLink>
                <NavLink
                    to="/common-ai"
                    className={({ isActive }) => `top-nav-item ${isActive ? 'active' : ''}`}
                >
                    <Sparkles size={18} />
                    <span>常用 AI 工具箱</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default TopNavigation;
