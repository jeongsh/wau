<template>
  <div class="worldcup-container">
    <!-- 배경 장식 요소들 -->
    <div class="background-elements">
      <div class="floating-shape shape-1">💼</div>
      <div class="floating-shape shape-2">🚀</div>
      <div class="floating-shape shape-3">💡</div>
      <div class="floating-shape shape-4">⭐</div>
      <div class="floating-shape shape-5">🎯</div>
      <div class="floating-shape shape-6">📈</div>
      <div class="floating-shape shape-7">💻</div>
      <div class="floating-shape shape-8">🏆</div>
      <div class="floating-circle circle-1"></div>
      <div class="floating-circle circle-2"></div>
      <div class="floating-circle circle-3"></div>
      <div class="floating-circle circle-4"></div>
      <div class="floating-circle circle-5"></div>
    </div>

    <!-- 시작 화면 -->
    <div v-if="gameState === 'start'" class="start-screen">
      <div class="start-content">
        <div class="title-container">
          <div class="trophy-animation">
            <div class="trophy-glow"></div>
            <span class="trophy">🏆</span>
          </div>
          <h1 class="title">
            <span class="gradient-text">이상형 월드컵</span>
          </h1>
          <div class="trophy-animation">
            <div class="trophy-glow"></div>
            <span class="trophy">🏆</span>
          </div>
        </div>
        <p class="subtitle">
          <span class="highlight-text">당신의 이상형 회사</span>를 찾아보세요!
        </p>
        <div class="stats-info">
          <div class="stat-item">
            <span class="stat-number">64</span>
            <span class="stat-label">개 기업</span>
          </div>
          <div class="stat-divider">|</div>
          <div class="stat-item">
            <span class="stat-number">∞</span>
            <span class="stat-label">가지 선택</span>
          </div>
        </div>
        <div class="tournament-options">
          <button 
            v-for="option in tournamentOptions" 
            :key="option.value"
            @click="startGame(option.value)"
            class="tournament-btn"
          >
            <span class="btn-icon">{{ getButtonIcon(option.value) }}</span>
            <span class="btn-text">{{ option.label }}</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
        <div class="feature-highlights">
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <span class="feature-text">빠른 선택</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎨</span>
            <span class="feature-text">아름다운 UI</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🏢</span>
            <span class="feature-text">실제 기업</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 게임 진행 화면 -->
    <div v-else-if="gameState === 'playing'" class="game-screen">
      <div class="game-header">
        <div class="round-badge">
          <span class="round-icon">🔥</span>
          <span class="round-text">{{ currentRoundName }}</span>
        </div>
        <div class="match-info">
          <span class="match-progress">{{ currentMatchIndex + 1 }} / {{ totalMatches }}</span>
          <div class="remaining-count">
            <span class="remaining-text">남은 경기</span>
            <span class="remaining-number">{{ totalMatches - currentMatchIndex - 1 }}</span>
          </div>
        </div>
        <div class="progress-container">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: `${progressPercentage}%` }"
            ></div>
          </div>
          <div class="progress-percentage">{{ Math.round(progressPercentage) }}%</div>
        </div>
      </div>

      <div class="battle-arena">
        <div class="vs-container">
          <div class="company-card left" @click="selectCompany(currentMatch[0])">
            <div class="card-glow left-glow"></div>
            <div class="company-badge">{{ currentMatch[0].category }}</div>
            <div class="company-emoji">{{ currentMatch[0].emoji }}</div>
            <h3 class="company-name">{{ currentMatch[0].name }}</h3>
            <div class="company-stats">
              <div class="stat-chip">
                <span class="stat-icon">⭐</span>
                <span>대표기업</span>
              </div>
            </div>
            <p class="company-description">{{ currentMatch[0].description }}</p>
            <div class="click-hint">
              <span class="hint-text">선택하기</span>
              <span class="hint-arrow">👆</span>
            </div>
          </div>

          <div class="vs-divider">
            <div class="vs-circle">
              <div class="vs-inner">
                <span class="vs-text">VS</span>
                <div class="battle-sparks">
                  <div class="spark spark-1">⚡</div>
                  <div class="spark spark-2">💥</div>
                  <div class="spark spark-3">✨</div>
                </div>
              </div>
            </div>
          </div>

          <div class="company-card right" @click="selectCompany(currentMatch[1])">
            <div class="card-glow right-glow"></div>
            <div class="company-badge">{{ currentMatch[1].category }}</div>
            <div class="company-emoji">{{ currentMatch[1].emoji }}</div>
            <h3 class="company-name">{{ currentMatch[1].name }}</h3>
            <div class="company-stats">
              <div class="stat-chip">
                <span class="stat-icon">⭐</span>
                <span>대표기업</span>
              </div>
            </div>
            <p class="company-description">{{ currentMatch[1].description }}</p>
            <div class="click-hint">
              <span class="hint-text">선택하기</span>
              <span class="hint-arrow">👆</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 결과 화면 -->
    <div v-else-if="gameState === 'result'" class="result-screen">
      <div class="celebration-bg">
        <div class="confetti">🎊</div>
        <div class="confetti">🎉</div>
        <div class="confetti">🏆</div>
        <div class="confetti">⭐</div>
        <div class="confetti">🎊</div>
        <div class="confetti">💼</div>
        <div class="confetti">🚀</div>
        <div class="confetti">💡</div>
      </div>
      
      <div class="winner-announcement">
        <div class="crown-animation">
          <span class="crown">👑</span>
        </div>
        <h1 class="winner-title">
          <span class="celebration-emoji">🎉</span>
          <span class="gradient-text">우승자</span>
          <span class="celebration-emoji">🎉</span>
        </h1>
        
        <div class="winner-card">
          <div class="winner-glow"></div>
          <div class="winner-badge">
            <span class="badge-icon">🏆</span>
            <span class="badge-text">WINNER</span>
          </div>
          <div class="winner-emoji">{{ winner?.emoji }}</div>
          <h2 class="winner-name">{{ winner?.name }}</h2>
          <div class="winner-category">
            <span class="category-icon">🏢</span>
            <span>{{ winner?.category }}</span>
          </div>
          <p class="winner-description">{{ winner?.description }}</p>
          <div class="achievement-stats">
            <div class="achievement-item">
              <span class="achievement-icon">🎯</span>
              <span class="achievement-text">최종 선택</span>
            </div>
            <div class="achievement-item">
              <span class="achievement-icon">⚡</span>
              <span class="achievement-text">승리</span>
            </div>
          </div>
        </div>
        
        <div class="result-actions">
          <button @click="restartGame" class="restart-btn">
            <span class="btn-icon">🔄</span>
            <span>다시 하기</span>
          </button>
          <button @click="goHome" class="home-btn">
            <span class="btn-icon">🏠</span>
            <span>처음으로</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Company {
  id: number;
  name: string;
  category: string;
  logo: string;
  emoji: string;
  description: string;
}

