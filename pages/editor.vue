<template>
  <div class="wrap-editor">
    <div class="container d-flex ai-center g-32">
      <div class="wrap-preview">
        <div class="box-preview">
          <Preview />
        </div>
      </div>
      <div class="box-editor">
        <div class="wrap-accordion active">
          <button class="btn-accordion" @click="toggleAccordion">
            <p class="accordion-title">신랑신부 정보</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-input">
                <p class="input-title">신랑</p>
                <input class="input-s" type="text" v-model="weddingInfo.groom.familyName" placeholder="성" />
                <input class="input-m"type="text" v-model="weddingInfo.groom.name" placeholder="이름" />
                <input class="input-sm"type="text" v-model="weddingInfo.groom.relation" placeholder="관계" />
              </div>
              <div class="box-input">
                <p class="input-title">아버지</p>
                <input class="input-l" type="text" v-model="weddingInfo.groom.parents[0].name" placeholder="이름" />
                <input class="input-sm" type="text" v-model="weddingInfo.groom.parents[0].relation" placeholder="관계" />
              </div>
              <div class="box-input">
                <p class="input-title">어머니</p>
                <input class="input-l" type="text" v-model="weddingInfo.groom.parents[1].name" placeholder="이름" />
                <input class="input-sm" type="text" v-model="weddingInfo.groom.parents[1].relation" placeholder="관계" />
              </div>
              <div class="divider"></div>
              <div class="box-input">
                <p class="input-title">신부</p>
                <input class="input-s" type="text" v-model="weddingInfo.bride.familyName" placeholder="성" />
                <input class="input-m" type="text" v-model="weddingInfo.bride.name" placeholder="이름" />
                <input class="input-sm" type="text" v-model="weddingInfo.bride.relation" placeholder="관계" />
              </div>
              <div class="box-input">
                <p class="input-title">아버지</p>
                <input class="input-l" type="text" v-model="weddingInfo.bride.parents[0].name" placeholder="이름" />
                <input class="input-sm" type="text" v-model="weddingInfo.bride.parents[0].relation" placeholder="관계" />
              </div>
              <div class="box-input">
                <p class="input-title">어머니</p>
                <input class="input-l" type="text" v-model="weddingInfo.bride.parents[1].name" placeholder="이름" />
                <input class="input-sm" type="text" v-model="weddingInfo.bride.parents[1].relation" placeholder="관계" />
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-accordion">
          <button class="btn-accordion" @click="toggleAccordion">
            <p class="accordion-title">디자인 정보</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-input">
                <p class="input-title">폰트</p>
                <div class="wrap-select" style="width: 140px;">
                  <button 
                    class="btn-select" 
                    @click="toggleSelect"
                    :class="designInfo.fontStyle"
                  >
                    {{ currentFontLabel }}
                  </button>
                  <div class="options">
                    <button
                      v-for="font in fontStyles" 
                      @click="onChangeFontStyle(`${ font.fontFamily }`)" 
                      :class="font.fontFamily">
                      {{ font.label }}
                    </button>
                  </div>
                </div>
                <div class="wrap-select" style="width: 140px;">
                  <button 
                    class="btn-select" 
                    @click="toggleSelect"
                  >
                    {{ designInfo.fontSize }}
                  </button>
                  <div class="options">
                    <button
                      v-for="size in fontSizes" 
                      @click="onChangeFontSize(`${ size }`)" 
                      :class="size">
                      {{ size }}
                    </button>
                  </div>
                </div>
              </div>
              <div class="box-input">
                <p class="input-title">테마 컬러</p>
                <div class="box-label-color">
                  <label class="label-theme-type" :class="themeColor" v-for="themeColor in themeColors" :key="themeColor">
                    <input type="radio" name="templateColor" id="" :value="themeColor" v-model="designInfo.themeColor" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-accordion">
          <button class="btn-accordion" @click="toggleAccordion">
            <p class="accordion-title">인트로(페이지 시작할때 애니메이션 같은거)</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-label-theme">
                <label class="label-theme-type" v-for="introType in introTypes" :key="introType">
                  <input type="radio" :value="introType" v-model="designInfo.intro.type" @change="onChangeIntro" />
                  {{ introType }}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-accordion">
          <button class="btn-accordion" @click="toggleAccordion">
            <p class="accordion-title">커버 디자인</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-label-theme">
                <label class="label-theme-type" v-for="mainVisual in mainVisuals" :key="mainVisual">
                  <input type="radio" name="mainVisualType" id="" :value="mainVisual" v-model="designInfo.mainVisual.type" />
                  {{ mainVisual }}
                </label>
              </div>
              <div class="box-input">
                <p class="input-title">커버 이미지</p>
              </div>
              <div class="box-input">
                <input type="file" @change="onImageChange" accept="image/*" />
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-accordion">
          <button class="btn-accordion" @click="toggleAccordion">
            <p class="accordion-title">인사말</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-input">
                <p class="input-title">인사말</p>
                <!-- TODO: 텍스트 에디터 넣을거임 -->
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-accordion">
          <div class="btn-accordion" @click="toggleAccordion">
            <p class="accordion-title">디자인 페이지</p>
            <i class="icon-chevron-down"></i>
          </div>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-label-theme">
                <label class="label-theme-type" v-for="designPage in designPages" :key="designPage">
                  <input type="radio" name="mainVisualType" id="" :value="designPage" v-model="designInfo.designPage" />
                  {{ designPage }}
                </label>
              </div>
            </div>  
          </div>
        </div>
        <div class="wrap-accordion">
          <button class="btn-accordion" @click="toggleAccordion">
            <p class="accordion-title">예식 일시</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-input">
                <p class="input-title">예식일</p>
                <div class="wrap-datepicker">
                  <button class="btn-datepicker" @click="toggleDatePicker">
                    {{ formatedDate(weddingInfo.date) }}
                  </button>
                  <div class="box-datepicker">
                    <DatePicker 
                      v-model="weddingInfo.date"
                      :format="'yyyy-MM-dd'"
                    />
                  </div>
                </div>
              </div>
              <div class="box-input">
                <p class="input-title">예식시간</p>
                <div class="wrap-select reverse" style="width: 62px;">
                  <button 
                    class="btn-select" 
                    @click="toggleSelect"
                  >
                    {{ weddingInfo.time.ampm }}
                  </button>
                  <div class="options">
                    <button
                      v-for="ampm in ampmOptions" 
                      @click="onChangeAmpm(`${ ampm }`)" 
                    >
                      {{ ampm }}
                    </button>
                  </div>
                </div>
                <div class="wrap-select reverse" style="width: 68px;">
                  <button 
                    class="btn-select" 
                    @click="toggleSelect"
                  >
                    {{ weddingInfo.time.hour }}시
                  </button>
                  <div class="options" style="height: 200px; overflow-y: auto;">
                    <button
                      v-for="hour in hourOptions" 
                      @click="onChangeHour(`${ hour }`)" 
                    >
                      {{ hour }}시
                    </button>
                  </div>
                </div>
                <div class="wrap-select reverse" style="width: 68px;">
                  <button 
                    class="btn-select" 
                    @click="toggleSelect"
                  >
                    {{ weddingInfo.time.minute }}분
                  </button>
                  <div class="options" style="height: 200px; overflow-y: auto;">
                    <button
                      v-for="minute in minuteOptions" 
                      @click="onChangeMinute(`${ minute }`)" 
                    >
                      {{ minute }}분
                    </button>
                  </div>
                </div>
              </div>
              <div class="box-input ai-center">
                <p class="input-title">캘린더</p>
                <label class="btn-toggle">
                  <input type="checkbox" name="" id="" v-model="designInfo.calendar.isShowCalendar" />
                  <span class="circle"></span>
                </label>
              </div>
              <div class="box-input ai-center">
                <p class="input-title">디데이</p>
                <label class="btn-toggle">
                  <input type="checkbox" name="" id="" v-model="designInfo.calendar.isShowCountdown" />
                  <span class="circle"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-accordion">
          <button class="btn-accordion" @click="toggleAccordion">
            <p class="accordion-title">예식 장소</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-input">
                <p class="input-title">주소</p>
                <input class="input-l" type="text" v-model="weddingInfo.location.address" placeholder="예식 장소를 입력해주세요." />
                <button class="btn-find">주소 검색</button>
              </div>
              <div class="box-input">
                <p class="input-title">예식장 이름</p>
                <input class="input-l" type="text" v-model="weddingInfo.location.name" placeholder="층과 홀을 입력해주세요." />
              </div>
              <div class="box-input">
                <p class="input-title">층 / 홀</p>
                <input class="input-l" type="text" v-model="weddingInfo.location.detail" placeholder="층과 홀을 입력해주세요." />
              </div>
              <div class="box-input">
                <p class="input-title">연락처</p>
                <input class="input-l" type="text" v-model="weddingInfo.location.number" placeholder="-없이 입력해주세요." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const designInfo = ref(editorStore.designInfo);
