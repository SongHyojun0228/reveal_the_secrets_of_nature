import React, { useEffect } from 'react';

const AdSenseAd = ({ adSlot }) => {
  useEffect(() => {
    try {
      // window.adsbygoogle가 로드되면 광고를 푸시합니다.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div className="adsense-container" style={{ margin: '20px 0', textAlign: 'center' }}>
      {/* 
        Google AdSense가 이 div를 채울 것입니다.
        'YOUR_AD_SLOT_ID'를 실제 애드센스 광고 슬롯 ID로 교체해야 합니다.
        data-ad-client는 이미 index.html에 추가되어 있습니다.
      */}
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6608961257112881" 
        data-ad-slot={adSlot || "YOUR_AD_SLOT_ID"} // 이 부분을 실제 광고 슬롯 ID로 교체해야 합니다.
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdSenseAd;
