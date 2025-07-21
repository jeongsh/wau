<template>
  <label class="btn-toggle">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="circle"></span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: Boolean
})
</script>
<style lang="scss" scoped>
.btn-toggle {
  position: relative;
  width: 42px;
  height: 22px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 50px;
  border: 1px solid #DBDBDB;
  z-index: 90;
  cursor: pointer;
  input {
    display: none;
  }
  .circle {
    width: 18px;
    height: 18px;
    background: #bdbdbd;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    transition: all 0.3s;
  }
  input:checked + .circle {
    left: 22px;
    background: #0FCEB9;
  }
}
</style>