const companies: Company[] = [
  { id: 1, name: '삼성전자', category: 'IT/전자', logo: 'samsung.png', emoji: '📱', description: '스마트폰과 반도체로 유명한 글로벌 기업' },
  { id: 2, name: '카카오', category: 'IT/플랫폼', logo: 'kakao.png', emoji: '💬', description: '카카오톡과 다양한 플랫폼 서비스' },
  { id: 3, name: 'LG전자', category: 'IT/전자', logo: 'lg.png', emoji: '🏠', description: '가전제품과 혁신 기술의 선두주자' },
  { id: 4, name: '네이버', category: 'IT/검색', logo: 'naver.png', emoji: '🔍', description: '검색과 웹툰, 클라우드 서비스' },
  { id: 5, name: '현대자동차', category: '자동차', logo: 'hyundai.png', emoji: '🚗', description: '친환경 자동차와 모빌리티 혁신' },
  { id: 6, name: 'SK하이닉스', category: 'IT/반도체', logo: 'skhynix.png', emoji: '🔧', description: '메모리 반도체 세계 2위 기업' },
  { id: 7, name: '쿠팡', category: '이커머스', logo: 'coupang.png', emoji: '📦', description: '로켓배송으로 유명한 온라인 쇼핑몰' },
  { id: 8, name: 'CJ ENM', category: '엔터테인먼트', logo: 'cjenm.png', emoji: '🎬', description: 'K-콘텐츠와 엔터테인먼트 전문' },
  { id: 9, name: '넷마블', category: '게임', logo: 'netmarble.png', emoji: '🎮', description: '모바일 게임 개발과 서비스' },
  { id: 10, name: '배달의민족', category: '푸드테크', logo: 'baemin.png', emoji: '🍔', description: '음식 배달 플랫폼의 대표주자' },
  { id: 11, name: 'NAVER웹툰', category: '콘텐츠', logo: 'naverwebtoon.png', emoji: '📚', description: '글로벌 웹툰 플랫폼' },
  { id: 12, name: 'KB국민은행', category: '금융', logo: 'kb.png', emoji: '🏦', description: '디지털 금융 서비스 선도' },
  { id: 13, name: '아모레퍼시픽', category: '화장품', logo: 'amorepacific.png', emoji: '💄', description: 'K-뷰티를 대표하는 화장품 기업' },
  { id: 14, name: '엔씨소프트', category: '게임', logo: 'ncsoft.png', emoji: '⚔️', description: 'MMORPG 게임 개발의 선구자' },
  { id: 15, name: '토스', category: '핀테크', logo: 'toss.png', emoji: '💳', description: '간편 송금과 금융 서비스 혁신' },
  { id: 16, name: '당근마켓', category: '플랫폼', logo: 'daangn.png', emoji: '🥕', description: '지역 기반 중고거래 플랫폼' },
  
  // 32강을 위한 추가 회사들
  { id: 17, name: '신한은행', category: '금융', logo: 'shinhan.png', emoji: '🏛️', description: '디지털 혁신을 선도하는 금융기관' },
  { id: 18, name: '롯데', category: '유통/식품', logo: 'lotte.png', emoji: '🍭', description: '글로벌 유통과 식품 전문기업' },
  { id: 19, name: 'SK텔레콤', category: '통신', logo: 'skt.png', emoji: '📶', description: '5G와 AI 기술의 선두주자' },
  { id: 20, name: 'KT', category: '통신', logo: 'kt.png', emoji: '📡', description: '디지털 플랫폼 기업으로 변화' },
  { id: 21, name: 'LG유플러스', category: '통신', logo: 'lguplus.png', emoji: '🌐', description: '차별화된 통신 서비스 제공' },
  { id: 22, name: '포스코', category: '철강', logo: 'posco.png', emoji: '⚙️', description: '글로벌 철강 및 소재 전문기업' },
  { id: 23, name: 'GS25', category: '유통', logo: 'gs25.png', emoji: '🏪', description: '편의점 프랜차이즈의 리더' },
  { id: 24, name: '11번가', category: '이커머스', logo: '11st.png', emoji: '🛒', description: '온라인 쇼핑몰 플랫폼' },
  { id: 25, name: '마켓컬리', category: '이커머스', logo: 'kurly.png', emoji: '🥬', description: '신선식품 새벽배송 서비스' },
  { id: 26, name: '우아한형제들', category: '푸드테크', logo: 'woowa.png', emoji: '🚴', description: '배달앱과 푸드테크 혁신' },
  { id: 27, name: '무신사', category: '패션', logo: 'musinsa.png', emoji: '👕', description: '패션 플랫폼의 대표주자' },
  { id: 28, name: '29CM', category: '패션', logo: '29cm.png', emoji: '👗', description: '프리미엄 패션 큐레이션' },
  { id: 29, name: '왓챠', category: '엔터테인먼트', logo: 'watcha.png', emoji: '🎥', description: '개인화된 영상 콘텐츠 플랫폼' },
  { id: 30, name: '라인', category: 'IT/메신저', logo: 'line.png', emoji: '💚', description: '글로벌 메신저와 플랫폼 서비스' },
  { id: 31, name: '야놀자', category: '여행/숙박', logo: 'yanolja.png', emoji: '🏨', description: '여행과 숙박의 모든 것' },
  { id: 32, name: '여기어때', category: '여행/숙박', logo: 'goodchoice.png', emoji: '🛏️', description: '숙박 예약 플랫폼' },

  // 64강을 위한 추가 회사들
  { id: 33, name: '하나은행', category: '금융', logo: 'hana.png', emoji: '🌸', description: '글로벌 금융 서비스' },
  { id: 34, name: '우리은행', category: '금융', logo: 'woori.png', emoji: '🔵', description: '디지털 금융 혁신' },
  { id: 35, name: '현대백화점', category: '유통', logo: 'hyundai-dept.png', emoji: '🏬', description: '프리미엄 백화점 문화' },
  { id: 36, name: '신세계', category: '유통', logo: 'shinsegae.png', emoji: '🛍️', description: '리테일과 패션의 선두주자' },
  { id: 37, name: 'CU', category: '유통', logo: 'cu.png', emoji: '🏪', description: '편의점 생활 플랫폼' },
  { id: 38, name: 'BGF리테일', category: '유통', logo: 'bgf.png', emoji: '🏢', description: '유통업계의 혁신 리더' },
  { id: 39, name: '교보문고', category: '서적/문화', logo: 'kyobo.png', emoji: '📖', description: '독서문화의 중심' },
  { id: 40, name: '예스24', category: '서적/문화', logo: 'yes24.png', emoji: '📚', description: '온라인 서점과 문화 플랫폼' },
  { id: 41, name: '알라딘', category: '서적/문화', logo: 'aladin.png', emoji: '🧞', description: '중고도서와 신간의 만남' },
  { id: 42, name: '인터파크', category: '이커머스', logo: 'interpark.png', emoji: '🎪', description: '종합 온라인 쇼핑몰' },
  { id: 43, name: 'SSG닷컴', category: '이커머스', logo: 'ssg.png', emoji: '🛒', description: '신세계그룹의 온라인 플랫폼' },
  { id: 44, name: '위메프', category: '이커머스', logo: 'wemakeprice.png', emoji: '💰', description: '소셜커머스의 선구자' },
  { id: 45, name: '티몬', category: '이커머스', logo: 'tmon.png', emoji: '⏰', description: '타임딜과 특가의 전문가' },
  { id: 46, name: '카카오뱅크', category: '핀테크', logo: 'kakaobank.png', emoji: '🏦', description: '모바일 전용 은행의 혁신' },
  { id: 47, name: '케이뱅크', category: '핀테크', logo: 'kbank.png', emoji: '💳', description: '디지털 뱅킹 서비스' },
  { id: 48, name: '페이코', category: '핀테크', logo: 'payco.png', emoji: '📱', description: 'NHN의 간편결제 서비스' },
  { id: 49, name: '삼성페이', category: '핀테크', logo: 'samsungpay.png', emoji: '💳', description: '삼성의 모바일 결제' },
  { id: 50, name: '엘지페이', category: '핀테크', logo: 'lgpay.png', emoji: '📲', description: 'LG의 간편결제 솔루션' },
  { id: 51, name: '컴투스', category: '게임', logo: 'com2us.png', emoji: '🎮', description: '모바일 게임의 글로벌 리더' },
  { id: 52, name: '넥슨', category: '게임', logo: 'nexon.png', emoji: '🕹️', description: '온라인 게임의 선구자' },
  { id: 53, name: '크래프톤', category: '게임', logo: 'krafton.png', emoji: '🔫', description: '배틀그라운드 개발사' },
  { id: 54, name: '펄어비스', category: '게임', logo: 'pearlabyss.png', emoji: '⚔️', description: '검은사막으로 유명한 게임사' },
  { id: 55, name: '스마일게이트', category: '게임', logo: 'smilegate.png', emoji: '😊', description: '크로스파이어 개발사' },
  { id: 56, name: '데브시스터즈', category: '게임', logo: 'devsisters.png', emoji: '🍪', description: '쿠키런 시리즈 개발사' },
  { id: 57, name: 'JYP엔터테인먼트', category: '엔터테인먼트', logo: 'jyp.png', emoji: '🎵', description: 'K-POP 엔터테인먼트' },
  { id: 58, name: 'SM엔터테인먼트', category: '엔터테인먼트', logo: 'sm.png', emoji: '🌟', description: '한류의 중심 엔터테인먼트' },
  { id: 59, name: 'YG엔터테인먼트', category: '엔터테인먼트', logo: 'yg.png', emoji: '🎤', description: '힙합과 아이돌의 명가' },
  { id: 60, name: 'HYBE', category: '엔터테인먼트', logo: 'hybe.png', emoji: '💜', description: 'BTS를 키운 엔터테인먼트' },
  { id: 61, name: '카카오엔터테인먼트', category: '엔터테인먼트', logo: 'kakaoent.png', emoji: '🎬', description: '웹툰과 웹소설의 메카' },
  { id: 62, name: '네이버Z', category: 'IT/메타버스', logo: 'naverz.png', emoji: '🌍', description: '메타버스 플랫폼 제페토' },
  { id: 63, name: '스카이랩스', category: 'IT/AI', logo: 'skylabs.png', emoji: '🚀', description: 'AI와 빅데이터 전문기업' },
  { id: 64, name: '뤼이드', category: 'IT/교육', logo: 'riiid.png', emoji: '🎓', description: 'AI 기반 교육 솔루션' }
];

