<template>
  <div 
    class="wrap-select"
    :style="{ width: width + 'px' }"
    :class="{ reverse: isReverse }"
    ref="wrapSelect"
  >
    <button 
      class="btn-select" 
      @click="toggleSelect"
    >
      {{ title }}
    </button>
    <div class="options">
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
  width: Number,
  isReverse : Boolean
});

const wrapSelect = ref<HTMLElement | null>(null);

const toggleSelect = (event: MouseEvent) => {
  if (!wrapSelect.value) return;
  // toggle 'active' class on wrapSelect and options
  wrapSelect.value.classList.toggle('active');
  const options = wrapSelect.value.querySelector('.options');
  if (options) {
    options.classList.toggle('active');
  }
};

const onDocumentClick = (event: MouseEvent) => {
  if (!wrapSelect.value) return;
  const target = event.target as Node;

  // wrapSelect 내부를 클릭한 경우에는 아무 동작 X
  if (wrapSelect.value.contains(target)) return;

  // wrapSelect 외부 클릭: active 해제
  wrapSelect.value.classList.remove('active');
  const options = wrapSelect.value.querySelector('.options');
  if (options) {
    options.classList.remove('active');
  }
};

onMounted(() => {
  document.addEventListener('click', onDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick);
});
</script>

<style lang="scss">
.wrap-select{
  position: relative;
  .btn-select{
    border: 1px solid #dbdbdb;
    outline: none;
    color: #2b2b2b;
    height: 42px;
    min-height: 40px;
    font-size: 13px;
    background: #fff;
    padding: 10px 16px;
    border-radius: 8px;
    width: 100%;
    text-align: left;
  }
  .options{
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    background: #fff;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    display: none;
    button{
      width: 100%;
      height: 32px;
      padding: 6px 16px;
      border-bottom: 1px solid #dbdbdb;
      display: flex;
      align-items: center;
      text-align: left;
      font-size: 12px;
    }
    &.active{
      display: block;
    }
  }
  &.reverse{
    .options{
      top: auto;
      bottom: calc(100% + 8px);
    }
  }
}
</style>
