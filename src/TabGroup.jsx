import React from 'react';

const TabGroup = ({ mode, setMode, setResult }) => {
  return (
    <div className="tab-group">
      <button 
        className={`tab-btn ${mode === "dream" ? "active" : ""}`} 
        onClick={() => { setMode("dream"); setResult(null); }}
      >
        꿈 해몽
      </button>
      <button 
        className={`tab-btn ${mode === "saju" ? "active" : ""}`} 
        onClick={() => { setMode("saju"); setResult(null); }}
      >
        사주 풀이
      </button>
    </div>
  );
};

export default TabGroup;