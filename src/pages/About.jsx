import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const pageStyle = {
    padding: '20px',
    lineHeight: '1.8',
    color: 'var(--text-color)',
  };
  const headingStyle = {
    borderBottom: '2px solid var(--text-color)',
    paddingBottom: '10px',
    marginBottom: '20px',
  };
  const paragraphStyle = {
    marginBottom: '15px',
  };
  const linkStyle = {
    color: 'var(--link-color)',
    textDecoration: 'underline',
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>서비스 소개</h1>
      <h2 style={headingStyle}>주요 기능</h2>
      <ul>
        <li><strong>AI 꿈 해몽:</strong> 사용자가 입력한 꿈 내용을 바탕으로, AI가 상징, 맥락, 감정 등을 종합적으로 분석하여 상세한 해몽 결과를 제공합니다. 단순한 키워드 검색을 넘어, 꿈의 전체적인 스토리를 이해하고 해석합니다.</li>
        <li><strong>정통 사주 풀이:</strong> 생년월일시를 기반으로 음양오행을 분석하여 타고난 성격, 재물운, 애정운 등 인생 전반에 걸친 운세 흐름을 알려드립니다.</li>
        <li><strong>포인트 시스템:</strong> 합리적인 가격으로 서비스를 이용하실 수 있도록 포인트 제도를 운영하고 있습니다. 간단한 맛보기는 무료로 제공되며, 더 상세한 풀이를 원하실 경우 포인트를 사용하여 잠금을 해제할 수 있습니다.</li>
      </ul>
      <p style={paragraphStyle}>
        저희는 사용자의 프라이버시를 존중하며, 입력된 모든 정보는 안전하게 관리됩니다.
        앞으로도 지속적인 데이터 업데이트와 알고리즘 개선을 통해 더 정확하고 만족스러운 서비스를 제공하기 위해 노력하겠습니다.
      </p>
      <Link to="/" style={linkStyle}>메인으로 돌아가기</Link>
    </div>
  );
};

export default About;
