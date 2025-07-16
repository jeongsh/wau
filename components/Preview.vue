<template>
  <div 
    class="preview" 
    :class="[
      `theme-${designInfo.themeColor}`,
      `${designInfo.fontStyle}`,
      `fontsize-${designInfo.fontSize}`,
    ]">
    <section class="sec-main">
      <component :is="MainVisualComponent" :designInfo="designInfo" :weddingInfo="weddingInfo" />
    </section>
    <section class="sec-invitation">
      <!-- <ClientOnly>
        <vue-countdown :time="2 * 24 * 60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
          Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
        </vue-countdown>
      </ClientOnly> -->
      <p class="sub-title">(❁´◡`❁)</p>
      <div class="box-text">
        <p>오랜 기다림 속에서<br>
          저희 두사람, 한 마음 되어<br>
          참된 사랑의 결실을 맺게 되었습니다.<br>
          <br><br>
          10월의 어느 햇살 고운 날,<br>
          귀한 걸음 하시어 따뜻한 마음으로<br>
          축복해 주시면 더 없는 기쁨이 되겠습니다.
        </p>
      </div>
    </section>
    <section class="sec-day">
      <p class="date">
        {{ date.englishWeekday }}. {{ date.englishMonthName }} {{ date.day }}
      </p>
      <p class="time">
        {{ time.englishAmpm }} {{ time.hour }}:{{ time.minute }}
      </p>
    </section>
    <section class="sec-date">
      <h3 class="amphora">WEDDING DAY</h3>
      <p class="date">
        {{ date.year }}년 {{ date.month }}월 {{ date.day }}일 {{ date.koreanWeekday }}요일 | 
        {{ time.ampm }} {{ time.hour }}시 {{ time.minute }}분
      </p>
      <p class="date-english">
        {{ date.englishWeekday }}, {{ date.englishMonthName }} {{ date.day }}, {{ date.year }} | 
        {{ time.englishAmpm }} {{ time.hour }}:{{ time.minute }}
      </p>
      <Calendar 
        :model-value="weddingInfo.date"
        :attributes="calendarAttrs"
        ref="calendarRef"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import VueCountdown from '@chenfengyuan/vue-countdown';

import type { DesignInfo, WeddingInfo } from '~/types/editor'; 

const props = defineProps<{
  designInfo: DesignInfo;
  weddingInfo: WeddingInfo;
}>();

const MainVisualComponent = computed(() => {
  // themeType을 명시적으로 참조하여 반응성 확보
  const themeType = props.designInfo.themeType;
  return defineAsyncComponent(() =>
    import(`@/components/MainVisual/${themeType}.vue`)
  );
});

const date = computed(() => {
  const date = props.weddingInfo.date;
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

const time = computed(() => {
  const { hour, minute, ampm } = props.weddingInfo.time;
  const englishAmpm = ampm === '오전' ? 'AM' : 'PM';
  return {
    hour: String(hour).padStart(2, '0'),
    minute: String(minute).padStart(2, '0'),
    ampm,
    englishAmpm,
  };
});
const calendarRef = ref()

watch(() => props.weddingInfo.date, (newDate) => {
  if (calendarRef.value) {
    calendarRef.value.move({
      month: newDate.getMonth() + 1,
      year: newDate.getFullYear()
    });
  }
});

const calendarAttrs = computed(() => {
  if (!props.weddingInfo.date) return []
  return [
    {
      key: 'wedding',
      highlight: {
        color: '#F87171', // 원하는 색상
        fillMode: 'solid',
      },
      dates: props.weddingInfo.date,
      popover: {
        label: '웨딩데이',
      },
    },
  ]
})
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  *{
    font-family: inherit;
  }
  .sec-main{
    height: 100%;
    width: 100%;
    background: var(--main-bg-color);
  }
  .sec-invitation{
    padding: 48px 0;
    text-align: center;
    .sub-title{
      font-size: 12px;
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 16px;
    }
  }
  .sec-day{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: var(--primary-color);
    .date{
      font-size: 36px;
      color: #fff;
      font-weight: 300;
      margin-bottom: 16px;
      font-family: 'Amphora', sans-serif;
    }
    .time{
      font-family: 'Amphora', sans-serif;
      font-size: 48px;
      color: #fff;
      font-weight: 300;
    }
  }
}
.sec-date{
  height: 100%;
  background: var(--thick-color);
  text-align: center;
}
</style>