const tournamentOptions = [
  { label: '32강 토너먼트', value: 32 },
];

// 게임 상태 관리
const gameState = ref<'start' | 'playing' | 'result'>('start');
const currentRound = ref<Company[]>([]);
const currentMatchIndex = ref(0);
const winner = ref<Company | null>(null);
const selectedTournamentSize = ref(64);
const roundWinners = ref<Company[]>([]); // 현재 라운드의 승자들

// 현재 매치 정보
const currentMatch = computed(() => {
  if (currentRound.value.length >= 2) {
    return [
      currentRound.value[currentMatchIndex.value * 2],
      currentRound.value[currentMatchIndex.value * 2 + 1]
    ];
  }
  return [];
});

// 라운드 이름 계산
const currentRoundName = computed(() => {
  const remaining = currentRound.value.length;
  if (remaining === 2) return '결승';
  if (remaining === 4) return '준결승';
  if (remaining === 8) return '8강';
  if (remaining === 16) return '16강';
  if (remaining === 32) return '32강';
  if (remaining === 64) return '64강';
  return `${remaining}강`;
});

// 전체 매치 수
const totalMatches = computed(() => {
  return Math.floor(currentRound.value.length / 2);
});

// 진행률 계산
const progressPercentage = computed(() => {
  if (totalMatches.value === 0) return 0;
  return ((currentMatchIndex.value + 1) / totalMatches.value) * 100;
});

