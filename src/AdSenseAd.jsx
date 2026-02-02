import React, { useEffect } from 'react';

const AdSenseAd = ({ adSlot }) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle) { // adsbygoogle가 로드되었는지 확인
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []); 

  return (
    <div 
      className="adsense-container" 
      style={{ 
        margin: '20px 0', 
        textAlign: 'center',
        minWidth: '280px', // 최소 너비 추가
        minHeight: '250px', // 최소 높이 추가 (광고 크기에 따라 조정 가능)
        display: 'flex', // 컨테이너 내에서 광고를 중앙 정렬하기 위해 flex 사용
        justifyContent: 'center', 
        alignItems: 'center', 
        overflow: 'hidden' // 광고가 컨테이너를 벗어나는 경우 숨김
      }}
    >
      <ins 
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }} // 컨테이너를 채우도록 설정
        data-ad-client="ca-pub-6608961257112881" 
        data-ad-slot={adSlot || "YOUR_AD_SLOT_ID"} 
        data-ad-format="auto" 
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
