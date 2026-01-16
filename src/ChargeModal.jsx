import React from 'react';

const ChargeModal = ({ show, onClose, onPayment }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">복채 충전소</h3>
        <div className="charge-options">
          <button className="charge-option-btn" onClick={() => onPayment(1000, 1000)}>
            1,000원 <span className="bonus-text">(1,000냥)</span>
          </button>
          <button className="charge-option-btn" onClick={() => onPayment(5000, 5500)}>
            5,000원 <span className="bonus-text">(5,500냥)</span> <span className="badge">10% 보너스</span>
          </button>
          <button className="charge-option-btn" onClick={() => onPayment(10000, 12000)}>
            10,000원 <span className="bonus-text">(12,000냥)</span> <span className="badge best">20% 보너스</span>
          </button>
        </div>
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default ChargeModal;