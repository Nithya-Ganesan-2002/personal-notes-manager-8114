import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import './design.css';
import brandLogo from './assets/media/accoodo-logo.png';

/**
 * AppHeader component renders the top application bar with brand, search, and actions.
 * Provides ARIA labels and keyboard-accessible controls.
 */
function AppHeader() {
  const [query, setQuery] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // No-op for now; in future integrate with search
  };

  return (
    <header className="app-header" role="banner" aria-label="Application Header">
      <div className="brand" aria-label="AcooDo">
        <img
          src={brandLogo}
          className="brand-logo"
          alt="AcooDo logo"
          width="24"
          height="24"
        />
        <span className="brand-text">AcooDo</span>
      </div>
      <div className="header-search">
        <form className="search-box" role="search" onSubmit={onSubmit} aria-label="Global search">
          <span className="icon" aria-hidden="true">🔍</span>
          <input
            className="search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      <div className="header-actions" aria-label="Header actions">
        <button className="icon-btn" aria-label="Notifications">🔔</button>
        <button className="icon-btn" aria-label="Help">❓</button>
        <button className="icon-btn" aria-label="App switcher">🔳</button>
        <button className="icon-btn" aria-label="Settings">⚙️</button>
        <button className="icon-btn" aria-label="User profile">👤</button>
      </div>
    </header>
  );
}

/**
 * PrimarySidebar renders the compact left icon bar.
 */
function PrimarySidebar() {
  const icons = [
    { id: 'home', label: 'Home', glyph: '🏠' },
    { id: 'notes', label: 'Notes', glyph: '🗒️' },
    { id: 'teams', label: 'Teams', glyph: '👥' },
    { id: 'calendar', label: 'Calendar', glyph: '📅' },
    { id: 'chat', label: 'Messages', glyph: '💬' },
    { id: 'settings', label: 'Settings', glyph: '⚙️', active: true },
  ];
  return (
    <nav className="primary-sidebar" aria-label="Primary">
      {icons.map(it => (
        <div
          key={it.id}
          className={`primary-icon${it.active ? ' active' : ''}`}
          role="button"
          title={it.label}
          aria-label={it.label + (it.active ? ' (active)' : '')}
          tabIndex={0}
        >
          <span aria-hidden="true">{it.glyph}</span>
        </div>
      ))}
    </nav>
  );
}

/**
 * SettingsSidebar renders the secondary settings navigation.
 */
function SettingsSidebar() {
  const items = [
    { id: 'general', icon: '⚙️', label: 'General' },
    { id: 'tags', icon: '🏷️', label: 'Tags' },
    { id: 'notifications', icon: '🔔', label: 'Notifications', active: true },
    { id: 'customization', icon: '🎨', label: 'Customization' },
    { id: 'advanced', icon: '🛠️', label: 'Advanced' },
    { id: 'integrations', icon: '🔗', label: 'Integrations' },
  ];
  return (
    <nav className="settings-sidebar" aria-label="Settings">
      <div className="settings-title">Settings</div>
      <div className="settings-nav">
        {items.map(it => (
          <div
            key={it.id}
            className={`settings-item${it.active ? ' active' : ''}`}
            role="button"
            aria-current={it.active ? 'page' : undefined}
            aria-label={it.label + (it.active ? ' (current)' : '')}
            tabIndex={0}
          >
            <span className="icon" aria-hidden="true">{it.icon}</span>
            <span className="label">{it.label}</span>
            <span className="chev" aria-hidden="true">›</span>
          </div>
        ))}
      </div>
    </nav>
  );
}

/**
 * ContentTabs renders the small context bar tabs.
 */
function ContentTabs() {
  return (
    <div className="context-bar" role="tablist" aria-label="Context tabs">
      <div className="tab active" role="tab" aria-selected="true" tabIndex={0}>Notifications</div>
    </div>
  );
}

/**
 * ToggleRow renders an accessible ON/OFF switch with label.
 */
// PUBLIC_INTERFACE
function ToggleRow({ id, checked, onChange, label }) {
  /** This is a public function component that renders an accessible toggle row. */
  const onKeyDown = useCallback((e) => {
    if (['Enter', ' '].includes(e.key) || e.key === 'Spacebar' || e.key === 'Space') {
      e.preventDefault();
      onChange(!checked);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(false);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onChange(true);
    }
  }, [checked, onChange]);

  return (
    <div className="toggle-row">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`switch-btn${checked ? ' on' : ''}`}
        onClick={() => onChange(!checked)}
        onKeyDown={onKeyDown}
      >
        <span className="switch-thumb" aria-hidden="true" />
      </button>
      <label htmlFor={id} className="toggle-label">{label}</label>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Main application entry that composes the Settings > Notifications page layout. */
  const [theme, setTheme] = useState('light');
  const [statusSharing, setStatusSharing] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app">
      <AppHeader />
      <aside className="sidebar" aria-label="Sidebars">
        <PrimarySidebar />
        <SettingsSidebar />
      </aside>
      <main className="content" role="main">
        <ContentTabs />
        <section className="notifications" aria-labelledby="notif-title">
          <h2 id="notif-title">Notifications</h2>
          <ToggleRow
            id="status-sharing"
            checked={statusSharing}
            onChange={setStatusSharing}
            label="Enable Status Sharing"
          />
        </section>
      </main>

      {/* Keep theme toggle as an accessible utility, positioned fixed for now */}
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
    </div>
  );
}

export default App;
