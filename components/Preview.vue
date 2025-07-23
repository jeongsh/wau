<template>
  <div 
    class="preview"
    :style="{
      overflowY : designInfo.intro.isShowIntro ? 'hidden' : 'auto',
    }" 
    :class=" [
      `theme-${designInfo.themeColor}`,
      `${designInfo.fontStyle}`,
      `fontsize-${designInfo.fontSize}`,
    ]"
  >
  <!-- 인트로 -->
  <section class="sec-main">
    <component :is="MainVisualComponent" :designInfo="designInfo" :weddingInfo="weddingInfo" />
    <component 
      v-if="designInfo.intro.isShowIntro"
      :is="IntroComponent" 
      :designInfo="designInfo" 
      :weddingInfo="weddingInfo" 
    />
  </section>
    <template v-for="component in orderedComponents" :key="component.id">
      <BlocksInivitation v-if="component.id === 'greeting'" />

      <component v-else-if="component.id === 'designPage'" :is="DesignPagesComponent" />
      <BlocksDate
        v-else-if="component.id === 'date' && component.isActive"
        :weddingInfo="weddingInfo"
        :designInfo="designInfo"
        :date="formattedDate"
        :time="formattedTime"
      />

      <BlocksLocation v-else-if="component.id === 'location'" />

      <BlocksContact v-else-if="component.id === 'contact' && component.isActive" />

      <BlocksAccount v-else-if="component.id === 'account' && component.isActive" />

      <component 
        v-else-if="component.id === 'gallery' && component.isActive" 
        :is="GalleryComponent" 
      />

      <BlocksVideo v-else-if="component.id === 'video' && component.isActive" />
      <BlocksRsvp v-else-if="component.id === 'rsvp' && component.isActive" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor'; 
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const { designInfo, weddingInfo, formattedDate, formattedTime, orderedComponents } = storeToRefs(editorStore);

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
<style lang="scss">
.preview{
  img{
    touch-action: pan-y; /* 모든 터치 제스처 차단 */
    -webkit-user-drag: none; /* 드래그 방지 */
    user-select: none;
    pointer-events: none; /* (선택사항) 클릭도 막고 싶다면 추가 */
    -webkit-touch-callout: none; /* iOS에서 이미지 클릭 시 메뉴 표시 방지 */
    -webkit-tap-highlight-color: transparent; /* 모바일에서 클릭 시 하이라이트 제거 */
    -webkit-user-select: none; /* iOS에서 드래그 방지 */
    -moz-user-select: none; /* Firefox에서 드래그 방지 */
    -ms-user-select: none; /* IE에서 드래그 방지 */
    user-select: none; /* 모든 브라우저에서 드래그 방지 */
  }
}
</style>