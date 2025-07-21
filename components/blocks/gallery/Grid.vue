<template>
  <section class="sec-gallery">
    <p class="sec-title">갤러리</p>
    <div class="wrap-gallery">
      <button class="btn-open-modal" v-for="(image, index) in designInfo.gallery.images" 
        :key="index" @click="openModal(index)">
        <img :src="image" class="gallery-image" />
      </button>
    </div>
    <BlocksGalleryModalImage v-if="isOpen" :currentIndex="currentIndex" @close="closeModal" />
  </section>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';
const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);
const isOpen = ref(false);
const currentIndex = ref(0);

const openModal = (index: number) => {
  currentIndex.value = index;
  isOpen.value = true;
  document.body.style.overflow = 'hidden'; // 스크롤 방지
};

const closeModal = () => {
  isOpen.value = false;
  document.body.style.overflow = ''; // 스크롤 허용
};
</script>

<style lang="scss" scoped>
.wrap-gallery{
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  .btn-open-modal{
    aspect-ratio: 1;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
      // drag방지
      user-select: none;
      -webkit-user-drag: none;
    }
  }
}
</style>
