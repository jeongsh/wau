<template>
  <div class="worldcup-container">
    <!-- 시작 화면 -->
    <div v-if="gameState === 'start'" class="start-screen">
      <h1 class="title">🏆 <span>이상형 월드컵</span> 🏆</h1>
      <p class="subtitle">당신의 이상형 회사를 찾아보세요!</p>
      <div class="tournament-options">
        <button 
          v-for="option in tournamentOptions" 
          :key="option.value"
          @click="startGame(option.value)"
          class="tournament-btn"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <!-- 게임 진행 화면 -->
    <div v-else-if="gameState === 'playing'" class="game-screen">
      <div class="game-header">
        <div class="round-info">
          <span class="round-text">{{ currentRoundName }}</span>
          <span class="match-progress">{{ currentMatchIndex + 1 }} / {{ totalMatches }}</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>

      <div class="vs-container">
        <div class="company-card left" @click="selectCompany(currentMatch[0])">
          <div class="company-emoji">{{ currentMatch[0].emoji }}</div>
          <h3 class="company-name">{{ currentMatch[0].name }}</h3>
          <p class="company-category">{{ currentMatch[0].category }}</p>
          <p class="company-description">{{ currentMatch[0].description }}</p>
        </div>

        <div class="vs-divider">
          <span class="vs-text">VS</span>
        </div>

        <div class="company-card right" @click="selectCompany(currentMatch[1])">
          <div class="company-emoji">{{ currentMatch[1].emoji }}</div>
          <h3 class="company-name">{{ currentMatch[1].name }}</h3>
          <p class="company-category">{{ currentMatch[1].category }}</p>
          <p class="company-description">{{ currentMatch[1].description }}</p>
        </div>
      </div>
    </div>

    <!-- 결과 화면 -->
    <div v-else-if="gameState === 'result'" class="result-screen">
      <div class="winner-announcement">
        <h1 class="winner-title">🎉 <span>우승자</span> 🎉</h1>
        <div class="winner-card">
          <div class="winner-emoji">{{ winner?.emoji }}</div>
          <h2 class="winner-name">{{ winner?.name }}</h2>
          <p class="winner-category">{{ winner?.category }}</p>
          <p class="winner-description">{{ winner?.description }}</p>
        </div>
        <div class="result-actions">
          <button @click="restartGame" class="restart-btn">다시 하기</button>
          <button @click="goHome" class="home-btn">처음으로</button>
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

// 시작 화면
.start-screen {
  text-align: center;
  color: #121212;
  position: relative;
  z-index: 1;

  .title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    color: #121212;
    font-weight: 800;
    letter-spacing: -1px;
    
    span {
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .subtitle {
    font-size: 1.3rem;
    margin-bottom: 3rem;
    color: #444444;
    font-weight: 300;
  }

  .tournament-options {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-width: 350px;
    margin: 0 auto;
  }

  .tournament-btn {
    padding: 18px 32px;
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

    &:hover {
      background: #7C4DFF;
      color: #ffffff;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(124, 77, 255, 0.3);
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

    .round-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      padding: 0 1rem;

      .round-text {
        font-size: 1.8rem;
        font-weight: 700;
        color: #121212;
      }

      .match-progress {
        font-size: 1.1rem;
        color: #777777;
        font-weight: 500;
      }
    }

    .progress-bar {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(124, 77, 255, 0.1);

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #7C4DFF 0%, #45D54C 100%);
        transition: width 0.6s ease;
      }
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
    min-height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

    &:hover {
      transform: translateY(-5px);
      border-color: #7C4DFF;
      box-shadow: 0 12px 32px rgba(124, 77, 255, 0.2);

      .company-emoji {
        transform: scale(1.05);
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

    .company-category {
      font-size: 1rem;
      color: #7C4DFF;
      margin-bottom: 1.2rem;
      font-weight: 500;
    }

    .company-description {
      font-size: 0.95rem;
      color: #444444;
      line-height: 1.5;
    }
  }

  .vs-divider {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      order: -1;
    }

    .vs-text {
      font-size: 2.2rem;
      font-weight: 800;
      color: #121212;
      padding: 1.5rem;
      border: 2px solid rgba(124, 77, 255, 0.2);
      border-radius: 50%;
      width: 90px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }
  }
}

// 결과 화면
.result-screen {
  text-align: center;
  color: #121212;
  position: relative;
  z-index: 1;

  .winner-announcement {
    max-width: 550px;
    margin: 0 auto;
  }

  .winner-title {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: #121212;
    font-weight: 800;
    
    span {
      background: linear-gradient(135deg, #7C4DFF 0%, #45D54C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .winner-card {
    background: #ffffff;
    border-radius: 24px;
    padding: 3.5rem;
    margin-bottom: 2.5rem;
    border: 2px solid #7C4DFF;
    box-shadow: 0 8px 32px rgba(124, 77, 255, 0.2);

    .winner-emoji {
      font-size: 5.5rem;
      margin-bottom: 1.5rem;
      animation: bounce 2s infinite;
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
      font-size: 1.3rem;
      margin-bottom: 1.2rem;
      color: #7C4DFF;
      font-weight: 500;
    }

    .winner-description {
      font-size: 1.1rem;
      color: #444444;
      line-height: 1.6;
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
      padding: 16px 32px;
      font-size: 1.1rem;
      font-weight: 600;
      border: none;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s ease;

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

.company-card,
.winner-card {
  animation: fadeIn 0.6s ease-out;
}
</style>
