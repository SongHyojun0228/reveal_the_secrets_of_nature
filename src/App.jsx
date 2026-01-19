import React, { useState, useEffect } from "react";
import "./App.css"; // 여기에 한국풍 스타일 정의
import { supabase } from "./supabaseClient";
import { useTheme } from "./ThemeContext";

import UserSection from "./UserSection";
import TabGroup from "./TabGroup";
import InputSection from "./InputSection";
import ResultSection from "./ResultSection";
import ChargeModal from "./ChargeModal";
import HistoryModal from "./HistoryModal";

// 배포 환경에서는 환경 변수 사용, 로컬에서는 localhost 사용
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/graphql";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [mode, setMode] = useState("dream"); // 'dream' | 'saju'
  const [keyword, setKeyword] = useState("");
  const [sajuInfo, setSajuInfo] = useState({
    birthDate: "",
    birthTime: "",
    gender: "male",
    calendarType: "solar",
  });
  const [result, setResult] = useState(null);
  const [resultId, setResultId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChargeModal, setShowChargeModal] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);
  const [history, setHistory] = useState([]);

  // 초기 로드 시 로그인 상태 확인 및 포트원 스크립트 로드
  useEffect(() => {
    // 테마 적용
    document.body.className = theme;

    // 포트원 스크립트 로드
    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/v1/iamport.js";
    document.body.appendChild(script);

    // 카카오 SDK 스크립트 로드
    const kakaoScript = document.createElement("script");
    kakaoScript.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    kakaoScript.integrity = "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
    kakaoScript.crossOrigin = "anonymous";
    kakaoScript.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
      }
    };
    document.body.appendChild(kakaoScript);

    // 로그인 세션 확인
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchUserCredits(session.user.id);
      }
    });

    // 로그인 상태 변경 감지
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchUserCredits(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [theme]);

  // 사용자 포인트 조회
  const fetchUserCredits = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', userId)
      .single();
    
    if (error) {
      console.error("복채 조회 실패:", error);
    } else if (data) {
      setCredits(data.credits);
    }
  };

  // 마이페이지 기록 조회
  const fetchHistory = async () => {
    if (!user) return;
    const query = `
      query {
        getFortuneHistory(userId: "${user.id}") {
          id
          type
          inputContent
          summary
          detail
          isPaid
          createdAt
        }
      }
    `;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    if (data.data && data.data.getFortuneHistory) {
      setHistory(data.data.getFortuneHistory);
      setShowMyPage(true);
    }
  };

  // 소셜 로그인 핸들러
  const handleLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: window.location.origin, // 현재 주소 (http://localhost:5173)로 자동 설정
        queryParams: { scope: 'profile_nickname profile_image' }, // 이메일 제외하고 요청 (필요시 주석 해제)
      },
    });
    if (error) alert("로그인 요청 중 오류가 발생했습니다: " + error.message);
  };

  // 무료 맛보기 요청
  const handleFreeCheck = async () => {
    if (mode === "dream" && !keyword) return alert("꿈 내용을 입력해주세요.");
    if (mode === "saju" && !sajuInfo.birthDate) return alert("생년월일을 입력해주세요.");

    setLoading(true);
    try {
      // GraphQL 요청 로직 (fetch 사용 예시)
      const userIdParam = user ? `, userId: "${user.id}"` : "";
      let query = "";
      if (mode === "dream") {
        query = `
          mutation {
            getDreamInterpretation(keyword: "${keyword}", isPaid: false${userIdParam}) {
              id
              summary
            }
          }
        `;
      } else {
        query = `
          mutation {
            getSajuFortune(
              birthDate: "${sajuInfo.birthDate}", 
              birthTime: "${sajuInfo.birthTime}", 
              gender: "${sajuInfo.gender}", 
              calendarType: "${sajuInfo.calendarType}", 
              isPaid: false${userIdParam}
            ) {
              id
              summary
            }
          }
        `;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      const resultData = data.data.getDreamInterpretation || data.data.getSajuFortune;
      setResult(resultData.summary);
      setResultId(resultData.id);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 포인트 충전 모달 열기
  const openChargeModal = () => {
    if (!user) return alert("로그인이 필요합니다.");
    setShowChargeModal(true);
  };

  // 실제 결제 요청 (포트원)
  const processPayment = (paymentAmount, creditAmount) => {
    if (!window.IMP) return alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");

    const { IMP } = window;
    IMP.init(import.meta.env.VITE_PORTONE_STORE_ID); // 포트원 가맹점 식별코드

    IMP.request_pay({
      pg: "kakaopay", // 카카오페이
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: `천기누설 복채 충전 (${paymentAmount}원)`,
      amount: paymentAmount,
      buyer_email: user.email,
    }, async (rsp) => {
      if (rsp.success) {
        try {
          // 충전 성공 시 백엔드에 알림
          const query = `
            mutation {
              chargeCredits(userId: "${user.id}", paymentAmount: ${paymentAmount}, creditAmount: ${creditAmount}, impUid: "${rsp.imp_uid}", merchantUid: "${rsp.merchant_uid}")
            }
          `;
          const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
          });
          const data = await response.json();

          if (data.errors) {
            throw new Error(data.errors[0].message);
          }

          // 백엔드에서 반환된 최신 크레딧으로 즉시 업데이트
          setCredits(data.data.chargeCredits);
          alert(`${creditAmount}냥 충전이 완료되었습니다!`);
          setShowChargeModal(false);
        } catch (error) {
          console.error("Charge Error:", error);
          alert("결제는 성공했으나 복채 적립 중 오류가 발생했습니다. 관리자에게 문의해주세요.\n" + error.message);
        }
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    });
  };

  // 상세 풀이 보기 (포인트 사용)
  const handleUnlock = async () => {
    if (!user) {
      alert("상세 풀이는 회원만 가능합니다. 로그인해주세요.");
      return;
    }
    
    // 무료 결과를 본 적이 없다면 입력값 확인
    if (!resultId) {
      if (mode === "dream" && !keyword) return alert("꿈 내용을 입력해주세요.");
      if (mode === "saju" && !sajuInfo.birthDate) return alert("생년월일을 입력해주세요.");
    }

    if (credits < 500) {
      if (window.confirm("복채(포인트)가 부족합니다. 충전하시겠습니까?")) {
        openChargeModal();
      }
      return;
    }

    if (!window.confirm("500냥을 내고 천기를 확인하시겠습니까?")) return;

    setLoading(true);

    try {
      let query = "";
      
      if (resultId) {
        // 1. 이미 무료 결과를 본 경우 -> 기존 기록 잠금 해제
        query = `
          mutation {
            unlockWithCredits(id: "${resultId}", userId: "${user.id}") {
              detail
            }
          }
        `;
      } else {
        // 2. 바로 상세 풀이 요청 -> 신규 생성 및 결제
        let inputContent = "";
        if (mode === "dream") {
            inputContent = keyword;
        } else {
            const genderStr = sajuInfo.gender === 'male' ? '남성' : '여성';
            const calendarStr = sajuInfo.calendarType === 'solar' ? '양력' : '음력';
            const timeStr = sajuInfo.birthTime ? sajuInfo.birthTime : '시간 모름';
            inputContent = `${sajuInfo.birthDate} ${timeStr} (${calendarStr}, ${genderStr})`;
        }
        query = `
          mutation {
            createAndUnlockFortune(type: "${mode}", input: "${inputContent}", userId: "${user.id}") {
              id
              detail
            }
          }
        `;
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (data.errors) {
        throw new Error(data.errors[0].message);
      }
      
      const resultData = resultId ? data.data.unlockWithCredits : data.data.createAndUnlockFortune;
      setResult(resultData.detail);
      if (!resultId) setResultId(resultData.id); // 결과 ID 저장 (이후 공유 등을 위해)
      fetchUserCredits(user.id); // 차감된 포인트 갱신
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 카카오톡 공유하기
  const shareToKakao = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      return alert("카카오 SDK가 로드되지 않았거나 JavaScript 키가 설정되지 않았습니다.");
    }

    window.Kakao.Share.sendDefault({
      objectType: 'text',
      text: result ? (result.length > 200 ? result.substring(0, 197) + "..." : result) : "천기누설 운세 결과",
      link: {
        mobileWebUrl: window.location.href,
        webUrl: window.location.href,
      },
      buttonTitle: '천기누설 바로가기',
    });
  };

  return (
    <div className={`korean-vibe-container ${theme}`}>
      <button 
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'transparent',
          border: '1px solid var(--text-color)',
          color: 'var(--text-color)',
          padding: '5px 10px',
          cursor: 'pointer',
          fontSize: '0.8rem',
          zIndex: 10,
        }}
      >
        {theme === 'light' ? '야간 모드' : '주간 모드'}
      </button>
      <h1 className="title">천기누설 (天機漏洩)</h1>

      <UserSection 
        user={user} 
        credits={credits} 
        onLogin={handleLogin} 
        onLogout={() => supabase.auth.signOut()} 
        onOpenCharge={openChargeModal} 
        onOpenHistory={fetchHistory} 
      />

      <TabGroup 
        mode={mode} 
        setMode={setMode} 
        setResult={setResult} 
      />

      <InputSection 
        mode={mode} 
        keyword={keyword} 
        setKeyword={setKeyword} 
        sajuInfo={sajuInfo} 
        setSajuInfo={setSajuInfo} 
      />

      <div className="button-group">
        <button onClick={handleFreeCheck}>무료로 맛보기</button>
        <button onClick={handleUnlock} className="premium-btn">
          상세 풀이 (500냥 차감)
        </button>
      </div>

      <ResultSection 
        loading={loading} 
        result={result} 
        onShare={shareToKakao} 
      />

      <ChargeModal 
        show={showChargeModal} 
        onClose={() => setShowChargeModal(false)} 
        onPayment={processPayment} 
      />

      <HistoryModal 
        show={showMyPage} 
        onClose={() => setShowMyPage(false)} 
        history={history} 
      />
    </div>
  );
}

export default App;
