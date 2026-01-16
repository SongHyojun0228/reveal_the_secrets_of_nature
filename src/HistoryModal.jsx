import React from 'react';

const HistoryModal = ({ show, onClose, history }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content history-modal" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">나의 운세 기록</h3>
        <div className="history-list">
          {history.length === 0 ? (
            <p>아직 기록된 운세가 없습니다.</p>
          ) : (
            history.map((item) => (
              <div key={item.id} className="history-item">
                <div className="history-header">
                  <span className="history-type">{item.type === 'dream' ? '꿈 해몽' : '사주 풀이'}</span>
                  <span className="history-date">{item.createdAt}</span>
                </div>
                <p className="history-input">{item.inputContent}</p>
                <p className="history-summary">{item.summary}</p>
                {item.isPaid && <div className="history-detail"><hr/><p>{item.detail}</p></div>}
              </div>
            ))
          )}
        </div>
        <button className="close-btn" onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default HistoryModal;