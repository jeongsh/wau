<template>
  <div class="wrap-accordion">
    <div class="header-accordion">
      <button class="btn-accordion" @click="toggle">
        <span class="accordion-title">{{ title }}</span>
        <i class="icon-chevron-down" :class="{ open: isOpen }"></i>
      </button>
      <UtilsToggleSwitch
        v-if="props.isSwitch !== null"
        :modelValue="props.isSwitch"
        @update:modelValue="emit('update:isSwitch', $event)"
      />
    </div>
    <div
      ref="contentBox"
      class="box-accordion"
      :style="boxStyle"
      @transitionend="onTransitionEnd"
    >
      <div class="box-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  isOpen: Boolean ,
  isSwitch: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits(['update:isOpen', 'update:isSwitch'])

const isOpen = ref(props.isOpen ?? false)
const contentBox = ref(null)
const boxStyle = ref({
  height: '0px',
  opacity: 0,
  pointerEvents: 'none',
  overflowY: 'hidden',
  transition: 'height 0.3s, opacity 0.3s'
})

const toggle = async () => {
  isOpen.value = !isOpen.value
  emit('update:modelValue', isOpen.value)
  await nextTick()
  updateHeight()
}

const updateHeight = () => {
  if (!contentBox.value) return
  if (isOpen.value) {
    // 열 때: 실제 높이 지정
    const scrollHeight = contentBox.value.scrollHeight
    boxStyle.value.height = scrollHeight + 'px'
    boxStyle.value.opacity = 1
    boxStyle.value.pointerEvents = 'auto'
    boxStyle.value.overflowY = 'hidden'
  } else {
    // 닫을 때: 0px로
    boxStyle.value.height = contentBox.value.scrollHeight + 'px'
    // 바로 0으로
    requestAnimationFrame(() => {
      boxStyle.value.height = '0px'
      boxStyle.value.opacity = 0
      boxStyle.value.pointerEvents = 'none'
      boxStyle.value.overflowY = 'hidden'
    })
  }
}

// 트랜지션 끝나면 auto로 변경 (콘텐츠 변경 시 반영)
const onTransitionEnd = (e) => {
  if (!contentBox.value) return
  if (isOpen.value && e.propertyName === 'height') {
    boxStyle.value.height = 'auto'
    boxStyle.value.overflowY = 'visible'
  }
}

// 만약 내부 내용이 동적으로 바뀔 때(예: 이미지 로드) 높이 재계산 필요
const resizeBox = () => {
  if (isOpen.value && contentBox.value) {
    boxStyle.value.height = 'auto'
    nextTick(() => {
      boxStyle.value.height = contentBox.value.scrollHeight + 'px'
    })
  }
}

// 최초 마운트, isOpen 변화 시 반영
onMounted(() => updateHeight())
watch(isOpen, () => updateHeight())
</script>

<style scoped lang="scss">
.wrap-accordion {
  width: 100%;
  max-width: 520px;
  margin: 0 auto 16px auto;
  background: #fff;
  border-radius: 8px;
  .header-accordion {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    padding: 0 16px;
  }
  .btn-accordion {
    flex:1;
    height: 100%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .accordion-title {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
    i.icon-chevron-down {
      font-size: 20px;
      color: #666;
      transition: transform 0.3s;
      &.open {
        transform: rotate(180deg);
      }
    }
  }
  .box-accordion {
    height: 0;
    transition: height 0.3s, opacity 0.3s;
    opacity: 0;
    pointer-events: none;
    overflow-y: hidden;
    .box-content {
      padding: 18px 24px;
    }
  }
}
</style>