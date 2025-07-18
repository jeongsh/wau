import{ defineStore } from 'pinia';
import type { DesignInfo, WeddingInfo } from '~/types/editor';

export const useEditorStore = defineStore('info', ()=>{
  const designInfo = ref<DesignInfo>({
    themeColor: 'blue',
    fontStyle: 'default',
    fontSize: 'M',
    intro: {
      isUseIntro: true,
      isShowIntro: false,
      type: null,
      text: null,
      textColor: null,
      textSize: null,
      image: null,
    },
    designPage: 'A',
    mainVisual: {
      type: 'A',
      image: '',
    },
    greeting: 
      `오랜 기다림 속에서<br>
      저희 두사람, 한 마음 되어<br>
      참된 사랑의 결실을 맺게 되었습니다.<br>
      <br><br>
      10월의 어느 햇살 고운 날,<br>
      귀한 걸음 하시어 따뜻한 마음으로<br>
      축복해 주시면 더 없는 기쁨이 되겠습니다.`,
    calendar: {
      isShowCalendar: true,
      isShowCountdown: true,
    }
  });

  const weddingInfo = ref<WeddingInfo>({
    bride: {
      name: '',
      familyName: '',
      relation: '딸',
      number: '',
      bank: '',
      account: '',
      parents:[
        {
          relation: '',
          name: '',
          number: '',
          bank: '',
          account: '',
          isDied: false,
        },
        {
          relation: '',
          name: '',
          number: '',
          bank: '',
          account: '',
          isDied: false,
        }
      ]
    },
    groom: {
      name: '',
      familyName: '',
      relation: '아들',
      number: '',
      bank: '',
      account: '',
      parents:[
        {
          relation: '',
          name: '',
          number: '',
          bank: '',
          account: '',
          isDied: false,
        },
        {
          relation: '',
          name: '',
          number: '',
          bank: '',
          account: '',
          isDied: false,
        }
      ]
    },
    // 오늘 날짜로 초기화
    date: new Date(),
    time: {
      ampm: '오후',
      hour: 12,
      minute: 0,
    },
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
      name: '',
      detail: '',
      number: '',
    },
  });

  const offIntro = () => {
    designInfo.value.intro.isShowIntro = false;
  }
  const formattedDate = computed(() => {
    const date = weddingInfo.value.date;
    const englishMonthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const englishWeekdayNames = [
      'Son', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun'
    ];
    const koreanWeekdayNames = [
      '일', '월', '화', '수', '목', '금', '토'
    ];

    return {
      year: date.getFullYear(),
      month: String(date.getMonth() + 1),
      englishMonthName: englishMonthNames[date.getMonth()],
      day: String(date.getDate()).padStart(2, '0'),
      englishWeekday: englishWeekdayNames[date.getDay()],
      koreanWeekday: koreanWeekdayNames[date.getDay()],
    };
  });

  const formattedTime = computed(() => {
    const { hour, minute, ampm } = weddingInfo.value.time;
    const englishAmpm = ampm === '오전' ? 'AM' : 'PM';
    return {
      hour: String(hour).padStart(2, '0'),
      minute: String(minute).padStart(2, '0'),
      ampm,
      englishAmpm,
    };
  });

  return {
    designInfo,
    weddingInfo,
    formattedDate,
    formattedTime,
    offIntro,
  };

  
});