const weddingInfo = ref(editorStore.weddingInfo);

const introTypes = ['A', 'B', 'C'];
const mainVisuals = ['A', 'B'];
const designPages = ['A', 'B', 'C'];
const themeColors = ['blue', 'green', 'pink', 'purple'];
const fontStyles = [
  {
    fontFamily: 'pretendard',
    label: '프리텐다드',
  },
  {
    fontFamily: 'corncorn',
    label: '온글잎 콘콘체',
  },
  {
    fontFamily: 'gmarket',
    label: 'G마켓 산스',
  },
  {
    fontFamily: 'lee-seoyun',
    label: '이서윤체',
  }
];

const fontSizes =[
  'S',
  'M',
  'L',
]

const ampmOptions = [
  '오전',
  '오후'
];

const hourOptions = [
  '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
  '10', '11', '12'
]

const minuteOptions = [
  '0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
];

const currentFontLabel = computed(() => {
  const font = fontStyles.find(f => f.fontFamily === designInfo.value.fontStyle);
  return font ? font.label : '프리텐다드';
});

const formatedDate = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

onMounted(() => {
  const wrapAccordion = document.querySelectorAll('.wrap-accordion');
  wrapAccordion.forEach((accordion) => {
    if (accordion.classList.contains('active')) {
      const boxAccordion = accordion.querySelector('.box-accordion') as HTMLElement;
      boxAccordion.style.height = `${boxAccordion.scrollHeight}px`;
      boxAccordion.style.opacity = '1';
      boxAccordion.style.pointerEvents = 'auto';
      boxAccordion.style.overflowY = 'visible';
    }
  });
  // 마우스 클릭시 wrap-select가 아니라면 wrap-select의 active 클래스를 제거
  document.addEventListener('click', (event) => {
    const wrapSelects = document.querySelectorAll('.wrap-select');
    wrapSelects.forEach((wrapSelect) => {
      if (!wrapSelect.contains(event.target as Node)) {
        wrapSelect.classList.remove('active');
        const options = wrapSelect.querySelector('.options') as HTMLElement;
        if (options) {
          options.classList.remove('active');
        }
      }
      // 타겟이 options이면 active 클래스를 제거
      if (wrapSelect.querySelector('.options')?.contains(event.target as Node)) {
        wrapSelect.classList.remove('active');
        const options = wrapSelect.querySelector('.options') as HTMLElement;
        options.classList.remove('active');
      }
    });
  });

  // box-datepicker가 아닌 곳을 클릭하면 box-datepicker의 active 클래스를 제거
  document.addEventListener('click', (event) => {
    const wrapDatePicker = document.querySelector('.wrap-datepicker');
    const datePicker = document.querySelector('.box-datepicker') as HTMLElement;
    if (wrapDatePicker && !wrapDatePicker.contains(event.target as Node)) {
      datePicker.classList.remove('active');
    }
    // vc-day-content이면 box-datepicker의 active 클래스를 제거
    if ((event.target as HTMLElement).classList.contains('vc-day-content')) {
      datePicker.classList.remove('active');
    }
  });
});