// 버튼 아이콘 반환 함수
const getButtonIcon = (value: number) => {
  const icons: Record<number, string> = {
    4: '🔥',
    8: '⚡',
    16: '⭐',
    32: '🚀',
    64: '👑'
  };
  return icons[value] || '🏆';
};

// 게임 시작
const startGame = (tournamentSize: number) => {
  selectedTournamentSize.value = tournamentSize;
  const shuffled = [...companies].sort(() => Math.random() - 0.5);
  currentRound.value = shuffled.slice(0, tournamentSize);
  currentMatchIndex.value = 0;
  roundWinners.value = [];
  gameState.value = 'playing';
};

// 회사 선택
const selectCompany = (selectedCompany: Company) => {
  // 선택된 회사를 다음 라운드 진출자로 추가
  roundWinners.value.push(selectedCompany);
  
  // 다음 매치로 이동
  currentMatchIndex.value++;
  
  // 현재 라운드가 끝났는지 확인
  if (currentMatchIndex.value >= totalMatches.value) {
    // 라운드 완료
    if (roundWinners.value.length === 1) {
      // 우승자 결정
      winner.value = roundWinners.value[0];
      gameState.value = 'result';
    } else {
      // 다음 라운드 시작
      currentRound.value = [...roundWinners.value];
      roundWinners.value = [];
      currentMatchIndex.value = 0;
    }
  }
};

