
import React, { useState, useEffect } from "react";
import "../App.css"; // 경로 수정
import { supabase } from "../supabaseClient"; // 경로 수정
import { useTheme } from "../ThemeContext"; // 경로 수정

import WelcomeSection from "../WelcomeSection"; // WelcomeSection 컴포넌트 import
import UserSection from "../UserSection"; // 경로 수정
import TabGroup from "../TabGroup"; // 경로 수정
import InputSection from "../InputSection"; // 경로 수정
import ResultSection from "../ResultSection"; // 경로 수정
import ChargeModal from "../ChargeModal"; // 경로 수정
import HistoryModal from "../HistoryModal"; // 경로 수정
import AdSenseAd from "../AdSenseAd"; // 경로 수정
import InsufficientCreditsModal from "../InsufficientCreditsModal"; // 경로 수정

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/graphql";

function MainApp() { // 함수 이름 App -> MainApp으로 변경
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(0);
  const [mode, setMode] = useState("dream");
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
  const [showInsufficientCreditsModal, setShowInsufficientCreditsModal] = useState(false);

  useEffect(() => {
    document.body.className = theme;

    // 카카오페이 결제 스크립트 - 주석 처리
    // const script = document.createElement("script");
    // script.src = "https://cdn.iamport.kr/v1/iamport.js";
    // document.body.appendChild(script);

    // 카카오 SDK 로드 - 주석 처리
    // const kakaoScript = document.createElement("script");
    // kakaoScript.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js";
    // kakaoScript.integrity = "sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4";
    // kakaoScript.crossOrigin = "anonymous";
    // kakaoScript.onload = () => {
    //   if (window.Kakao && !window.Kakao.isInitialized()) {
    //     window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
    //   }
    // };
    // document.body.appendChild(kakaoScript);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        fetchUserCredits(session.user.id);
      } else {
        setUser(null);
        setCredits(0);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserCredits(session.user.id);
      } else {
        setCredits(0);
      }
    });

    return () => subscription.unsubscribe();
  }, [theme]);

  const fetchUserCredits = async (userId) => {
    if (!userId) {
      setCredits(0);
      return 0;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('credits, nickname')
        .eq('id', userId)
        .single();

      if (error) {
        // 프로필이 아직 생성되지 않은 경우 (Trigger가 실행 중일 수 있음)
        if (error.code === 'PGRST116') {
          console.log("프로필이 아직 생성되지 않았습니다. Trigger 처리 대기 중...");
          setCredits(0);
          return 0;
        }
        console.error("프로필 조회 실패:", error);
        setCredits(0);
        return 0;
      } else if (data) {
        setCredits(data.credits || 0);
        return data.credits || 0;
      }
      setCredits(0);
      return 0;
    } catch (err) {
      console.error("프로필 조회 중 예외 발생:", err);
      setCredits(0);
      return 0;
    }
  };

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

  // 카카오 로그인 - 주석 처리
  // const handleLogin = async (provider) => {
  //   const { error } = await supabase.auth.signInWithOAuth({
  //     provider: provider,
  //     options: {
  //       redirectTo: window.location.origin,
  //       queryParams: { scope: 'profile_nickname profile_image' },
  //     },
  //   });
  //   if (error) alert("로그인 요청 중 오류가 발생했습니다: " + error.message);
  // };

  // 이메일 회원가입 (닉네임 포함)
  const handleEmailSignup = async (email, password, nickname) => {
    if (!email || !password || !nickname) {
      return alert("이메일, 비밀번호, 닉네임을 모두 입력해주세요.");
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            nickname: nickname  // 메타데이터에 닉네임 저장 (Trigger에서 사용)
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Trigger가 자동으로 profiles 테이블에 생성함
        alert("회원가입이 완료되었습니다! 로그인해주세요.");
        // 회원가입 성공 신호를 UserSection에 전달
        return { success: true };
      }
    } catch (error) {
      alert("회원가입 실패: " + error.message);
      return { success: false };
    }
  };

  // 이메일 로그인
  const handleEmailLogin = async (email, password) => {
    if (!email || !password) {
      return alert("이메일과 비밀번호를 입력해주세요.");
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      // 로그인 성공 시 자동으로 useEffect의 onAuthStateChange가 처리함
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  // 무료 맛보기 - 주석 처리 (사용 안 함)
  // const handleFreeCheck = async () => {
  //   if (mode === "dream" && !keyword) return alert("꿈 내용을 입력해주세요.");
  //   if (mode === "saju" && !sajuInfo.birthDate) return alert("생년월일을 입력해주세요.");

  //   setLoading(true);
  //   try {
  //     const userIdParam = user ? `, userId: \"${user.id}\" ` : "";
  //     let query = "";
  //     if (mode === "dream") {
  //       query = `
  //         mutation {
  //           getDreamInterpretation(keyword: "${keyword}", isPaid: false${userIdParam}) {
  //             id
  //             summary
  //           }
  //         }
  //       `;
  //     } else {
  //       query = `
  //         mutation {
  //           getSajuFortune(
  //             birthDate: "${sajuInfo.birthDate}",
  //             birthTime: "${sajuInfo.birthTime}",
  //             gender: "${sajuInfo.gender}",
  //             calendarType: "${sajuInfo.calendarType}",
  //             isPaid: false${userIdParam}
  //           ) {
  //             id
  //             summary
  //           }
  //         }
  //       `;
  //     }

  //     const response = await fetch(API_URL, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ query }),
  //     });
  //     const data = await response.json();
  //     if (data.errors) {
  //       throw new Error(data.errors[0].message);
  //     }
  //     const resultData = data.data.getDreamInterpretation || data.data.getSajuFortune;
  //     setResult(resultData.summary);
  //     setResultId(resultData.id);
  //   } catch (error) {
  //     console.error(error);
  //     alert(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // 복채 충전 모달 - 주석 처리 (사용 안 함)
  // const openChargeModal = () => {
  //   if (!user) return alert("로그인이 필요합니다.");
  //   setShowChargeModal(true);
  // };

  // 카카오페이 결제 - 주석 처리 (사용 안 함)
  // const processPayment = (paymentAmount, creditAmount) => {
  //   if (!window.IMP) return alert("결제 모듈을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");

  //   const { IMP } = window;
  //   IMP.init(import.meta.env.VITE_PORTONE_STORE_ID);

  //   IMP.request_pay({
  //     pg: "kakaopay",
  //     pay_method: "card",
  //     merchant_uid: `mid_${new Date().getTime()}`,
  //     name: `천기누설 복채 충전 (${paymentAmount}원)`,
  //     amount: paymentAmount,
  //     buyer_email: user.email,
  //   }, async (rsp) => {
  //     if (rsp.success) {
  //       try {
  //         const query = `
  //           mutation {
  //             chargeCredits(userId: "${user.id}", paymentAmount: ${paymentAmount}, creditAmount: ${creditAmount}, impUid: "${rsp.imp_uid}", merchantUid: "${rsp.merchant_uid}")
  //           }
  //         `;
  //         const response = await fetch(API_URL, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ query }),
  //         });
  //         const data = await response.json();

  //         if (data.errors) {
  //           throw new Error(data.errors[0].message);
  //         }

  //         setCredits(data.data.chargeCredits);
  //         alert(`${creditAmount}냥 충전이 완료되었습니다!`);
  //         setShowChargeModal(false);
  //       } catch (error) {
  //         console.error("Charge Error:", error);
  //         alert("결제는 성공했으나 복채 적립 중 오류가 발생했습니다. 관리자에게 문의해주세요.\n" + error.message);
  //       }
  //     } else {
  //         alert(`결제 실패: ${rsp.error_msg}`);
  //     }
  //   });
  // };

  // 광고 시청 후 무료 풀이 제공
  const handleWatchAd = async () => {
      // TODO: 실제 광고 시스템 연동 시 다음과 같이 구현:
      // 1. 광고 모달 표시
      // 2. 광고 시청 완료 이벤트 대기
      // 3. 완료 후 handleUnlock(true) 호출

      // 현재는 시뮬레이션: 3초 대기 후 풀이 제공
      alert("광고 시청 중입니다...\n\n(현재는 테스트 모드로 3초 후 자동으로 풀이가 제공됩니다.\n실제 운영 시에는 AdSense 광고가 표시됩니다.)");

      setTimeout(async () => {
        await handleUnlock(true);
      }, 3000);
  };

  // 상세 풀이 - 광고 시청 필수, 복채 차감 없음
  const handleUnlock = async (adWatched = false) => {
      if (!user) {
        alert("상세 풀이는 회원만 가능합니다. 로그인해주세요.");
        return;
      }

      if (mode === "dream" && !keyword) return alert("꿈 내용을 입력해주세요.");
      if (mode === "saju" && !sajuInfo.birthDate) return alert("생년월일을 입력해주세요.");

      // 광고를 아직 안 봤으면 광고 시청 요청
      if (!adWatched) {
        await handleWatchAd();
        return;
      }

      setLoading(true);

      try {
        let query = "";
        
        if (resultId) {
          query = `
            mutation {
              unlockWithCredits(id: "${resultId}", userId: "${user.id}", isFreeUnlockAfterAd: true) {
                detail
              }
            }
          `;
        } else {
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
              createAndUnlockFortune(type: "${mode}", input: "${inputContent}", userId: "${user.id}", isFreeUnlockAfterAd: true) {
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

        if (!response.ok) {
          throw new Error(`서버 응답 오류: ${response.status}`);
        }

        const data = await response.json();
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }

        const resultData = resultId ? data.data.unlockWithCredits : data.data.createAndUnlockFortune;
        setResult(resultData.detail);
        if (!resultId) setResultId(resultData.id);
        if (user) fetchUserCredits(user.id);
      } catch (error) {
        console.error(error);
        if (error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
          alert("백엔드 서버에 연결할 수 없습니다.\n\n해결 방법:\n1. 백엔드 서버가 실행 중인지 확인하세요\n2. 터미널에서 'cd backend && npm start' 실행\n3. http://localhost:4000/graphql 에서 서버 확인");
        } else {
          alert("오류: " + error.message);
        }
      } finally {
        setLoading(false);
      }
  };

  // 카카오 공유 - 주석 처리 (카카오 SDK 미사용)
  // const shareToKakao = () => {
  //   if (!window.Kakao || !window.Kakao.isInitialized()) {
  //     return alert("카카오 SDK가 로드되지 않았거나 JavaScript 키가 설정되지 않았습니다.");
  //   }

  //   window.Kakao.Share.sendDefault({
  //     objectType: 'text',
  //     text: result ? (result.length > 200 ? result.substring(0, 197) + "..." : result) : "천기누설 운세 결과",
  //     link: {
  //       mobileWebUrl: window.location.href,
  //       webUrl: window.location.href,
  //     },
  //     buttonTitle: '천기누설 바로가기',
  //   });
  // };

  return (
    // 이 부분은 MainApp의 렌더링 결과입니다. App.jsx에서 감싸는 div는 제거됩니다.
    <>
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
      <h1 className="title">천기누설 - AI 꿈 해몽 풀이</h1>
      
      <WelcomeSection /> {/* WelcomeSection 컴포넌트 추가 */}

      <UserSection
        user={user}
        credits={credits}
        onEmailSignup={handleEmailSignup}
        onEmailLogin={handleEmailLogin}
        onLogout={() => supabase.auth.signOut()}
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
        {/* 무료 맛보기 버튼 제거 */}
        <button onClick={() => handleUnlock()} className="premium-btn">
          상세 풀이 (광고 시청 필수)
        </button>
      </div>

      {/* 광고 항상 표시 */}
      <AdSenseAd adSlot="5782229426" />

      <ResultSection
        loading={loading}
        result={result}
        onShare={null}
      />

      {/* 복채 부족 모달 제거 */}
      {/* <InsufficientCreditsModal
        show={showInsufficientCreditsModal}
        onClose={() => setShowInsufficientCreditsModal(false)}
        onCharge={() => {
          setShowInsufficientCreditsModal(false);
          openChargeModal();
        }}
        onWatchAd={handleWatchAd}
      /> */}

      {/* 복채 충전 모달 제거 */}
      {/* <ChargeModal
        show={showChargeModal}
        onClose={() => setShowChargeModal(false)}
        onPayment={processPayment}
      /> */}

      <HistoryModal 
        show={showMyPage} 
        onClose={() => setShowMyPage(false)} 
        history={history} 
      />
    </>
  );
}

export default MainApp;
