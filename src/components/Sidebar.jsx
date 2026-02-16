import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Rocket, Sparkles, Facebook, Highlighter } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/config';
import './Sidebar.css';

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
    return (
        <>
            <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <X /> : <Menu />}
            </button>

            <div className={`sidebar glass ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <div className="brand-icon">🦘</div>
                    <h2>袋鼠老師</h2>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <p className="nav-label">資源庫</p>
                        <NavLink
                            to="/toolbox"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            <Rocket size={18} />
                            <span>AI 工具箱</span>
                        </NavLink>
                        <NavLink
                            to="/common-ai"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setMobileOpen(false)}
                        >
                            <Sparkles size={18} />
                            <span>常用 AI 工具</span>
                        </NavLink>
                    </div>

                    <div className="nav-group">
                        <p className="nav-label">個人連結</p>
                        <a href={SOCIAL_LINKS.vocus} target="_blank" rel="noopener noreferrer" className="nav-item">
                            <Highlighter size={18} />
                            <span>幼教老師心裡話</span>
                        </a>
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="nav-item">
                            <Facebook size={18} />
                            <span>FB 粉絲專頁</span>
                        </a>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <p>© 2026 Crafted with <br />袋鼠老師陪你幼教有愛 🦘💖</p>
                </div>
            </div>

            {mobileOpen && (
                <div className="overlay" onClick={() => setMobileOpen(false)} />
            )}
        </>
    );
};

export default Sidebar;
