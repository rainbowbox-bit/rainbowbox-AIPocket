import React from 'react';
import { X, Menu, Grid, Heart, BookOpen, Users, FolderOpen } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/config';
import './Sidebar.css';

const Sidebar = ({ categories, activeCategory, onSelectCategory, mobileOpen, setMobileOpen }) => {

    // Helper to pick an icon for categories (optional fun touch)
    const getIconForCategory = (cat) => {
        if (cat.includes('備課') || cat.includes('教學')) return <BookOpen size={18} />;
        if (cat.includes('特教') || cat.includes('愛')) return <Heart size={18} />;
        if (cat.includes('行政') || cat.includes('園務')) return <FolderOpen size={18} />;
        if (cat.includes('溝通') || cat.includes('親師')) return <Users size={18} />;
        return <Grid size={18} />;
    };

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
                    <h2>分類與過濾</h2>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <p className="nav-label">工具分類</p>

                        <button
                            className={`nav-item ${activeCategory === 'All' ? 'active' : ''}`}
                            onClick={() => {
                                onSelectCategory('All');
                                setMobileOpen(false);
                            }}
                        >
                            <Grid size={18} />
                            <span>全部顯示</span>
                        </button>

                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`nav-item ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => {
                                    onSelectCategory(cat);
                                    setMobileOpen(false);
                                }}
                            >
                                {getIconForCategory(cat)}
                                <span>{cat}</span>
                            </button>
                        ))}
                    </div>

                    <div className="nav-group" style={{ marginTop: 'auto' }}>
                        <p className="nav-label">袋鼠老師的連結</p>
                        <a href={SOCIAL_LINKS.vocus} target="_blank" rel="noopener noreferrer" className="nav-item">
                            <span>📖 幼教老師心裡話</span>
                        </a>
                        <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="nav-item">
                            <span>👍 FB 粉絲專頁</span>
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
