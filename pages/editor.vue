<template>
  <div class="wrap-editor">
    <div class="container d-flex ai-center g-32">
      <div class="wrap-preview">
        <div class="box-preview">
          <Preview
            :designInfo="designInfo"
            :weddingInfo="weddingInfo"
          />
        </div>
      </div>
      <div class="box-editor">
        <div class="wrap-accordion active">
          <button class="btn-accordion">
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
        <div class="wrap-accordion active">
          <button class="btn-accordion">
            <p class="accordion-title">테마 정보</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
              <div class="box-label-theme">
                <label class="label-theme-type" v-for="themeType in themeTypes" :key="themeType">
                  <input type="radio" name="templateType" id="" :value="themeType" v-model="designInfo.themeType" />
                  {{ themeType }}
                </label>
              </div>
              <div class="box-input">
                <p class="input-title">메인 이미지</p>
              </div>
              <div class="box-input">
                <input type="file" @change="onImageChange" accept="image/*" />
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-accordion active">
          <button class="btn-accordion">
            <p class="accordion-title">디자인 정보</p>
            <i class="icon-chevron-down"></i>
          </button>
          <div class="box-accordion">
            <div class="box-content">
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Preview from '~/components/Preview.vue';

const themeTypes = ['A', 'B'];
const themeColors = ['blue', 'green', 'pink', 'purple'];

const designInfo = ref({
  themeType: 'A',
  themeColor: 'blue',
  mainImage: '',
});

const weddingInfo = ref({
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
  date: '2023-10-10',
  location: '서울시 강남구',
});

onMounted(() => {
  const wrapAccordions = document.querySelectorAll('.wrap-accordion');
  wrapAccordions.forEach((accordion) => {
    const btn = accordion.querySelector('.btn-accordion');
    const box = accordion.querySelector('.box-accordion') as HTMLElement;

    if (accordion?.classList.contains('active')) {
      box.style.height = `${box.scrollHeight}px`;
      box.style.borderTop = '1px solid #ededed';
      box.style.opacity = '1';
    }

    btn?.addEventListener('click', () => {
      accordion?.classList.toggle('active');
      if (accordion?.classList.contains('active')) {
        box.style.height = `${box.scrollHeight}px`;
        box.style.borderTop = '1px solid #ededed';
        box.style.opacity = '1';
      } else {
        box.style.borderTop = 'none';
        box.style.height = '0px';
        box.style.opacity = '0';
      }
    });
  });
});

const onImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      designInfo.value.mainImage = e.target?.result as string;
    };
    reader.readAsDataURL(target.files[0]);
  }
};
</script>

<style lang="scss" scoped>
.wrap-editor {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: #f4f3f0;
  .container{
    height: 100%;
    padding: 24px;
  }
  .box-editor{
    flex: 1;
    height: 100%;
  }
  .wrap-accordion{
    width: 100%;
    max-width: 520px;
    margin: 0 auto 16px auto;
    background: #fff;
    border-radius: 8px;
    .btn-accordion{
      width: 100%;
      height: 56px;
      border: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      cursor: pointer;
      .accordion-title{
        font-size: 16px;
        font-weight: bold;
        color: #333;
      }
      i.icon-chevron-down{
        font-size: 20px;
        color: #666;
      }
    }
    .box-accordion{
      overflow: hidden;
      height: 0;
      transition: height 0.3s ease, opacity 0.3s ease;
      opacity: 0;
      .box-content{
        padding: 18px 24px;
      }
    }
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
</style>
