import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogPosts, categories } from '../data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    // Kakao SDK 초기화
    if (!window.Kakao?.isInitialized()) {
      window.Kakao?.init(import.meta.env.VITE_KAKAO_KEY || 'YOUR_KAKAO_KEY');
    }
  }, []);

  const pageStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    color: 'var(--text-color)',
    lineHeight: '1.8',
  };

  const headingStyle = {
    borderBottom: '2px solid var(--text-color)',
    paddingBottom: '10px',
    marginBottom: '20px',
  };

  const categoryBadgeStyle = {
    display: 'inline-block',
    padding: '6px 12px',
    fontSize: '0.9em',
    backgroundColor: 'var(--link-color)',
    color: '#fff',
    borderRadius: '4px',
    marginBottom: '15px',
  };

  const metaStyle = {
    color: 'var(--text-color)',
    opacity: 0.7,
    fontSize: '0.9em',
    marginBottom: '30px',
  };

  const contentStyle = {
    marginTop: '30px',
    marginBottom: '40px',
  };

  const keywordsStyle = {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
  };

  const keywordTagStyle = {
    display: 'inline-block',
    padding: '4px 10px',
    margin: '5px',
    backgroundColor: 'var(--link-color)',
    color: '#fff',
    borderRadius: '3px',
    fontSize: '0.85em',
  };

  const relatedPostsStyle = {
    marginTop: '50px',
    padding: '20px',
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
  };

  const relatedCardStyle = {
    padding: '15px',
    marginTop: '15px',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const shareButtonStyle = {
    padding: '10px 20px',
    marginRight: '10px',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    backgroundColor: '#FEE500',
    color: '#000',
    cursor: 'pointer',
    fontSize: '1em',
  };

  const linkStyle = {
    color: 'var(--link-color)',
    textDecoration: 'underline',
  };

  if (!post) {
    return (
      <div style={pageStyle}>
        <h1>글을 찾을 수 없습니다</h1>
        <p>
          <Link to="/blog" style={linkStyle}>블로그 목록으로 돌아가기</Link>
        </p>
      </div>
    );
  }

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getRelatedPosts = () => {
    return blogPosts
      .filter(p => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  };

  const shareToKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      return alert("카카오 SDK가 로드되지 않았습니다.");
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: post.title,
        description: post.excerpt,
        imageUrl: 'https://reveal-the-secrets-of-nature.vercel.app/og-image.png', // OG 이미지가 있다면 경로 수정
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  const relatedPosts = getRelatedPosts();

  return (
    <div style={pageStyle}>
      <Helmet>
        <title>{post.title} - 천기누설</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      <div style={categoryBadgeStyle}>{getCategoryName(post.category)}</div>

      <h1 style={headingStyle}>{post.title}</h1>

      <div style={metaStyle}>
        작성일: {post.createdAt}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          style={shareButtonStyle}
          onClick={shareToKakao}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFD700'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FEE500'}
        >
          카카오톡 공유하기
        </button>
      </div>

      <div style={contentStyle}>
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '15px', whiteSpace: 'pre-wrap' }}>
            {paragraph}
          </p>
        ))}
      </div>

      <div style={keywordsStyle}>
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>관련 키워드</h3>
        {post.keywords.map((keyword, index) => (
          <span key={index} style={keywordTagStyle}>#{keyword}</span>
        ))}
      </div>

      {relatedPosts.length > 0 && (
        <div style={relatedPostsStyle}>
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>관련 글</h3>
          {relatedPosts.map(relatedPost => (
            <Link
              key={relatedPost.id}
              to={`/blog/${relatedPost.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={relatedCardStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <h4 style={{ margin: '0 0 8px 0', color: 'var(--text-color)' }}>
                  {relatedPost.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9em', color: 'var(--text-color)', opacity: 0.7 }}>
                  {relatedPost.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <p style={{ marginBottom: '15px', fontSize: '1.1em' }}>
          내 꿈의 정확한 의미가 궁금하신가요?
        </p>
        <Link to="/" style={linkStyle}>AI 꿈 해몽 서비스 이용하기</Link>
      </div>

      <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
        <Link to="/blog" style={linkStyle}>← 블로그 목록으로 돌아가기</Link>
        {' | '}
        <Link to="/" style={linkStyle}>메인으로 돌아가기</Link>
      </div>
    </div>
  );
};

export default BlogPost;