// 게임 재시작
const restartGame = () => {
  startGame(selectedTournamentSize.value);
};

// 홈으로 돌아가기
const goHome = () => {
  gameState.value = 'start';
  currentRound.value = [];
  currentMatchIndex.value = 0;
  roundWinners.value = [];
  winner.value = null;
};

onMounted(() => {
  console.log('World Cup page mounted');
});
</script>

<style lang="scss" scoped>
.worldcup-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f7f6fe 0%, #edecfe 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(124, 77, 255, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(69, 213, 76, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
}

// 배경 장식 요소들
.background-elements {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;

  .floating-shape {
    position: absolute;
    font-size: 2rem;
    opacity: 0.3;
    animation: float 6s ease-in-out infinite;

    &.shape-1 { top: 10%; left: 15%; animation-delay: 0s; }
    &.shape-2 { top: 20%; right: 20%; animation-delay: 1s; }
    &.shape-3 { top: 60%; left: 10%; animation-delay: 2s; }
    &.shape-4 { top: 70%; right: 15%; animation-delay: 3s; }
    &.shape-5 { top: 40%; right: 30%; animation-delay: 4s; }
    &.shape-6 { top: 30%; left: 25%; animation-delay: 5s; }
    &.shape-7 { top: 80%; left: 40%; animation-delay: 2.5s; }
    &.shape-8 { top: 15%; left: 60%; animation-delay: 1.5s; }
  }

  .floating-circle {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(124, 77, 255, 0.1), rgba(69, 213, 76, 0.1));
    animation: float 8s ease-in-out infinite;

    &.circle-1 { 
      width: 60px; height: 60px; 
      top: 25%; left: 5%; 
      animation-delay: 0.5s; 
    }
    &.circle-2 { 
      width: 80px; height: 80px; 
      top: 45%; right: 10%; 
      animation-delay: 1.5s; 
    }
    &.circle-3 { 
      width: 40px; height: 40px; 
      top: 75%; left: 70%; 
      animation-delay: 2.5s; 
    }
    &.circle-4 { 
      width: 50px; height: 50px; 
      top: 10%; right: 40%; 
      animation-delay: 3.5s; 
    }
    &.circle-5 { 
      width: 70px; height: 70px; 
      top: 85%; right: 60%; 
      animation-delay: 4.5s; 
    }
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

// 시작 화면
.start-screen {
  text-align: center;
  color: #121212;
  position: relative;
  z-index: 1;

  .title-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;

    .trophy-animation {
      position: relative;
      
      .trophy {
        font-size: 3rem;
        animation: pulse 2s infinite;
      }
      
      .trophy-glow {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3), transparent);
        animation: glow 2s infinite;
      }
    }
  }

  .title {
    font-size: 3.5rem;
    margin: 0;
    color: #121212;
    font-weight: 800;
    letter-spacing: -1px;
    
    .gradient-text {
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .subtitle {
    font-size: 1.3rem;
    margin-bottom: 2rem;
    color: #444444;
    font-weight: 300;
    
    .highlight-text {
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
    }
  }

  .stats-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    margin-bottom: 3rem;
    padding: 1rem 2rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 16px;
    border: 1px solid rgba(124, 77, 255, 0.1);
    backdrop-filter: blur(10px);
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .stat-number {
        font-size: 1.8rem;
        font-weight: 800;
        color: #7C4DFF;
      }
      
      .stat-label {
        font-size: 0.9rem;
        color: #666;
        font-weight: 500;
      }
    }

    .stat-divider {
      color: #ddd;
      font-size: 1.5rem;
    }
  }

  .tournament-options {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-width: 350px;
    margin: 0 auto 2rem;
  }

  .tournament-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 28px;
    font-size: 1.1rem;
    font-weight: 600;
    border: none;
    border-radius: 16px;
    background: #ffffff;
    color: #121212;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(124, 77, 255, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

    .btn-icon {
      font-size: 1.3rem;
    }

    .btn-text {
      flex: 1;
      text-align: center;
    }

    .btn-arrow {
      font-size: 1.1rem;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: #7C4DFF;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(124, 77, 255, 0.3);
      
      .btn-arrow {
        transform: translateX(5px);
      }
    }
  }

  .feature-highlights {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    margin-top: 2rem;

    .feature-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.8rem 1.2rem;
      background: rgba(255, 255, 255, 0.6);
      border-radius: 12px;
      border: 1px solid rgba(124, 77, 255, 0.1);
      backdrop-filter: blur(5px);

      .feature-icon {
        font-size: 1.2rem;
      }

      .feature-text {
        font-size: 0.9rem;
        font-weight: 500;
        color: #666;
      }
    }
  }
}

