import React, { useState } from 'react';

const UserSection = ({ user, credits, onEmailSignup, onEmailLogin, onLogout, onOpenHistory }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      const result = await onEmailSignup(email, password, nickname);
      if (result?.success) {
        // 회원가입 성공 시 로그인 모드로 전환
        setIsSignup(false);
        setPassword('');
        setNickname('');
        // 이메일은 유지해서 바로 로그인할 수 있게 함
      }
    } else {
      onEmailLogin(email, password);
    }
  };

  return (
    <div className="user-section">
      {user ? (
        <div className="user-info">
          <span className="user-greeting">
            <strong>{user.user_metadata?.nickname || user.email?.split('@')[0] || '사용자'}</strong>님 환영합니다!
          </span>
          <button onClick={onOpenHistory} className="charge-btn" style={{ marginRight: '5px' }}>
            마이페이지
          </button>
          {/* 복채 충전 버튼 제거 */}
          <button onClick={onLogout} className="logout-btn">로그아웃</button>
        </div>
      ) : (
        <div className="login-form-container">
          <h3>{isSignup ? '회원가입' : '로그인'}</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
              }}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '10px',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                backgroundColor: 'var(--bg-color)',
                color: 'var(--text-color)',
              }}
            />
            {isSignup && (
              <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                style={{
                  padding: '10px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-color)',
                }}
              />
            )}
            <button
              type="submit"
              className="login-btn"
              style={{
                padding: '10px',
                backgroundColor: 'var(--link-color)',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              {isSignup ? '회원가입' : '로그인'}
            </button>
          </form>
          <p style={{ marginTop: '10px', textAlign: 'center' }}>
            {isSignup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}{' '}
            <button
              onClick={() => {
                setIsSignup(!isSignup);
                setEmail('');
                setPassword('');
                setNickname('');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--link-color)',
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                font: 'inherit',
              }}
            >
              {isSignup ? '로그인' : '회원가입'}
            </button>
          </p>
          {/* 카카오 로그인 버튼 제거 */}
          {/* <div className="login-buttons">
            <button onClick={() => onLogin('kakao')} className="login-btn kakao">
              카카오로 시작하기
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default UserSection;
