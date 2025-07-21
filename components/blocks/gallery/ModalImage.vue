<template>
  <div class="modal">
    <div class="modal-container">
      <button class="btn-close" @click="$emit('close')">X</button>
      <swiper-container
        ref="containerRef"
        Navigation="true"
        Pagination="true"
        :autoHeight="true"
        :initialSlide="props.currentIndex"
      >
        <swiper-slide
          v-for="(slide, idx) in designInfo.gallery.images"
          :key="idx"
        >
          <img :src="slide" alt="Gallery Image" class="gallery-image" />
        </swiper-slide>
      </swiper-container>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from 'swiper/modules';
import { useEditorStore } from '~/stores/editor';
const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);
const props = defineProps<{
  currentIndex: number;
}>();

</script>

<style lang="scss" scoped>
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .modal-container{
    width: 100%;
    max-width: 450px;
    background: #fff;
    height: 100%;
  }
}
</style>
