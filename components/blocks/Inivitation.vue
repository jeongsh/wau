<template>
  <section class="sec-invitation">
    <p class="sub-title">(❁´◡`❁)</p>
    <div class="box-text" v-html="text">
    </div>
  </section>
</template>

<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor';
import { useEditorStore } from '~/stores/editor';
const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);

const text = ref<string>('');
onMounted(() => {
  text.value = designInfo.value.greeting.replace(/<p><\/p>/g, '<p><br></p>');
});
watch(() => designInfo.value.greeting, (newGreeting) => {
  text.value = newGreeting.replace(/<p><\/p>/g, '<p><br></p>');
});
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
