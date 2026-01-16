import React from 'react';

const UserSection = ({ user, credits, onLogin, onLogout, onOpenCharge, onOpenHistory }) => {
  return (
    <div className="user-section">
      {user ? (
        <div className="user-info">
          <span className="user-greeting">
            <strong>{user.user_metadata.name || user.email}</strong>님, 보유 복채: <strong>{credits}냥</strong>
          </span>
          <button onClick={onOpenHistory} className="charge-btn" style={{ marginRight: '5px' }}>마이페이지</button>
          <button onClick={onOpenCharge} className="charge-btn">복채 충전</button>
          <button onClick={onLogout} className="logout-btn">로그아웃</button>
        </div>
      ) : (
        <div className="login-buttons">
          <button onClick={() => onLogin('kakao')} className="login-btn kakao">
            카카오로 시작하기
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSection;