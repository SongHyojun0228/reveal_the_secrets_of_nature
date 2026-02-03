import React from 'react';

const WelcomeSection = () => {
  const sectionStyle = {
    width: '100%',
    padding: '20px',
    marginBottom: '2rem',
    background: 'rgba(0, 0, 0, 0.02)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    textAlign: 'left',
    lineHeight: '1.7',
    boxSizing: 'border-box', // box-sizing 추가
  };

  const headingStyle = {
    textAlign: 'center',
    fontSize: '1.3rem',
    marginBottom: '15px',
    color: 'var(--accent-color)',
  };

  const pStyle = {
    fontSize: '0.95rem',
  }

  return (
    <div style={sectionStyle}>
      {/* About.jsx에서 이동된 내용 시작 */}
      <h2 style={headingStyle}>AI가 풀어주는 꿈과 사주의 비밀</h2>
      <p style={pStyle}>
        <strong>천기누설 AI 꿈 해몽 & 사주 풀이</strong>에 오신 것을 환영합니다.
      </p>
      <p style={pStyle}>
        저희 서비스는 최신 인공지능(AI) 기술과 전통적인 동양 철학 데이터를 결합하여 사용자 여러분의 꿈과 사주에 대한 깊이 있는 해석을 제공합니다. 
        밤새 꾼 꿈이 어떤 의미를 담고 있는지, 나의 사주에는 어떤 비밀이 숨겨져 있는지 궁금하셨나요? 천기누설이 그 궁금증을 풀어드립니다.
      </p>
      {/* About.jsx에서 이동된 내용 끝 */}
      <p style={pStyle}>
        🔮 <strong>'천기누설'에 오신 것을 환영합니다!</strong><br />
        이곳은 최신 AI 기술을 통해 당신의 꿈과 사주 속에 숨겨진 의미를 찾아드리는 공간입니다.
      </p>
      <br/>
      <p style={pStyle}>
        <strong>👉 이용 방법:</strong><br />
        1. 상단의 '꿈 해몽' 또는 '사주 풀이' 탭을 선택하세요.<br />
        2. 꿈 해몽을 원하시면 간밤에 꾼 꿈의 내용을, 사주가 궁금하면 사주 정보를 입력하세요.<br />
        3. '무료로 맛보기'를 통해 AI의 간단한 분석을 확인하고, 더 깊이 있는 해석이 궁금하다면 '상세 풀이'를 이용해 보세요!
      </p>
    </div>
  );
};

export default WelcomeSection;