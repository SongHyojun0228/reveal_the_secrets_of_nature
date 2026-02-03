import React from 'react';
import { Link } from 'react-router-dom';

const FAQ = () => {
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
      const questionStyle = {
        fontWeight: 'bold',
        marginBottom: '10px',
      };
      const answerStyle = {
        marginBottom: '25px',
        paddingLeft: '15px',
        borderLeft: '3px solid var(--border-color)',
      };
      const linkStyle = {
        color: 'var(--link-color)',
        textDecoration: 'underline',
      };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>자주 묻는 질문 (FAQ)</h1>

      <div style={questionStyle}>Q. AI 꿈 해몽 결과는 얼마나 정확한가요?</div>
      <div style={answerStyle}>
        A. 저희 AI 해몽은 방대한 양의 꿈 관련 데이터와 상징 해석 자료를 학습하여 만들어졌습니다. 
        전통적인 해몽 방식과 현대 심리학적 분석을 결합하여 높은 수준의 해석 정확도를 목표로 하고 있습니다. 
        하지만 꿈은 매우 개인적이고 다층적인 의미를 지니므로, AI의 분석은 삶의 방향을 결정하는 절대적인 지표가 아닌, 
        자신을 돌아보고 영감을 얻는 참고 자료로 활용하시는 것이 가장 좋습니다.
      </div>

      <div style={questionStyle}>Q. 포인트(냥)는 어떻게 충전하고 사용하나요?</div>
      <div style={answerStyle}>
        A. 로그인을 하신 후, 상단의 '복채 충전' 버튼을 누르면 원하시는 만큼 포인트를 충전할 수 있습니다.
        '무료 맛보기'를 통해 서비스의 기능을 체험해보실 수 있으며, 더 상세한 전체 풀이를 원하실 때 '상세 풀이' 버튼을 눌러 포인트를 사용하게 됩니다. 
        결제 시 500냥이 차감되며, 한 번 잠금 해제한 콘텐츠는 '마이페이지'에서 언제든지 다시 볼 수 있습니다.
      </div>

      <div style={questionStyle}>Q. 회원가입은 꼭 해야 하나요?</div>
      <div style={answerStyle}>
        A. '무료 맛보기' 기능은 비회원도 이용할 수 있습니다. 
        하지만 상세 풀이를 보거나, 과거에 봤던 기록을 관리하고, 포인트를 충전하는 등 모든 개인화된 서비스를 이용하기 위해서는 간단한 소셜 로그인을 통한 회원가입이 필요합니다. 
        회원가입을 통해 더 풍부한 기능을 경험해보세요.
      </div>

      <div style={questionStyle}>Q. 입력한 개인정보는 안전하게 관리되나요?</div>
      <div style={answerStyle}>
        A. 네, 그럼요. 저희는 사용자의 개인정보 보호를 매우 중요하게 생각합니다. 
        로그인 정보는 암호화되어 안전하게 관리되며, 꿈이나 사주 정보 등 민감할 수 있는 데이터는 서비스 제공 목적 외에는 절대 사용되지 않습니다. 
        안심하고 서비스를 이용하셔도 좋습니다.
      </div>

      <Link to="/" style={linkStyle}>메인으로 돌아가기</Link>
    </div>
  );
};

export default FAQ;
