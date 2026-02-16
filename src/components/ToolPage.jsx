import React, { useState, useMemo } from 'react';
import useGoogleSheet from '../hooks/useGoogleSheet';
import Card from './Card';

const ToolPage = ({ csvUrl, title }) => {
    const { data, loading, error } = useGoogleSheet(csvUrl);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const normalizedData = useMemo(() => {
        if (!data) return [];
        return data.map(item => ({
            category: item.Category || item.category || '未分類',
            title: item.Title || item.title || item.Name || '無標題',
            url: item.URL || item.url || item.Url || item.ToolURL || '#',
            description: item.Description || item.description || '',
            image: item.ImageURL || item.imageurl || item.Image || item.image || '',
            tags: item.Tags || item.tags || ''
        })).filter(item => item.title !== '無標題');
    }, [data]);

    const categories = useMemo(() => {
        const allCats = new Set(normalizedData.map(item => item.category));
        return Array.from(allCats).sort();
    }, [normalizedData]);

    const filteredItems = useMemo(() => {
        return normalizedData.filter(item => {
            const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [normalizedData, activeCategory, searchTerm]);

    if (loading) return <div className="loading-container"><div className="loading-spinner"></div><p>正在加載資源...</p></div>;
    if (error) return <div className="error-container"><h2>加載失敗 🙈</h2><p>{error.message}</p></div>;

    const displayItems = filteredItems;
    const displayCategories = categories;

    return (
        <div className="tool-page-content">
            <header className="page-header">
                <div className="header-text">
                    <h2>{title}</h2>
                    <div className="category-tabs">
                        <button
                            className={`category-tab ${activeCategory === 'All' ? 'active' : ''}`}
                            onClick={() => setActiveCategory('All')}
                        >
                            全部
                        </button>
                        {displayCategories.map(cat => (
                            <button
                                key={cat}
                                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
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

            <div className="bento-grid">
                {displayItems.map((item, index) => (
                    <Card key={index} {...item} />
                ))}
                {displayItems.length === 0 && (
                    <div className="empty-state">
                        <p>找不到符合條件的工具 🌸</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolPage;
