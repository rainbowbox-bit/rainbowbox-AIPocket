import React, { useState, useMemo } from 'react';
import { SPREADSHEET_ID } from './data/config';
import useGoogleSheet from './hooks/useGoogleSheet';
import Sidebar from './components/Sidebar';
import Card from './components/Card';
import './App.css';

function App() {
  const { data, loading, error } = useGoogleSheet(SPREADSHEET_ID);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Extract unique categories
  const categories = useMemo(() => {
    if (!data) return [];
    // Categories are now derived from Sheet Names via the hook
    const allCats = new Set(data.map(item => item.Category).filter(Boolean));
    return Array.from(allCats); // Keep order from Sheets if possible, or .sort()
  }, [data]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (!data) return [];
    return data.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.Category === activeCategory;
      const matchesSearch = (item.Title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (item.Tags?.toLowerCase() || '').includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, activeCategory, searchTerm]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading your Kawaii world...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong 🙈</h2>
        <p>{error.message}</p>
        <p>Check your Spreadsheet ID in <code>src/data/config.js</code></p>
      </div>
    );
  }

  // Demo Data Fallback if Sheet is empty/default
  const displayItems = data.length > 0 ? filteredItems : [
    { Category: 'Demo', Title: 'Welcome!', Description: 'This is a demo card. Connect your Google Sheet to see real data.', URL: '#', Tags: 'Demo, Welcome' },
    { Category: 'Demo', Title: 'Customize Me', Description: 'Edit src/data/config.js to add your CSV URL.', URL: '#', Tags: 'Config' }
  ];

  const displayCategories = categories.length > 0 ? categories : ['Demo'];

  return (
    <div className="app-container">
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
