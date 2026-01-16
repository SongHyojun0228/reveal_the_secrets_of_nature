require('dotenv').config({ override: true });
const app = require('./server');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 신비한 꿈 해몽소 서버가 http://localhost:${PORT}/graphql 에서 실행 중입니다.`);
});