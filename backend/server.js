require('dotenv').config({ override: true }); // 환경변수 로드
const express = require('express');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const { buildSchema } = require('graphql');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Pool } = require('pg');

// 1. DB 연결 설정 (Supabase)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Gemini API 설정
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// 3. GraphQL 스키마 정의
const schema = buildSchema(`
  type FortuneResult {
    id: ID
    summary: String
    detail: String
  }

  type FortuneHistoryItem {
    id: ID
    type: String
    inputContent: String
    summary: String
    detail: String
    isPaid: Boolean
    createdAt: String
  }

  type Query {
    hello: String
    getFortuneHistory(userId: ID!): [FortuneHistoryItem]
  }

  type Mutation {
    getDreamInterpretation(keyword: String!, isPaid: Boolean!, userId: ID): FortuneResult
    getSajuFortune(birthDate: String!, birthTime: String, gender: String!, calendarType: String!, isPaid: Boolean!, userId: ID): FortuneResult
    chargeCredits(userId: ID!, paymentAmount: Int!, creditAmount: Int!, impUid: String!, merchantUid: String!): Int
    unlockWithCredits(id: ID!, userId: ID!): FortuneResult
    createAndUnlockFortune(type: String!, input: String!, userId: ID!): FortuneResult
  }
`);

// 4. 리졸버 함수 정의
const root = {
  hello: () => '안녕하세요, 신비한 꿈 해몽소입니다.',

  getFortuneHistory: async ({ userId }) => {
    try {
      const res = await pool.query(
        'SELECT id, type, input_content, summary_result, detail_result, is_paid, created_at FROM fortune_results WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return res.rows.map(row => ({
        id: row.id,
        type: row.type,
        inputContent: row.input_content,
        summary: row.summary_result,
        detail: row.detail_result,
        isPaid: row.is_paid,
        createdAt: new Date(row.created_at).toLocaleDateString()
      }));
    } catch (error) {
      console.error("History Error:", error);
      throw new Error("기록을 불러오는 중 오류가 발생했습니다.");
    }
  },
  
  getDreamInterpretation: async ({ keyword, isPaid, userId }) => {
    // 한국풍 페르소나 설정
    const persona = "당신은 한국의 신비로운 꿈 해몽가입니다. 옛날 이야기하듯 고어체와 경어체를 섞어 신뢰감 있고 다정하게 말하세요.";
    
    let prompt = "";
    if (isPaid) {
      prompt = `${persona} 사용자가 '${keyword}'라는 꿈을 꿨습니다. 이 꿈의 길흉화복을 아주 상세하게, 재물운, 연애운, 건강운으로 나누어 1000자 내외로 분석해주세요.`;
    } else {
      prompt = `${persona} 사용자가 '${keyword}'라는 꿈을 꿨습니다. 이 꿈의 핵심 의미를 2문장으로 짧고 강렬하게 요약해주세요. 맛보기 결과이므로 너무 자세히 알려주지 마세요.`;
    }

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // DB에 결과 저장 (무료 맛보기인 경우)
      let dbResult;
      if (!isPaid) {
        const query = `
          INSERT INTO fortune_results (input_content, type, summary_result, is_paid, user_id)
          VALUES ($1, 'dream', $2, false, $3)
          RETURNING id
        `;
        dbResult = await pool.query(query, [keyword, text, userId || null]);
      }

      return {
        id: dbResult ? dbResult.rows[0].id : null,
        summary: isPaid ? null : text,
        detail: isPaid ? text : null
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("신령님과 접신에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  },

  getSajuFortune: async ({ birthDate, birthTime, gender, calendarType, isPaid, userId }) => {
    const genderStr = gender === 'male' ? '남성' : '여성';
    const calendarStr = calendarType === 'solar' ? '양력' : '음력';
    const timeStr = birthTime ? birthTime : '시간 모름';
    const formattedInput = `${birthDate} ${timeStr} (${calendarStr}, ${genderStr})`;

    const persona = "당신은 40년 경력의 정통 명리학자이자 도사입니다. 사주팔자(Four Pillars of Destiny)의 원리에 입각하여 전문적인 용어(일간, 용신, 오행의 과다/고립 등)를 적절히 섞어 사용하되, 일반인이 이해하기 쉽게 풀이해야 합니다.";
    
    let prompt = "";
    if (isPaid) {
      prompt = `${persona} 
      사용자 정보: ${formattedInput}
      
      위 정보를 바탕으로 다음 순서에 맞춰 상세한 사주 풀이를 작성해주세요 (공백 포함 1500자 내외):
      1. [사주 구성 및 오행 분석]: 일간(본원)을 중심으로 오행의 분포와 강약을 분석하고, 타고난 기질을 설명.
      2. [총운 및 흐름]: 초년, 중년, 말년의 대략적인 흐름과 현재 대운의 영향.
      3. [재물운과 직업운]: 재성(재물)과 관성(직업/명예)의 동태를 분석하여 적성과 부의 그릇을 판단.
      4. [애정운 및 건강운]: 배우자운과 주의해야 할 건강 문제.
      5. [개운법 및 조언]: 부족한 기운을 보완하는 방법(색상, 방향, 마음가짐 등)과 신령한 조언.
      
      말투는 예스럽고 신비로우면서도, 명확한 통찰력을 보여주세요.`;
    } else {
      prompt = `${persona} 생년월일시가 '${formattedInput}'인 사람의 사주에서 일간(日干)의 특성과 가장 두드러지는 오행을 중심으로 핵심 운세를 2문장으로 짧고 강렬하게 요약해주세요. 맛보기 결과이므로 너무 자세히 알려주지 말고, "더 깊은 천기(天機)는 복채를 내고 확인하게나."라는 뉘앙스로 마무리하세요.`;
    }

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      let dbResult;
      if (!isPaid) {
        const query = `
          INSERT INTO fortune_results (input_content, type, summary_result, is_paid, user_id)
          VALUES ($1, 'saju', $2, false, $3)
          RETURNING id
        `;
        dbResult = await pool.query(query, [formattedInput, text, userId || null]);
      }

      return {
        id: dbResult ? dbResult.rows[0].id : null,
        summary: isPaid ? null : text,
        detail: isPaid ? text : null
      };
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("신령님과 접신에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  },

  // 포인트 충전 (결제 완료 후 호출)
  chargeCredits: async ({ userId, paymentAmount, creditAmount, impUid, merchantUid }) => {
    try {
      // 실제 서비스에서는 여기서 아임포트(PortOne) API를 호출하여 impUid로 결제 검증을 해야 합니다.
      // 지금은 검증되었다고 가정하고 진행합니다.
      
      // 1. 결제 내역 저장 (실제 결제 금액)
      await pool.query(
        'INSERT INTO payments (user_id, amount, imp_uid, merchant_uid) VALUES ($1, $2, $3, $4)',
        [userId, paymentAmount, impUid, merchantUid]
      );

      // 2. 사용자 포인트 증가 (보너스 포함된 복채)
      const res = await pool.query(
        'UPDATE profiles SET credits = credits + $1 WHERE id = $2 RETURNING credits',
        [creditAmount, userId]
      );

      if (res.rows.length === 0) {
        throw new Error("사용자 프로필을 찾을 수 없습니다. (DB 확인 필요)");
      }

      return res.rows[0].credits;
    } catch (error) {
      console.error("Charge Error:", error);
      throw new Error("포인트 충전 중 오류가 발생했습니다.");
    }
  },

  // 포인트 사용 및 결과 잠금 해제
  unlockWithCredits: async ({ id, userId }) => {
    try {
      // 1. 사용자 포인트 확인 및 차감 (500 포인트)
      const userRes = await pool.query('SELECT credits FROM profiles WHERE id = $1', [userId]);
      if (userRes.rows.length === 0) throw new Error("사용자 정보를 찾을 수 없습니다.");
      
      const currentCredits = userRes.rows[0].credits;
      if (currentCredits < 500) {
        throw new Error("포인트가 부족합니다. 충전 후 이용해주세요.");
      }

      // 포인트 차감
      await pool.query('UPDATE profiles SET credits = credits - 500 WHERE id = $1', [userId]);

      // 2. 저장된 기록 가져오기
      const selectRes = await pool.query('SELECT input_content, type FROM fortune_results WHERE id = $1', [id]);
      if (selectRes.rows.length === 0) throw new Error("해당 꿈 기록을 찾을 수 없습니다.");
      
      const { input_content: keyword, type } = selectRes.rows[0];
      let persona = "당신은 한국의 신비로운 점술가입니다. 옛날 이야기하듯 고어체와 경어체를 섞어 신뢰감 있고 다정하게 말하세요.";
      
      let prompt = "";
      if (type === 'dream') {
        prompt = `${persona} 사용자가 '${keyword}'라는 꿈을 꿨습니다. 이 꿈의 길흉화복을 아주 상세하게, 재물운, 연애운, 건강운으로 나누어 1000자 내외로 분석해주세요.`;
      } else {
        persona = "당신은 40년 경력의 정통 명리학자이자 도사입니다.";
        prompt = `${persona} 
        사용자 정보: ${keyword}
        
        위 정보를 바탕으로 다음 순서에 맞춰 상세한 사주 풀이를 작성해주세요 (공백 포함 1500자 내외):
        1. [사주 구성 및 오행 분석]: 일간(본원)을 중심으로 오행의 분포와 강약을 분석하고, 타고난 기질을 설명.
        2. [총운 및 흐름]: 초년, 중년, 말년의 대략적인 흐름과 현재 대운의 영향.
        3. [재물운과 직업운]: 재성(재물)과 관성(직업/명예)의 동태를 분석하여 적성과 부의 그릇을 판단.
        4. [애정운 및 건강운]: 배우자운과 주의해야 할 건강 문제.
        5. [개운법 및 조언]: 부족한 기운을 보완하는 방법(색상, 방향, 마음가짐 등)과 신령한 조언.
        
        말투는 예스럽고 신비로우면서도, 명확한 통찰력을 보여주세요.`;
      }

      // 3. 상세 분석 생성
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // 4. DB 업데이트 (결과 저장)
      await pool.query(
        'UPDATE fortune_results SET detail_result = $1, is_paid = true WHERE id = $2',
        [text, id]
      );

      return {
        id: id,
        summary: null,
        detail: text
      };
    } catch (error) {
      console.error("Unlock Error:", error);
      // 에러 메시지를 그대로 전달 (포인트 부족 등)
      throw new Error(error.message || "상세 풀이를 가져오는 중 오류가 발생했습니다.");
    }
  },

  // (신규) 바로 상세 풀이 생성 (무료 단계 생략)
  createAndUnlockFortune: async ({ type, input, userId }) => {
    try {
      // 1. 포인트 확인 및 차감
      const userRes = await pool.query('SELECT credits FROM profiles WHERE id = $1', [userId]);
      if (userRes.rows.length === 0) throw new Error("사용자 정보를 찾을 수 없습니다.");
      
      const currentCredits = userRes.rows[0].credits;
      if (currentCredits < 500) {
        throw new Error("포인트가 부족합니다. 충전 후 이용해주세요.");
      }
      await pool.query('UPDATE profiles SET credits = credits - 500 WHERE id = $1', [userId]);

      // 2. 상세 분석 생성
      let persona = "당신은 한국의 신비로운 점술가입니다. 옛날 이야기하듯 고어체와 경어체를 섞어 신뢰감 있고 다정하게 말하세요.";
      let prompt = "";
      
      if (type === 'dream') {
        prompt = `${persona} 사용자가 '${input}'라는 꿈을 꿨습니다. 이 꿈의 길흉화복을 아주 상세하게, 재물운, 연애운, 건강운으로 나누어 1000자 내외로 분석해주세요.`;
      } else {
        persona = "당신은 40년 경력의 정통 명리학자이자 도사입니다.";
        prompt = `${persona} 
        사용자 정보: ${input}
        
        위 정보를 바탕으로 다음 순서에 맞춰 상세한 사주 풀이를 작성해주세요 (공백 포함 1500자 내외):
        1. [사주 구성 및 오행 분석]: 일간(본원)을 중심으로 오행의 분포와 강약을 분석하고, 타고난 기질을 설명.
        2. [총운 및 흐름]: 초년, 중년, 말년의 대략적인 흐름과 현재 대운의 영향.
        3. [재물운과 직업운]: 재성(재물)과 관성(직업/명예)의 동태를 분석하여 적성과 부의 그릇을 판단.
        4. [애정운 및 건강운]: 배우자운과 주의해야 할 건강 문제.
        5. [개운법 및 조언]: 부족한 기운을 보완하는 방법(색상, 방향, 마음가짐 등)과 신령한 조언.
        
        말투는 예스럽고 신비로우면서도, 명확한 통찰력을 보여주세요.`;
      }

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // 3. DB 저장 (결제 완료 상태로 저장)
      const insertRes = await pool.query(
        `INSERT INTO fortune_results (input_content, type, detail_result, is_paid, user_id)
         VALUES ($1, $2, $3, true, $4)
         RETURNING id`,
        [input, type, text, userId]
      );

      return {
        id: insertRes.rows[0].id,
        summary: null,
        detail: text
      };
    } catch (error) {
      console.error("Direct Unlock Error:", error);
      throw new Error(error.message || "상세 풀이를 생성하는 중 오류가 발생했습니다.");
    }
  },
};

const app = express();

app.use(cors());

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

module.exports = app;
