<template>
  <section class="sec-invitation">
    <p class="sub-title">(❁´◡`❁)</p>
    <div class="box-text">
      <p v-html="designInfo.greeting"></p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor';
import { useEditorStore } from '~/stores/editor';
const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);
</script>

<style lang="scss" scoped>
.sec-invitation{
  padding: 48px 0;
  text-align: center;
  .sub-title{
    font-size: 12px;
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 16px;
  }
}
</style>
