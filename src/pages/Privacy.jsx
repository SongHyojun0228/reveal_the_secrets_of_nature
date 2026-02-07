import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
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
      <Helmet>
        <title>개인정보처리방침 - 천기누설</title>
        <meta name="description" content="천기누설 서비스의 개인정보 수집, 이용, 보관 및 관리에 대한 방침을 안내합니다." />
        <meta name="keywords" content="개인정보처리방침, 개인정보보호, 천기누설" />
      </Helmet>

      <h1 style={headingStyle}>개인정보처리방침</h1>

      <p style={paragraphStyle}>
        천기누설(이하 "회사")은 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령을 준수하고 있습니다.
        본 개인정보처리방침은 회사가 제공하는 AI 꿈 해몽 및 사주 풀이 서비스와 관련하여 이용자의 개인정보가 어떻게 수집, 이용, 관리되는지를 알려드립니다.
      </p>

      <h2 style={headingStyle}>1. 개인정보의 수집 및 이용 목적</h2>
      <p style={paragraphStyle}>
        회사는 다음과 같은 목적을 위해 개인정보를 수집 및 이용합니다:
      </p>
      <ul>
        <li><strong>서비스 제공:</strong> AI 꿈 해몽 분석, 사주 풀이 서비스 제공</li>
        <li><strong>회원 관리:</strong> 본인 확인, 서비스 이용 내역 조회, 포인트 관리</li>
        <li><strong>서비스 개선:</strong> 이용 통계 분석, 신규 서비스 개발, 맞춤형 콘텐츠 제공</li>
        <li><strong>고객 지원:</strong> 문의사항 처리, 불만 처리, 공지사항 전달</li>
      </ul>

      <h2 style={headingStyle}>2. 수집하는 개인정보 항목</h2>
      <p style={paragraphStyle}>
        회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:
      </p>
      <ul>
        <li><strong>필수 정보:</strong> 생년월일시(사주 풀이 서비스 이용 시), 꿈 내용(꿈 해몽 서비스 이용 시)</li>
        <li><strong>자동 수집 정보:</strong> IP 주소, 쿠키, 서비스 이용 기록, 접속 로그, 기기 정보</li>
        <li><strong>결제 정보:</strong> 포인트 구매 시 결제 내역(단, 신용카드 정보 등은 결제 대행사에서 처리하며 회사는 보관하지 않음)</li>
      </ul>

      <h2 style={headingStyle}>3. 개인정보의 보유 및 이용 기간</h2>
      <p style={paragraphStyle}>
        회사는 법령에 따른 개인정보 보유·이용 기간 또는 이용자로부터 개인정보를 수집 시 동의받은 기간 내에서 개인정보를 처리·보유합니다.
      </p>
      <ul>
        <li><strong>서비스 이용 기록:</strong> 서비스 이용 종료 후 1년</li>
        <li><strong>결제 기록:</strong> 전자상거래법에 따라 5년 보관</li>
        <li><strong>웹사이트 방문 기록:</strong> 통신비밀보호법에 따라 3개월 보관</li>
      </ul>
      <p style={paragraphStyle}>
        단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계 법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.
      </p>

      <h2 style={headingStyle}>4. 개인정보의 제3자 제공</h2>
      <p style={paragraphStyle}>
        회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다:
      </p>
      <ul>
        <li>이용자가 사전에 동의한 경우</li>
        <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
      </ul>

      <h2 style={headingStyle}>5. 개인정보 처리의 위탁</h2>
      <p style={paragraphStyle}>
        회사는 서비스 향상을 위해 개인정보 처리를 외부 전문업체에 위탁할 수 있습니다. 위탁 시에는 관련 법령에 따라 안전하게 관리되도록 필요한 사항을 규정하고 관리·감독합니다.
      </p>

      <h2 style={headingStyle}>6. 이용자의 권리와 행사 방법</h2>
      <p style={paragraphStyle}>
        이용자는 언제든지 등록되어 있는 본인의 개인정보를 조회하거나 수정할 수 있으며, 개인정보의 처리에 대한 동의 철회(회원 탈퇴)를 요청할 수 있습니다.
        개인정보 조회, 수정, 동의 철회를 위해서는 고객센터를 통해 요청하실 수 있습니다.
      </p>

      <h2 style={headingStyle}>7. 개인정보의 파기</h2>
      <p style={paragraphStyle}>
        회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
        전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이 문서는 분쇄하거나 소각합니다.
      </p>

      <h2 style={headingStyle}>8. 개인정보 보호책임자</h2>
      <p style={paragraphStyle}>
        회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
      </p>
      <ul>
        <li><strong>개인정보 보호책임자:</strong> 천기누설 운영팀</li>
        <li><strong>연락처:</strong> <Link to="/contact" style={linkStyle}>연락처 페이지</Link> 참조</li>
      </ul>

      <h2 style={headingStyle}>9. 개인정보처리방침의 변경</h2>
      <p style={paragraphStyle}>
        이 개인정보처리방침은 2024년 2월 7일부터 적용됩니다. 법령, 정책 또는 보안기술의 변경에 따라 내용의 추가, 삭제 및 수정이 있을 시에는 변경사항을 시행하기 최소 7일 전부터 홈페이지를 통해 고지할 것입니다.
      </p>

      <p style={{ ...paragraphStyle, marginTop: '30px' }}>
        <Link to="/" style={linkStyle}>메인으로 돌아가기</Link>
      </p>
    </div>
  );
};

export default Privacy;
