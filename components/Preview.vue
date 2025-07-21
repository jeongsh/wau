<template>
  <div 
    class="preview"
    :style="{
      overflowY : designInfo.intro.isShowIntro ? 'hidden' : 'auto',
    }" 
    :class="[
      `theme-${designInfo.themeColor}`,
      `${designInfo.fontStyle}`,
      `fontsize-${designInfo.fontSize}`,
    ]"
    v-auto-animate
  >
    <section class="sec-main">
      <component :is="MainVisualComponent" :designInfo="designInfo" :weddingInfo="weddingInfo" />
      <component 
        v-if="designInfo.intro.isShowIntro"
        :is="IntroComponent" 
        :designInfo="designInfo" 
        :weddingInfo="weddingInfo" 
      />
    </section>
    <BlocksInivitation />
    <DesignPagesComponent />
    <BlocksDate
      v-if="designInfo.calendar.isShowCalendar || designInfo.calendar.isShowCountdown"
      :weddingInfo="weddingInfo"
      :designInfo="designInfo"
      :date="formattedDate"
      :time="formattedTime"
    />
    <BlocksContact
      v-if="designInfo.isShowContact"
    />
    <BlocksAccount
      v-if="designInfo.isShowAccount"
    />
    <component 
      v-if="designInfo.gallery.isShowGallery" 
      :is="GalleryComponent" 
    />
  </div>
</template>

<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor'; 
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const { designInfo, weddingInfo, formattedDate, formattedTime } = storeToRefs(editorStore);

const IntroComponent = computed(() => {
  const IntroType = designInfo.value.intro.type;
  if(IntroType !== 'none') {
    return defineAsyncComponent(() =>
      import(`@/components/blocks/intros/${IntroType}.vue`)
    );
  }
});

const MainVisualComponent = computed(() => {
  const mainType = designInfo.value.mainVisual.type || 'A';
  return defineAsyncComponent(() =>
    import(`@/components/blocks/MainVisual/${mainType}.vue`)
  );
});

const DesignPagesComponent = computed(() => {
  const designType = designInfo.value.designPage || 'A';
  return defineAsyncComponent(() =>
    import(`@/components/blocks/designPages/${designType}.vue`)
  );
});

const GalleryComponent = computed(() => {
  const galleryType = designInfo.value.gallery.galleryType || 'Swipe';
  if (designInfo.value.gallery.isShowGallery) {
    return defineAsyncComponent(() =>
      import(`@/components/blocks/Gallery/${galleryType}.vue`)
    );
  }
  return null;
});
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  *{
    font-family: inherit;
  }
  .sec-main{
    height: 100%;
    width: 100%;
    background: var(--main-bg-color);
    position: relative;
  }
}

</style>
