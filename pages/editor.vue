<template>
  <div class="wrap-editor" v-auto-animate>
    <div class="modal-loading" v-if="isLoading">
      로딩중...
    </div>
    <div class="container d-flex ai-center g-32">
      <div class="wrap-preview">
        <div class="box-preview">
          <Preview />
        </div>
      </div>
      <div class="box-editor">
        <UtilsAccordion :title="'신랑 신부 정보'" :isOpen="true">
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
        </UtilsAccordion>
        <UtilsAccordion :title="'디자인 설정'">
          <div class="box-content">
            <div class="box-input">
              <p class="input-title">폰트</p>
              <UtilsSelectBox
                :title="currentFontLabel"
                :width="140"
                isReverse
              >
                <button
                  v-for="font in fontStyles" 
                  @click="onChangeFontStyle(`${ font.fontFamily }`)" 
                  :class="font.fontFamily">
                  {{ font.label }}
                </button>
              </UtilsSelectBox>
              <UtilsSelectBox
                :title="designInfo.fontSize"
                :width="48"
                isReverse
              >
                <button
                  v-for="size in fontSizes" 
                  @click="onChangeFontSize(`${ size }`)" 
                  :class="size">
                  {{ size }}
                </button>
              </UtilsSelectBox>
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
        </UtilsAccordion>
        <UtilsAccordion :title="'인트로'">
          <div class="box-label-theme">
            <label class="label-theme-type" v-for="introType in introTypes" :key="introType">
              <input type="radio" :value="introType" v-model="designInfo.intro.type" @change="onChangeIntro" />
              {{ introType }}
            </label>
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'메인 비주얼'">
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
            <input type="file" @change="onMainVisualChange" accept="image/*" />
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'인사말'">
          <div class="box-input">
            <p class="input-title">인사말</p>
            <UtilsTiptapEditor v-model="designInfo.greeting" />
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'디자인 페이지'">
          <div class="box-label-theme">
            <label class="label-theme-type" v-for="designPage in designPages" :key="designPage">
              <input type="radio" name="designPageType" id="" :value="designPage" v-model="designInfo.designPage" />
              {{ designPage }}
            </label>
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'예식 일시'">
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
            <UtilsSelectBox
              :title=weddingInfo.time.ampm
              :width="62"
              isReverse
            >
              <button
                v-for="ampm in ampmOptions" 
                @click="onChangeAmpm(`${ ampm }`)" 
              >
                {{ ampm }}
              </button>
            </UtilsSelectBox>
            <UtilsSelectBox
              :title="weddingInfo.time.hour + '시'"
              :width="68"
              isReverse
            >
              <button
                v-for="hour in hourOptions" 
                @click="onChangeHour(`${ hour }`)" 
              >
                {{ hour }}시
              </button>
            </UtilsSelectBox>
            <UtilsSelectBox
              :title="weddingInfo.time.minute + '분'"
              :width="68"
              isReverse
            >
              <button
                v-for="minute in minuteOptions" 
                @click="onChangeMinute(`${ minute }`)" 
              >
                {{ minute }}분
              </button>
            </UtilsSelectBox>
          </div>
          <div class="box-input ai-center">
            <p class="input-title">캘린더</p>
            <UtilsToggleSwitch v-model="designInfo.calendar.isShowCalendar" />
          </div>
          <div class="box-input ai-center">
            <p class="input-title">디데이</p>
            <UtilsToggleSwitch v-model="designInfo.calendar.isShowCountdown" />
          </div>
        </UtilsAccordion>
        <UtilsAccordion :title="'예식 장소'">
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
        </UtilsAccordion>

        <UtilsAccordion title="연락처" v-model:isSwitch="designInfo.isShowContact">
          <div class="box-input">
            <p class="input-title">신랑 연락처</p>
            <input class="input-l" type="text" v-model="weddingInfo.groom.number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input" v-if="!weddingInfo.groom.parents[0].isDied">
            <p class="input-title">신랑 아버지</p>
            <input class="input-l" type="text" v-model="weddingInfo.groom.parents[0].number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input" v-if="!weddingInfo.groom.parents[1].isDied">
            <p class="input-title">신랑 어머니</p>
            <input class="input-l" type="text" v-model="weddingInfo.groom.parents[1].number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input">
            <p class="input-title">신부 연락처</p>
            <input class="input-l" type="text" v-model="weddingInfo.bride.number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input">
            <p class="input-title" v-if="!weddingInfo.bride.parents[0].isDied">신부 아버지</p>
            <input class="input-l" type="text" v-model="weddingInfo.bride.parents[0].number" placeholder="-없이 입력해주세요." />
          </div>
          <div class="box-input" v-if="!weddingInfo.bride.parents[1].isDied">
            <p class="input-title">신부 어머니</p>
            <input class="input-l" type="text" v-model="weddingInfo.bride.parents[1].number" placeholder="-없이 입력해주세요." />
          </div>
        </UtilsAccordion>
        <UtilsAccordion title="계좌번호" v-model:isSwitch="designInfo.isShowAccount">
          <div class="box-input">
            <p class="input-title">신랑</p>
          </div>
          <div class="box-account">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.groom.account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.groom.account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="box-input ai-center jc-between">
            <p class="input-title">신랑 아버지</p>
            <UtilsToggleSwitch v-model="weddingInfo.groom.parents[0].isUseAccount" />
          </div>
          <div class="box-account" v-show="weddingInfo.groom.parents[0].isUseAccount">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.groom.parents[0].account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.groom.parents[0].account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.parents[0].account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.parents[0].account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="box-input ai-center jc-between">
            <p class="input-title">신랑 어머니</p>
            <UtilsToggleSwitch v-model="weddingInfo.groom.parents[1].isUseAccount" />
          </div>
          <div class="box-account" v-show="weddingInfo.groom.parents[1].isUseAccount">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.groom.parents[1].account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.groom.parents[1].account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.parents[1].account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.groom.parents[1].account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="divider"></div>
          <div class="box-input">
            <p class="input-title">신부</p>
          </div>
          <div class="box-account">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.bride.account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.bride.account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="box-input ai-center jc-between">
            <p class="input-title">신부 아버지</p>
            <UtilsToggleSwitch v-model="weddingInfo.bride.parents[0].isUseAccount" />
          </div>
          <div class="box-account" v-show="weddingInfo.bride.parents[0].isUseAccount">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.bride.parents[0].account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.bride.parents[0].account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.parents[0].account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.parents[0].account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
          <div class="box-input ai-center jc-between">
            <p class="input-title">신부 어머니</p>
            <UtilsToggleSwitch v-model="weddingInfo.bride.parents[1].isUseAccount" />
          </div>
          <div class="box-account" v-show="weddingInfo.bride.parents[1].isUseAccount">
            <div class="box-input">
              <input class="input-m" type="text" v-model="weddingInfo.bride.parents[1].account.bank" placeholder="은행명" />
              <input class="input-m" type="text" v-model="weddingInfo.bride.parents[1].account.name" placeholder="예금주" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.parents[1].account.number" placeholder="계좌번호" />
            </div>
            <div class="box-input">
              <input class="input-l" type="text" v-model="weddingInfo.bride.parents[1].account.kakaoPay" placeholder="카카오 페이 연동" />
            </div>
          </div>
        </UtilsAccordion>
        <UtilsAccordion title="갤러리" v-model:isSwitch="designInfo.gallery.isShowGallery">
          <div class="box-input">
            <p class="input-title">갤러리 타입</p>
            <div class="box-btn-type">
              <button
                v-for="galleryType in galleryTypes" 
                @click="designInfo.gallery.galleryType = galleryType" 
                :key="galleryType"
                :class="`btn-gallery-type ${designInfo.gallery.galleryType === galleryType ? 'active' : ''}`"
                class="btn-gallery-type"
              >
                {{ galleryType }}
              </button>
            </div>
          </div>
          <div class="box-input">
            <p class="input-title" style="width: auto">이미지 업로드</p>
          </div>
          <div class="wrap-thumbnail">
            <div class="box-thumbnail" v-for="(image, index) in designInfo.gallery.images">
              <img
                :key="index"
                :src="image"
                alt=""
                class="gallery-thumnail"
              >
              <button class="btn-delete-thumbnail" @click="onDeleteGalleryImage(index)">
                x
              </button>
            </div>
            <label class="label-upload-thumbnail">
              <input type="file" multiple @change="onGalleryImageChange" accept="image/*" />
              +
            </label>
          </div>
        </UtilsAccordion>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const { weddingInfo, designInfo } = storeToRefs(editorStore);

