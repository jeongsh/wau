<template>
  <section class="sec-video">
    <iframe
      v-if="designInfo.video.isShowVideo && designInfo.video.videoUrl"
      :src="`https://www.youtube.com/embed/${designInfo.video.videoUrl}`"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="video-iframe"
      :class="designInfo.video.type === 'horizontal' ? 'horizontal' : 'vertical'"
    ></iframe>
  </section>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';
const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);
</script>

<style lang="scss" scoped>
.sec-video {
  width: 100%;
}

.video-iframe {
  width: 100%;
  &.horizontal {
    aspect-ratio: 16 / 9;
  }
  &.vertical {
    aspect-ratio: 9 / 16;
  }
}
</style>
