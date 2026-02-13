import React from 'react';
import { Menu, X, FolderHeart } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ categories, activeCategory, onSelectCategory, mobileOpen, setMobileOpen }) => {
    return (
        <>
            <button
                className="mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <X /> : <Menu />}
            </button>

            <div className={`sidebar ${mobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>My Space</h2>
                </div>

                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeCategory === 'All' ? 'active' : ''}`}
                        onClick={() => {
                            onSelectCategory('All');
                            setMobileOpen(false);
                        }}
                    >
                        <FolderHeart size={18} />
                        <span>All Everything</span>
                    </button>

                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`nav-item ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => {
                                onSelectCategory(cat);
                                setMobileOpen(false);
                            }}
                        >
                            <FolderHeart size={18} style={{ opacity: 0.5 }} />
                            <span>{cat}</span>
                        </button>
                    ))}
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
