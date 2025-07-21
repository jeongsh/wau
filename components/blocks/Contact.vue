<template>
  <section class="sec-contact">
    <button class="btn-contact" @click="toggleModal">
      연락하기
    </button>
    <div class="modal" v-if="isOpen">
      <!-- 신랑, 신랑 아버지, 신랑 어머니 연락처 입력 없으면 안보이고, 사망한 부모님 안보임 -->
      <p class="sub-title">신랑측 연락처</p>
      <p class="box-text" v-if="weddingInfo.groom.number">
        신랑 : {{ weddingInfo.groom.name }}
        {{ weddingInfo.groom.number }}
      </p>
      <div class="box-text" >
        <span v-if="weddingInfo.groom.parents[0].number">
          신랑 아버지 : {{ weddingInfo.groom.parents[0].name }}
          {{ weddingInfo.groom.parents[0].number }}
        </span>
        <span v-if="weddingInfo.groom.parents[1].number">
          신랑 어머니 : {{ weddingInfo.groom.parents[1].name }}
          {{ weddingInfo.groom.parents[1].number }}
        </span>
      </div>

      <p class="sub-title">신부측 연락처</p>
      <p class="box-text" v-if="weddingInfo.bride.number">
        신부 : {{ weddingInfo.bride.name }}
        {{ weddingInfo.bride.number }}
      </p>
      <div class="box-text">
        <span v-if="weddingInfo.bride.parents[0].number">
          신부 아버지 : {{ weddingInfo.bride.parents[0].name }}
          {{ weddingInfo.bride.parents[0].number }}
        </span>
        <span v-if="weddingInfo.bride.parents[1].number">
          신부 어머니 : {{ weddingInfo.bride.parents[1].name }}
          {{ weddingInfo.bride.parents[1].number }}
        </span>
      </div>
      <button class="btn-close" @click="toggleModal" style="color: #fff; text-align: center;">
        닫기
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);

const isOpen = ref(false);
const toggleModal = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  } else {
    document.body.style.overflow = ''; // 스크롤 허용
  }
};
</script>

<style lang="scss" scoped>
.sec-contact {
  padding: 48px 0;
  text-align: center;

  .sub-title {
    font-size: 12px;
    color: #fff;
    font-weight: 600;
    margin-bottom: 16px;
  }

  .box-text {
    font-size: 14px;
    color: #fff;
    line-height: 1.5;
  }
}
.btn-contact{
  width: 200px;
  height: 50px;
  border-radius: 50px;
  background: var(--primary-color);
  color: #fff;
  border: 1px solid #ededed;
  margin: 0 auto 24px auto;
}

.modal{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}

.btn-close{
  display: block;
  margin: 0 auto;
}
</style>
