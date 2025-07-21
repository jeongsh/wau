<template>
  <section class="sec-gallery">
    <swiper-container
      ref="containerRef"
      Navigation="true"
      Pagination="true"
      :autoHeight="true"
    >
      <swiper-slide
        v-for="(slide, index) in designInfo.gallery.images"
        :key="index"
      >
        <button class="btn-open-modal" @click="openModal(index)">
          <img :src="slide" alt="Gallery Image" class="gallery-image" />
        </button>
      </swiper-slide>
    </swiper-container>
    <BlocksGalleryModalImage
      v-if="isOpen"
      :currentIndex="currentIndex"
      @close="closeModal"
    />
  </section>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
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

</style>
