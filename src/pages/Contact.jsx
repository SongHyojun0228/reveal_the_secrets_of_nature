import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
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
  const infoBoxStyle = {
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  };

  return (
    <div style={pageStyle}>
      <Helmet>
        <title>연락처 - 천기누설</title>
        <meta name="description" content="천기누설 고객센터 연락처 및 문의 방법을 안내합니다." />
        <meta name="keywords" content="연락처, 고객센터, 문의, 천기누설" />
      </Helmet>

      <h1 style={headingStyle}>연락처</h1>

      <p style={paragraphStyle}>
        천기누설을 이용해 주셔서 감사합니다. 서비스 이용 중 궁금한 사항이나 불편한 점이 있으시면 언제든지 문의해 주시기 바랍니다.
        최선을 다해 신속하고 정확하게 답변드리겠습니다.
      </p>

      <div style={infoBoxStyle}>
        <h2 style={{ ...headingStyle, borderBottom: 'none', marginBottom: '10px' }}>고객센터 정보</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <strong>이메일:</strong> support@cheonginuseol.com
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>운영시간:</strong> 평일 09:00 - 18:00 (주말 및 공휴일 휴무)
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>평균 응답 시간:</strong> 영업일 기준 24시간 이내
          </li>
        </ul>
      </div>

      <h2 style={headingStyle}>자주 묻는 질문</h2>
      <p style={paragraphStyle}>
        문의하시기 전에 <Link to="/faq" style={linkStyle}>FAQ 페이지</Link>를 먼저 확인해 주시면 더 빠르게 해결하실 수 있습니다.
        자주 묻는 질문에 대한 답변을 미리 준비해 두었습니다.
      </p>

      <h2 style={headingStyle}>문의 시 유의사항</h2>
      <ul>
        <li>문의 내용은 가능한 한 구체적으로 작성해 주시기 바랍니다.</li>
        <li>서비스 이용 중 발생한 오류는 스크린샷과 함께 보내주시면 더 정확한 답변을 드릴 수 있습니다.</li>
        <li>개인정보가 포함된 문의는 이메일로만 보내주시기 바랍니다.</li>
        <li>주말 및 공휴일에 접수된 문의는 다음 영업일에 순차적으로 처리됩니다.</li>
      </ul>

      <h2 style={headingStyle}>제휴 및 비즈니스 문의</h2>
      <p style={paragraphStyle}>
        서비스 제휴, 광고, 협력 등 비즈니스 관련 문의는 아래 이메일로 연락 주시기 바랍니다.
      </p>
      <p style={paragraphStyle}>
        <strong>비즈니스 문의:</strong> business@cheonginuseol.com
      </p>

      <h2 style={headingStyle}>개인정보 관련 문의</h2>
      <p style={paragraphStyle}>
        개인정보 열람, 수정, 삭제 요청 등 개인정보 보호와 관련된 문의는 <Link to="/privacy" style={linkStyle}>개인정보처리방침</Link>을 참고하시거나 고객센터로 연락 주시기 바랍니다.
      </p>

      <div style={{ ...infoBoxStyle, marginTop: '30px' }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px' }}>운영 정보</h3>
        <p style={{ margin: 0 }}>
          <strong>상호:</strong> 천기누설<br />
          <strong>대표자:</strong> 천기누설 운영팀<br />
          <strong>사업자등록번호:</strong> (추후 등록 예정)<br />
        </p>
      </div>

      <p style={{ ...paragraphStyle, marginTop: '30px' }}>
        <Link to="/" style={linkStyle}>메인으로 돌아가기</Link>
      </p>
    </div>
  );
};

export default Contact;
