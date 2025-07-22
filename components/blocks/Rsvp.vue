<template>
  <section class="sec-rsvp">
    <div class="rsvp-container">
      <h2 class="rsvp-title">{{ designInfo.rsvp.title }}</h2>
      <p class="rsvp-description">{{ designInfo.rsvp.description }}</p>
      <button class="btn-popup" @click="toggleModal">
        전달하기
      </button>
    </div>
    <div v-if="isOpenModal && weddingInfo.rsvp" class="modal" @click="toggleModal">
      <div class="modal-container" @click.stop>
        <h3>참석 여부</h3>
        <div class="box-label">
          <label>
            <input type="radio" v-model="weddingInfo.rsvp.isAttending" :value="true" />
            감
          </label>
          <label>
            <input type="radio" v-model="weddingInfo.rsvp.isAttending" :value="false" />
            안감
          </label>
        </div>
        <div class="box-label">
          <label>
            <input type="radio" v-model="weddingInfo.rsvp.side" :value="'groom'" />
            신랑측
          </label>
          <label>
            <input type="radio" v-model="weddingInfo.rsvp.side" :value="'bride'" />
            신부측
          </label>
        </div>
        <label>
          이름:
          <input type="text" v-model="weddingInfo.rsvp.name" placeholder="이름을 입력하세요" />
        </label>
        <label v-if="designInfo.rsvp.isShowPeopleCount">
          인원 수:
          <input type="number" v-model="weddingInfo.rsvp.peopleCount" placeholder="인원 수를 입력하세요" />
        </label>
        <label v-if="designInfo.rsvp.isShowNumber">
          연락처:
          <input type="text" v-model="weddingInfo.rsvp.number" placeholder="연락처를 입력하세요" />
        </label>
        <label v-if="designInfo.rsvp.isShowMessage">
          메시지:
          <textarea v-model="weddingInfo.rsvp.message" placeholder="메시지를 입력하세요"></textarea>
        </label>
        <div class="box-label" v-if="designInfo.rsvp.isShowEating">
          <label>
            <input type="radio" v-model="weddingInfo.rsvp.isEating" :value="true" />
            먹
          </label>
          <label>
            <input type="radio" v-model="weddingInfo.rsvp.isEating" :value="false" />
            안먹
          </label>
        </div>
        <div class="box-label" v-if="designInfo.rsvp.isShowRide">
          <label>
            <input type="radio" v-model="weddingInfo.rsvp.isRide" :value="true" />
            탐
          </label>
          <label>
            <input type="radio" v-model="weddingInfo.rsvp.isRide" :value="false" />
            안탐
          </label>
        </div>
        <button class="btn-submit" @click="toggleModal">제출</button>
        <button class="btn-close" @click="toggleModal">닫기</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';
const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);
const isOpenModal = ref(false)

onMounted(() => {

});

const toggleModal = () =>{
  isOpenModal.value = !isOpenModal.value;
  if (isOpenModal.value) {
    document.body.style.overflow = 'hidden'; // 스크롤 방지
  } else {
    document.body.style.overflow = ''; // 스크롤 허용
  }
}
</script>

<style lang="scss" scoped>
.sec-rsvp {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  .rsvp-container {
    text-align: center;
    .rsvp-title {
      font-size: 24px;
      margin-bottom: 10px;
    }
    .rsvp-description {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .btn-popup {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  }
  
}
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  
  .modal-container {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 500px;

    h3 {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 10px;
    }

    input[type="text"],
    input[type="number"],
    textarea,
    select {
      width: calc(100% - 20px);
      padding: 10px;
      margin-top: 5px;
      border-radius: 4px;
      border: 1px solid #ccc;
    }

    .btn-close {
      margin-top: 15px;
      padding: 10px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .btn-close:hover {
      background-color: #c82333;
    }
  }
  .box-label{
    display: flex;
    margin-top: 10px;
    gap: 8px;

    label {
      display: flex;
      align-items: center;
      cursor: pointer;

      input[type="radio"] {
        margin-right: 5px;
      }
    }
  }
}
</style>
