import React, { useState, useMemo } from 'react';
import { PUBLISHED_CSV_URL } from './data/config';
import useGoogleSheet from './hooks/useGoogleSheet';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import './App.css';

function App() {
  const { data, loading, error } = useGoogleSheet(PUBLISHED_CSV_URL);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 正規化資料：將標題轉換為小寫以防萬一
  const normalizedData = useMemo(() => {
    if (!data) return [];
    return data.map(item => ({
      category: item.Category || item.category || '未分類',
      title: item.Title || item.title || '無標題',
      url: item.URL || item.url || item.Url || '#',
      description: item.Description || item.description || '',
      image: item.ImageURL || item.imageurl || item.Image || item.image || '',
      tags: item.Tags || item.tags || ''
    })).filter(item => item.title !== '無標題'); // 過濾掉空行
  }, [data]);

  // 提取不重複的分類
  const categories = useMemo(() => {
    const allCats = new Set(normalizedData.map(item => item.category));
    return Array.from(allCats).sort();
  }, [normalizedData]);

  // 過濾項目
  const filteredItems = useMemo(() => {
    return normalizedData.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [normalizedData, activeCategory, searchTerm]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>正在從魔法口袋翻找資料...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>哎呀！口袋卡住了 🙈</h2>
        <p>請確認您的試算表已「發布至網路」並選擇為「CSV」格式。</p>
        <p style={{ fontSize: '0.8rem', marginTop: '10px', opacity: 0.7 }}>{error.message}</p>
      </div>
    );
  }

  // 如果資料庫是空的，顯示範例
  const displayItems = normalizedData.length > 0 ? filteredItems : [
    { category: '說明', title: '歡迎來到魔法口袋！', description: '請在 Google Sheet 中填入資料，網頁就會自動更新喔！', url: '#', tags: '教學, 開始' }
  ];

  const displayCategories = categories.length > 0 ? categories : ['說明'];

  return (
    <div className="app-container">
      {/* Fixed Top Bar */}
      <div className="top-bar">
        <h1>袋鼠老師的幼教魔法AI口袋</h1>
      </div>

      <Sidebar
        categories={displayCategories}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="app-main">
        <div className="content-wrapper">
          <header className="content-header">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search magic..."
              className="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </header>

          <div className="card-grid">
            {displayItems.map((item, index) => (
              <Card key={index} {...item} />
            ))}
          </div>

          {displayItems.length === 0 && (
            <div className="empty-state">
              <p>No items found in this category 🌸</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