// 게임 화면
.game-screen {
  width: 100%;
  max-width: 1200px;
  color: #121212;
  position: relative;
  z-index: 1;

  .game-header {
    text-align: center;
    margin-bottom: 3rem;

    .round-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 20px;
      font-weight: 700;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      box-shadow: 0 4px 16px rgba(124, 77, 255, 0.3);
    }

    .match-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding: 0 1rem;

      .match-progress {
        font-size: 1.1rem;
        color: #777777;
        font-weight: 600;
      }

      .remaining-count {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 12px;
        border: 1px solid rgba(124, 77, 255, 0.1);

        .remaining-text {
          font-size: 0.9rem;
          color: #666;
        }

        .remaining-number {
          font-size: 1rem;
          font-weight: 700;
          color: #7C4DFF;
        }
      }
    }

    .progress-container {
      position: relative;
      margin-bottom: 1rem;

      .progress-bar {
        width: 100%;
        height: 8px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 10px;
        overflow: hidden;
        border: 1px solid rgba(124, 77, 255, 0.1);
        box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7C4DFF 0%, #45D54C 100%);
          transition: width 0.6s ease;
          position: relative;
          
          &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 10px;
            height: 100%;
            background: rgba(255, 255, 255, 0.3);
            animation: shimmer 1.5s infinite;
          }
        }
      }

      .progress-percentage {
        position: absolute;
        right: 0;
        top: -25px;
        font-size: 0.9rem;
        font-weight: 600;
        color: #7C4DFF;
      }
    }
  }

  .battle-arena {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(124, 77, 255, 0.1), transparent);
      animation: battleGlow 3s infinite;
      z-index: -1;
    }
  }

  .vs-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 2.5rem;
    align-items: center;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  .company-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 2.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(124, 77, 255, 0.1);
    min-height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;

    .card-glow {
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #7C4DFF, #45D54C);
      border-radius: 24px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: -1;
    }

    .company-badge {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      color: white;
      padding: 0.4rem 0.8rem;
      border-radius: 8px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    &:hover {
      transform: translateY(-5px);
      border-color: transparent;
      box-shadow: 0 12px 32px rgba(124, 77, 255, 0.2);

      .card-glow {
        opacity: 1;
      }

      .company-emoji {
        transform: scale(1.1);
      }

      .click-hint {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .company-emoji {
      font-size: 4.5rem;
      margin-bottom: 1.2rem;
      transition: transform 0.3s ease;
    }

    .company-name {
      font-size: 1.9rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
      color: #121212;
    }

    .company-stats {
      margin-bottom: 1rem;

      .stat-chip {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        background: rgba(124, 77, 255, 0.1);
        color: #7C4DFF;
        padding: 0.4rem 0.8rem;
        border-radius: 12px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .company-description {
      font-size: 0.95rem;
      color: #444444;
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .click-hint {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.3s ease;
      color: #7C4DFF;
      font-weight: 600;
      font-size: 0.9rem;

      .hint-arrow {
        animation: bounce 1s infinite;
      }
    }
  }

  .vs-divider {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      order: -1;
    }

    .vs-circle {
      position: relative;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 24px rgba(124, 77, 255, 0.3);

      .vs-inner {
        position: relative;
        width: 85px;
        height: 85px;
        background: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .vs-text {
          font-size: 1.8rem;
          font-weight: 800;
          color: #121212;
        }

        .battle-sparks {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          .spark {
            position: absolute;
            font-size: 1.2rem;
            animation: sparkle 2s infinite;

            &.spark-1 {
              top: -10px;
              left: 50%;
              animation-delay: 0s;
            }

            &.spark-2 {
              right: -10px;
              top: 50%;
              animation-delay: 0.7s;
            }

            &.spark-3 {
              bottom: -10px;
              left: 50%;
              animation-delay: 1.4s;
            }
          }
        }
      }
    }
  }
}

// 결과 화면
.result-screen {
  text-align: center;
  color: #121212;
  position: relative;
  z-index: 1;

  .celebration-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 0;

    .confetti {
      position: absolute;
      font-size: 2rem;
      animation: confettiFall 3s infinite;

      &:nth-child(1) { left: 10%; animation-delay: 0s; }
      &:nth-child(2) { left: 20%; animation-delay: 0.5s; }
      &:nth-child(3) { left: 30%; animation-delay: 1s; }
      &:nth-child(4) { left: 40%; animation-delay: 1.5s; }
      &:nth-child(5) { left: 50%; animation-delay: 2s; }
      &:nth-child(6) { left: 60%; animation-delay: 2.5s; }
      &:nth-child(7) { left: 70%; animation-delay: 3s; }
      &:nth-child(8) { left: 80%; animation-delay: 3.5s; }
    }
  }

  .winner-announcement {
    max-width: 550px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .crown-animation {
    margin-bottom: 1rem;

    .crown {
      font-size: 4rem;
      animation: crownFloat 2s ease-in-out infinite;
    }
  }

  .winner-title {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #121212;
    font-weight: 800;
    
    .gradient-text {
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .celebration-emoji {
      margin: 0 0.5rem;
      animation: bounce 1s infinite alternate;
    }
  }

  .winner-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 3.5rem;
    margin-bottom: 2.5rem;
    border: 2px solid #7C4DFF;
    box-shadow: 0 8px 32px rgba(124, 77, 255, 0.2);
    position: relative;
    overflow: hidden;

    .winner-glow {
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: conic-gradient(from 0deg, #7C4DFF, #45D54C, #7C4DFF);
      animation: rotate 3s linear infinite;
      opacity: 0.1;
    }

    .winner-badge {
      position: absolute;
      top: -10px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      color: #121212;
      padding: 0.6rem 1.5rem;
      border-radius: 20px;
      font-weight: 800;
      font-size: 0.9rem;
      box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
      border: 2px solid #ffffff;

      .badge-icon {
        margin-right: 0.5rem;
      }
    }

    .winner-emoji {
      font-size: 5.5rem;
      margin-bottom: 1.5rem;
      animation: winnerBounce 2s infinite;
    }

    .winner-name {
      font-size: 2.5rem;
      font-weight: 800;
      margin-bottom: 0.8rem;
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .winner-category {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
      color: #7C4DFF;
      font-weight: 600;
    }

    .winner-description {
      font-size: 1.1rem;
      color: #444444;
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }

    .achievement-stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-top: 1.5rem;

      .achievement-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        padding: 1rem;
        background: rgba(124, 77, 255, 0.1);
        border-radius: 12px;
        border: 1px solid rgba(124, 77, 255, 0.2);

        .achievement-icon {
          font-size: 1.5rem;
        }

        .achievement-text {
          font-size: 0.9rem;
          font-weight: 600;
          color: #7C4DFF;
        }
      }
    }
  }

  .result-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;

    @media (max-width: 480px) {
      flex-direction: column;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 16px 32px;
      font-size: 1.1rem;
      font-weight: 600;
      border: none;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s ease;

      .btn-icon {
        font-size: 1.2rem;
      }

      &.restart-btn {
        background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
        color: white;
        box-shadow: 0 4px 16px rgba(124, 77, 255, 0.3);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(124, 77, 255, 0.4);
        }
      }

      &.home-btn {
        background: #ffffff;
        color: #121212;
        border: 1px solid rgba(124, 77, 255, 0.2);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

        &:hover {
          background: #f7f6fe;
          transform: translateY(-2px);
          border-color: #7C4DFF;
        }
      }
    }
  }
}

// 애니메이션
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.6;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

@keyframes battleGlow {
  0%, 100% {
    opacity: 0.1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.3;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0.5);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes confettiFall {
  0% {
    top: -10%;
    transform: translateX(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    top: 110%;
    transform: translateX(100px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes crownFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes winnerBounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) scale(1);
  }
  40% {
    transform: translateY(-15px) scale(1.05);
  }
  60% {
    transform: translateY(-8px) scale(1.02);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.company-card,
.winner-card {
  animation: fadeIn 0.6s ease-out;
}

.start-screen,
.game-screen,
.result-screen {
  animation: fadeIn 0.8s ease-out;
}
</style>
