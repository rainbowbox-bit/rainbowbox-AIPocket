import React, { useState, useMemo } from 'react';
import useGoogleSheet from '../hooks/useGoogleSheet';
import Card from './Card';
import Sidebar from './Sidebar';
import TopNavigation from './TopNavigation';

const ToolPage = ({ csvUrl, title }) => {
    const { data, loading, error } = useGoogleSheet(csvUrl);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    // Data Normalization
    const normalizedData = useMemo(() => {
        if (!data) return [];
        return data.map(item => {
            const rawCategory = item.Category || item.category || '未分類';
            // Split by comma or slash, then trim whitespace
            const categoryArray = rawCategory.split(/[,\/]/).map(c => c.trim()).filter(c => c !== '');

            return {
                category: categoryArray,
                title: item.Title || item.title || item.Name || '無標題',
                url: item.URL || item.url || item.Url || item.ToolURL || '#',
                description: item.Description || item.description || '',
                image: item.ImageURL || item.imageurl || item.Image || item.image || '',
                tags: item.Tags || item.tags || ''
            };
        }).filter(item => item.title !== '無標題');
    }, [data]);

    // Extract Categories (Individual unique categories)
    const categories = useMemo(() => {
        const allCats = new Set();
        normalizedData.forEach(item => {
            item.category.forEach(cat => allCats.add(cat));
        });
        return Array.from(allCats).sort();
    }, [normalizedData]);

    // Filter Items
    const filteredItems = useMemo(() => {
        return normalizedData.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category.includes(activeCategory);
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [normalizedData, activeCategory, searchTerm]);

    return (
        <div className="page-layout">
            {/* 1. Top Navigation (Global Page Switcher) */}
            <TopNavigation />

            {/* 2. Sidebar (Dynamic Categories) */}
            <Sidebar
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            {/* 3. Main Content Area */}
            <main className={`app-main ${mobileOpen ? 'open' : ''}`}>
                <div className="content-wrapper">
                    <header className="page-header">
                        <div className="header-text">
                            <h2>{title}</h2>
                            <p className="subtitle">
                                {activeCategory === 'All' ? '顯示所有工具' : `分類：${activeCategory}`}
                                ({filteredItems.length})
                            </p>
                        </div>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="搜尋工具..."
                                className="search-bar"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </header>

                    {loading && (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>正在從袋鼠口袋拿出法寶...</p>
                        </div>
                    )}

                    {error && (
                        <div className="error-container">
                            <h2>資料讀取失敗</h2>
                            <p>{error.message}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="bento-grid">
                            {filteredItems.map((item, index) => (
                                <Card key={index} {...item} />
                            ))}
                            {filteredItems.length === 0 && (
                                <div className="empty-state">
                                    <p>這個分類暫時沒有工具喔 🦘</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ToolPage;
