import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useTheme } from "./ThemeContext";

import MainApp from './pages/MainApp';
import About from './pages/About';
import FAQ from './pages/FAQ';

function App() {
  const { theme } = useTheme();

  const navStyle = {
    padding: '10px 20px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    background: 'var(--bg-color)',
    width: '100%', // 너비 100% 추가
  };

  const linkStyle = {
    color: 'var(--text-color)',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  };

  const footerStyle = {
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
    borderTop: '1px solid var(--border-color)',
    fontSize: '0.9rem',
    color: 'var(--text-color-light)',
    width: '100%', // 너비 100% 추가
  };

  return (
    <div className={"korean-vibe-container " + theme}>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>홈</Link>
        <Link to="/about" style={linkStyle}>서비스 소개</Link>
        <Link to="/faq" style={linkStyle}>자주 묻는 질문</Link>
      </nav>

      <main style={{ width: '100%' }}> {/* 너비 100% 추가 */}
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </main>

      <footer style={footerStyle}>
        © 2024 천기누설. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