const introTypes = ['A', 'B', 'C'];
const mainVisuals = ['A', 'B'];
const designPages = ['A', 'B', 'C'];
const themeColors = ['blue', 'orange', 'pink', 'yellow','brown', 'charcoal'];
const galleryTypes = ['Swipe', 'Grid'];
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

const isLoading = ref(true);


onMounted(() => {
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

  nextTick(() => {
    isLoading.value = false;
  });
});

const onChangeIntro = () => {
  designInfo.value.intro.isShowIntro = true;
};

const onMainVisualChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      designInfo.value.mainVisual.image = e.target?.result as string;
    };
    reader.readAsDataURL(target.files[0]);
  }
};

const onGalleryImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    // designInfo.value.gallery.images에 push
    const files = Array.from(target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (designInfo.value.gallery.images) {
          designInfo.value.gallery.images.push(e.target?.result as string);
        } else {
          designInfo.value.gallery.images = [e.target?.result as string];
        }
      };
      reader.readAsDataURL(file);
    });
  }
};

const onDeleteGalleryImage = (index: number) => {
  if (designInfo.value.gallery.images) {
    designInfo.value.gallery.images.splice(index, 1);
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

const toggleDatePicker = () => {
  const datePicker = document.querySelector('.box-datepicker') as HTMLElement;
  datePicker.classList.toggle('active');
};
</script>

<style lang="scss" scoped>
.modal-loading{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
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
      &.orange{
        background: linear-gradient(135deg, rgb(255, 224, 204), rgb(255, 153, 102));
      }
      &.pink{
        background: linear-gradient(135deg, rgb(255, 224, 236), rgb(255, 153, 204));
      }
      &.yellow{
        background: linear-gradient(135deg, rgb(255, 255, 204), rgb(255, 204, 102));
      }
      &.brown{
        background: linear-gradient(135deg, rgb(230, 220, 210), rgb(150, 120, 100));
      }
      &.charcoal{
        background: linear-gradient(135deg, rgb(220, 220, 220), rgb(100, 100, 100));
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
.box-order{
  align-self: flex-start;
  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
}
.box-btn-type{
  display: flex;
  gap: 8px;
  .btn-gallery-type{
    flex: 1;
    height: 42px;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    background: #f4f3f0;
    color: #2b2b2b;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    &.active{
      background: #fff;
      border-color: #2b2b2b;
    }
  }
}
.wrap-thumbnail{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 8px;
  .box-thumbnail{
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 8px;
    overflow: hidden;
  }
  .gallery-thumbnail{
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }
  .btn-delete-thumbnail{
    position: absolute;
    top: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .label-upload-thumbnail{
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4f3f0;
    border: 1px dashed #dbdbdb;
    border-radius: 8px;
    cursor: pointer;
    input[type="file"]{
      display: none;
    }
  }
}
</style>
