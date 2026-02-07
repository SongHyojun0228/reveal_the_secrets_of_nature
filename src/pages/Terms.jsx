import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
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
        <title>이용약관 - 천기누설</title>
        <meta name="description" content="천기누설 서비스 이용에 관한 약관 및 조건을 안내합니다." />
        <meta name="keywords" content="이용약관, 서비스 약관, 천기누설" />
      </Helmet>

      <h1 style={headingStyle}>이용약관</h1>

      <h2 style={headingStyle}>제1조 (목적)</h2>
      <p style={paragraphStyle}>
        본 약관은 천기누설(이하 "회사")이 제공하는 AI 꿈 해몽 및 사주 풀이 서비스(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
      </p>

      <h2 style={headingStyle}>제2조 (용어의 정의)</h2>
      <ul>
        <li><strong>"서비스"</strong>란 회사가 제공하는 AI 기반 꿈 해몽, 사주 풀이 및 관련 콘텐츠 제공 서비스를 의미합니다.</li>
        <li><strong>"이용자"</strong>란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.</li>
        <li><strong>"포인트"</strong>란 서비스 이용을 위해 구매하거나 무료로 제공받은 가상의 화폐 단위를 의미합니다.</li>
        <li><strong>"콘텐츠"</strong>란 회사가 제공하는 꿈 해몽 결과, 사주 풀이 결과, 블로그 글 등 모든 정보를 의미합니다.</li>
      </ul>

      <h2 style={headingStyle}>제3조 (약관의 효력 및 변경)</h2>
      <p style={paragraphStyle}>
        본 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 변경된 약관은 홈페이지에 공지함으로써 효력이 발생합니다.
        이용자가 변경된 약관에 동의하지 않을 경우, 서비스 이용을 중단하고 탈퇴할 수 있습니다.
      </p>

      <h2 style={headingStyle}>제4조 (서비스의 제공)</h2>
      <p style={paragraphStyle}>
        회사는 다음과 같은 서비스를 제공합니다:
      </p>
      <ul>
        <li>AI 기반 꿈 해몽 서비스</li>
        <li>생년월일시 기반 사주 풀이 서비스</li>
        <li>꿈 해몽 관련 블로그 콘텐츠 제공</li>
        <li>포인트 구매 및 관리 시스템</li>
        <li>기타 회사가 추가 개발하거나 제휴 계약 등을 통해 이용자에게 제공하는 일체의 서비스</li>
      </ul>
      <p style={paragraphStyle}>
        서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다. 다만, 회사의 업무 또는 기술상의 이유로 서비스가 일시 중지될 수 있으며, 정기점검 등의 사유로 인한 경우 사전에 공지합니다.
      </p>

      <h2 style={headingStyle}>제5조 (서비스 이용)</h2>
      <p style={paragraphStyle}>
        이용자는 본 약관에 동의함으로써 서비스를 이용할 수 있습니다. 서비스 이용 시 다음 사항을 준수해야 합니다:
      </p>
      <ul>
        <li>타인의 개인정보를 도용하거나 부정하게 사용하지 않을 것</li>
        <li>회사의 서비스를 이용하여 얻은 정보를 무단으로 복제, 배포, 상업적으로 이용하지 않을 것</li>
        <li>회사 및 제3자의 저작권 등 지적재산권을 침해하지 않을 것</li>
        <li>회사의 서비스 운영을 고의로 방해하지 않을 것</li>
      </ul>

      <h2 style={headingStyle}>제6조 (포인트 제도)</h2>
      <p style={paragraphStyle}>
        회사는 서비스 이용의 편의를 위해 포인트 제도를 운영합니다. 포인트는 유료 결제를 통해 구매하거나 회사의 이벤트 등을 통해 무료로 제공받을 수 있습니다.
      </p>
      <ul>
        <li>포인트는 서비스 내에서만 사용 가능하며, 현금으로 환불되지 않습니다.</li>
        <li>포인트의 유효기간은 구매일로부터 1년입니다.</li>
        <li>이용자가 서비스 이용을 중단하거나 탈퇴할 경우, 보유 중인 포인트는 소멸됩니다.</li>
        <li>부정한 방법으로 포인트를 획득한 경우, 회사는 해당 포인트를 회수하고 서비스 이용을 제한할 수 있습니다.</li>
      </ul>

      <h2 style={headingStyle}>제7조 (서비스의 변경 및 중단)</h2>
      <p style={paragraphStyle}>
        회사는 운영상, 기술상의 필요에 따라 제공하는 서비스를 변경하거나 중단할 수 있습니다. 서비스의 내용, 이용 방법, 이용 시간 등이 변경되는 경우 변경 사유 및 내용을 홈페이지에 공지합니다.
        회사는 무료로 제공하는 서비스의 경우 별도의 보상 없이 서비스를 변경하거나 중단할 수 있습니다.
      </p>

      <h2 style={headingStyle}>제8조 (면책 조항)</h2>
      <p style={paragraphStyle}>
        회사가 제공하는 AI 꿈 해몽 및 사주 풀이 서비스는 참고 목적으로 제공되는 것이며, 절대적인 예측이나 보장을 의미하지 않습니다.
        서비스 결과에 대한 해석 및 활용은 전적으로 이용자의 책임이며, 회사는 서비스 이용으로 인해 발생한 어떠한 직간접적인 손해에 대해서도 책임을 지지 않습니다.
      </p>
      <ul>
        <li>천재지변, 전쟁, 기간통신사업자의 서비스 중지 등 불가항력적인 사유로 인한 서비스 중단</li>
        <li>이용자의 귀책사유로 인한 서비스 이용 장애</li>
        <li>제3자가 제공한 정보의 정확성, 신뢰성 등에 관한 사항</li>
      </ul>

      <h2 style={headingStyle}>제9조 (저작권)</h2>
      <p style={paragraphStyle}>
        회사가 제공하는 모든 콘텐츠(텍스트, 이미지, 디자인 등)에 대한 저작권 및 지적재산권은 회사에 귀속됩니다.
        이용자는 서비스를 이용함으로써 얻은 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 등 기타 방법으로 이용하거나 제3자에게 이용하게 할 수 없습니다.
      </p>

      <h2 style={headingStyle}>제10조 (분쟁 해결)</h2>
      <p style={paragraphStyle}>
        본 약관과 관련하여 분쟁이 발생할 경우, 회사와 이용자는 상호 협의하여 원만하게 해결하도록 노력합니다.
        협의가 이루어지지 않을 경우, 관련 법령 및 회사의 본사 소재지를 관할하는 법원을 전속 관할 법원으로 합니다.
      </p>

      <h2 style={headingStyle}>부칙</h2>
      <p style={paragraphStyle}>
        본 약관은 2024년 2월 7일부터 시행됩니다.
      </p>

      <p style={{ ...paragraphStyle, marginTop: '30px' }}>
        <Link to="/" style={linkStyle}>메인으로 돌아가기</Link>
      </p>
    </div>
  );
};

export default Terms;
