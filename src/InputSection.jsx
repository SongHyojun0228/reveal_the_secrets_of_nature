import React from 'react';

const InputSection = ({ mode, keyword, setKeyword, sajuInfo, setSajuInfo }) => {
  return (
    <div className="input-section">
      {mode === "dream" ? (
        <textarea
          id="dream-keyword"
          name="dreamKeyword"
          placeholder="어젯밤 꿈 내용을 적어보시오..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      ) : (
        <div className="saju-form">
          <div className="form-row">
            <label>생년월일</label>
            <input 
              type="date"
              id="birth-date"
              name="birthDate" 
              value={sajuInfo.birthDate}
              onChange={(e) => setSajuInfo({...sajuInfo, birthDate: e.target.value})}
            />
          </div>
          <div className="form-row">
            <label>태어난 시간</label>
            <input 
              type="time"
              id="birth-time"
              name="birthTime" 
              value={sajuInfo.birthTime}
              onChange={(e) => setSajuInfo({...sajuInfo, birthTime: e.target.value})}
            />
          </div>
          <div className="form-row radio-group">
            <label><input type="radio" id="gender-male" name="gender" checked={sajuInfo.gender === 'male'} onChange={() => setSajuInfo({...sajuInfo, gender: 'male'})} /> 남성</label>
            <label><input type="radio" id="gender-female" name="gender" checked={sajuInfo.gender === 'female'} onChange={() => setSajuInfo({...sajuInfo, gender: 'female'})} /> 여성</label>
            <span className="divider">|</span>
            <label><input type="radio" id="calendar-solar" name="calendar" checked={sajuInfo.calendarType === 'solar'} onChange={() => setSajuInfo({...sajuInfo, calendarType: 'solar'})} /> 양력</label>
            <label><input type="radio" id="calendar-lunar" name="calendar" checked={sajuInfo.calendarType === 'lunar'} onChange={() => setSajuInfo({...sajuInfo, calendarType: 'lunar'})} /> 음력</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputSection;