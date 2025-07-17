<template>
  <div class="wrap-intro">
    <img src="~/assets/images/ex/b.gif" alt="">
  </div>
</template>

<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor';
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);

onMounted(() => {
  setTimeout(() => {
    designInfo.value.intro.isShowIntro = false;
    console.log('Intro component has been removed');
  }, 3000);
});
</script>

<style lang="scss" scoped>
.wrap-intro{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
</style>
