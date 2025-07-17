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
    <BlocksInivitation />
    <section class="sec-day">
      <p class="date">
        {{ date.englishWeekday }}. {{ date.englishMonthName }} {{ date.day }}
      </p>
      <p class="time">
        {{ time.englishAmpm }} {{ time.hour }}:{{ time.minute }}
      </p>
    </section>
    <BlocksDate
      v-if="designInfo.calendar.isShowCalendar || designInfo.calendar.isShowCountdown"
      :weddingInfo="weddingInfo"
      :designInfo="designInfo"
      :date="date"
      :time="time"
    />
    
  </div>
</template>

<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor'; 

const props = defineProps<{
  designInfo: DesignInfo;
  weddingInfo: WeddingInfo;
}>();

const MainVisualComponent = computed(() => {
  // themeType을 명시적으로 참조하여 반응성 확보
  const themeType = props.designInfo.mainVisual.type || 'A';
  return defineAsyncComponent(() =>
    import(`@/components/blocks/MainVisual/${themeType}.vue`)
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
