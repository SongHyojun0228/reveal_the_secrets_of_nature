import React from 'react';

const ResultSection = ({ loading, result, onShare }) => {
  return (
    <>
      {loading && (
        <div className="loading">신령님께 여쭙는 중... (광고 배너 위치)</div>
      )}

      {result && (
        <div className="result-paper">
          <p>{result}</p>
          <button className="kakao-share-btn" onClick={onShare}>
            카카오톡으로 결과 공유
          </button>
        </div>
      )}
    </>
  );
};

export default ResultSection;