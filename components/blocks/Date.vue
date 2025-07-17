<template>
  <section class="sec-date">
    <div v-if="designInfo.calendar.isShowCalendar">
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
    </div>
    <div class="d-day" v-if="designInfo.calendar.isShowCountdown">
      <p>{{ dDay.days }}일 {{ dDay.hours }}시간 {{ dDay.minutes }}분 {{ dDay.seconds }}초 남음</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor'; 

const props = defineProps<{
  date: {
    year: number;
    month: string;
    day: string;
    englishMonthName: string;
    englishWeekday: string;
    koreanWeekday: string;
  };
  time: {
    hour: string;
    minute: string;
    ampm: string;
    englishAmpm: string;
  };
  weddingInfo: WeddingInfo
  designInfo: DesignInfo;
}>();

const calendarRef = ref()
const now = ref(new Date());
onMounted(() => {
  const timer = setInterval(() => {
    now.value = new Date();
  }, 1000);

  onBeforeUnmount(() => {
    clearInterval(timer);
  });
});

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

const dDay = computed(() => {
  const weddingDate = new Date(props.weddingInfo.date);
  const { hour, minute } = props.weddingInfo.time;

  weddingDate.setHours(hour, minute, 0, 0);

  const diff = weddingDate.getTime() - now.value.getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isOver: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isOver: false,
  };
});
</script>

<style lang="scss" scoped>
.sec-date{
  padding: 120px 0;
  background: var(--thick-color);
  text-align: center;
}
</style>
