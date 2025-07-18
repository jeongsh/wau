<template>
  <section class="sec-design">
    이것은 C
  </section>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const { designInfo, weddingInfo, formattedDate, formattedTime } = storeToRefs(editorStore);
</script>

<style lang="scss" scoped>
.sec-design{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: var(--primary-color);
  .date{
    font-size: 36px;
    color: #fff;
    font-weight: 300;
    margin-bottom: 16px;
    font-family: 'Amphora', sans-serif;
  }
  .time{
    font-family: 'Amphora', sans-serif;
    font-size: 48px;
    color: #fff;
    font-weight: 300;
  }
}
</style>