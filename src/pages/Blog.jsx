import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts, categories } from '../data/blogPosts';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const pageStyle = {
    padding: '20px',
    color: 'var(--text-color)',
  };

  const headingStyle = {
    borderBottom: '2px solid var(--text-color)',
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const categoryTabStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap',
  };

  const tabButtonStyle = (isActive) => ({
    padding: '8px 16px',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    backgroundColor: isActive ? '#4a90e2' : 'transparent',
    color: isActive ? '#ffffff' : 'var(--text-color)',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: isActive ? 'bold' : 'normal',
  });

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  };

  const cardStyle = {
    border: '1px solid var(--border-color)',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '2px 2px 8px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  };

  const categoryBadgeStyle = {
    display: 'inline-block',
    padding: '4px 8px',
    fontSize: '0.85em',
    backgroundColor: 'var(--link-color)',
    color: '#fff',
    borderRadius: '3px',
    marginBottom: '10px',
  };

  const titleStyle = {
    fontSize: '1.3em',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: 'var(--text-color)',
  };

  const excerptStyle = {
    color: 'var(--text-color)',
    opacity: 0.8,
    marginBottom: '10px',
    lineHeight: '1.6',
  };

  const dateStyle = {
    fontSize: '0.9em',
    color: 'var(--text-color)',
    opacity: 0.6,
  };

  const linkStyle = {
    color: 'var(--link-color)',
    textDecoration: 'underline',
  };

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <div style={pageStyle}>
      <Helmet>
        <title>꿈 해몽 가이드 - 천기누설</title>
        <meta name="description" content="다양한 꿈의 의미를 해석하는 완벽한 꿈 해몽 가이드. 동물, 자연, 사람, 태몽 등 30개의 상세한 꿈 해몽 글을 제공합니다." />
        <meta name="keywords" content="꿈해몽, 꿈 해석, 태몽, 동물 꿈, AI 꿈해몽, 무료 꿈해몽" />
      </Helmet>

      <h1 style={headingStyle}>꿈 해몽 가이드</h1>

      <p style={{ marginBottom: '20px', lineHeight: '1.8' }}>
        꿈은 우리의 무의식이 전하는 메시지입니다. 다양한 꿈의 상징과 의미를 탐구하고,
        당신의 꿈이 무엇을 말하고 있는지 알아보세요.
      </p>

      <div style={categoryTabStyle}>
        <button
          style={tabButtonStyle(selectedCategory === 'all')}
          onClick={() => setSelectedCategory('all')}
        >
          전체 ({blogPosts.length})
        </button>
        {categories.map(category => {
          const count = blogPosts.filter(post => post.category === category.id).length;
          return (
            <button
              key={category.id}
              style={tabButtonStyle(selectedCategory === category.id)}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({count})
            </button>
          );
        })}
      </div>

      <div style={cardContainerStyle}>
        {filteredPosts.map(post => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={cardStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '4px 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '2px 2px 8px rgba(0,0,0,0.05)';
              }}
            >
              <div style={categoryBadgeStyle}>{getCategoryName(post.category)}</div>
              <h2 style={titleStyle}>{post.title}</h2>
              <p style={excerptStyle}>{post.excerpt}</p>
              <p style={dateStyle}>{post.createdAt}</p>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <p style={{ marginBottom: '10px' }}>
          더 정확한 꿈 해몽을 원하신다면?
        </p>
        <Link to="/" style={linkStyle}>AI 꿈 해몽 서비스 이용하기</Link>
      </div>

      <p style={{ marginTop: '30px' }}>
        <Link to="/" style={linkStyle}>메인으로 돌아가기</Link>
      </p>
    </div>
  );
};

export default Blog;