const onChangeIntro = () => {
  designInfo.value.intro.isShowIntro = true;
};

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      designInfo.value.mainVisual.image = e.target?.result as string;
    };
    reader.readAsDataURL(target.files[0]);
  }
};

const onChangeFontStyle = (font: string) => {
  designInfo.value.fontStyle = font;
};

const onChangeFontSize = (size: string) => {
  designInfo.value.fontSize = size;
};

const onChangeAmpm = (ampm: string) => {
  weddingInfo.value.time.ampm = ampm;
};

const onChangeHour = (time: string) => {
  weddingInfo.value.time.hour = parseInt(time, 10);
};

const onChangeMinute = (minute: string) => {
  weddingInfo.value.time.minute = parseInt(minute, 10);
};

const toggleSelect = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const options = target.nextElementSibling as HTMLElement;
  target.classList.toggle('active');
  options.classList.toggle('active');
};

const toggleAccordion = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const box = target.nextElementSibling as HTMLElement;
  const parentElement = target.parentElement as HTMLElement;
  parentElement.classList.toggle('active');
  if (parentElement.classList.contains('active')) {
    box.style.borderTop = '1px solid #dbdbdb';
    box.style.height = `${box.scrollHeight}px`;
    box.style.opacity = '1';
    box.style.pointerEvents = 'auto';
    box.style.overflowY = 'visible';
  } else {
    box.style.borderTop = 'none';
    box.style.height = '0px';
    box.style.opacity = '0';
    box.style.pointerEvents = 'none';
    box.style.overflowY = 'hidden';
  }
};

