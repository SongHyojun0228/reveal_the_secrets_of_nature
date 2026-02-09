import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { useTheme } from "./ThemeContext";

import MainApp from './pages/MainApp';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { Analytics } from "@vercel/analytics/react"

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
        <Link to="/blog" style={linkStyle}>꿈 해몽 가이드</Link>
        <Link to="/about" style={linkStyle}>서비스 소개</Link>
        <Link to="/faq" style={linkStyle}>FAQ</Link>
      </nav>

      <main style={{ width: '100%' }}> {/* 너비 100% 추가 */}
        <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>

      <footer style={footerStyle}>
        <div style={{ marginBottom: '10px' }}>
          <Link to="/privacy" style={linkStyle}>개인정보처리방침</Link>
          {' | '}
          <Link to="/terms" style={linkStyle}>이용약관</Link>
          {' | '}
          <Link to="/contact" style={linkStyle}>연락처</Link>
        </div>
        <div>
          © 2024 천기누설. All Rights Reserved.
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;
