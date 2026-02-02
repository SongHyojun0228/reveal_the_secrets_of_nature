import React from 'react';
import './InsufficientCreditsModal.css'; // 모달 스타일 파일을 가정

const InsufficientCreditsModal = ({ show, onClose, onCharge, onWatchAd }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>복채가 부족합니다.</h2>
        <p>상세 풀이를 보려면 복채가 필요합니다.</p>
        <div className="modal-actions">
          <button onClick={onCharge} className="modal-button primary">복채 충전</button>
          <button onClick={onWatchAd} className="modal-button secondary">광고 보기</button>
          <button onClick={onClose} className="modal-button tertiary">아니요</button>
        </div>
      </div>
    </div>
  );
};

export default InsufficientCreditsModal;