const toggleDatePicker = () => {
  const datePicker = document.querySelector('.box-datepicker') as HTMLElement;
  datePicker.classList.toggle('active');
};
</script>

<style lang="scss" scoped>
.wrap-editor {
  width: 100%;
  height: 100vh;
  background: #f4f3f0;
  .container{
    height: 100%;
    padding: 24px;
  }
  .box-editor{
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
  
  .box-input{
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    &:last-child{
      margin-bottom: 0;
    }
    .input-title{
      line-height: 42px;
      font-size: 14px;
      font-weight: 600;
      margin-right: 8px;
      width: 64px;
    }
    input[type="text"]{
      padding-left: 16px;
      border: 1px solid #dbdbdb;
      outline: none;
      color: #2b2b2b;
      height: 42px;
      min-height: 40px;
      font-size: 13px;
      background: #fff;
      padding: 10px 16px;
      border-radius: 8px;
    }
    .input-s{
      width: 60px;
    }
    .input-m{
      width: 90px;
    }
    .input-sm{
      width: 76px;
    }
    .input-l{
      width: 158px;
    }
  }
  .divider{
    width: 100%;
    height: 1px;
    background: #dbdbdb;
    margin: 16px 0;
  }
  .box-label-theme{
    display: flex;
    align-items: flex-start;
    gap: 8px;
    .label-theme-type{
      width: calc((100% - 16px) / 3);
      height: 42px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f4f3f0;
      border: 1px solid #dbdbdb;
      border-radius: 8px;
      input{
        display: none;
      }
    }
  }
  .box-label-color{
    display: flex;
    align-items: flex-start;
    gap: 8px;
    .label-theme-type{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1px solid #dbdbdb;
      &.blue{
        background: linear-gradient(135deg, rgb(215, 228, 235), rgb(107, 153, 176));
      }
      input{
        display: none;
      }
    }
  }
}
.wrap-preview{
  height: 100%;
  width: 400px;
  // background: #333;
  position: relative;
  .box-preview{
    width: 360px;
    height: 740px;
    border-radius: 24px;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
  }
}

.wrap-datepicker{
  position: relative;
  width: 180px;
  .btn-datepicker{
    width: 100%;
    height: 42px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    background: #fff;
    color: #2b2b2b;
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    padding-left: 16px;
  }
  .box-datepicker{
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 100;
    width: 100%;
    display: none;
    &.active{
      display: block;
    }
  }
}
</style>
