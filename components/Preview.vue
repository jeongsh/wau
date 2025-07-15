<template>
  <div class="preview" :class="`theme-${designInfo.themeColor}`">
    <div class="box-main">
      <component :is="MainVisualComponent" :designInfo="designInfo" :weddingInfo="weddingInfo" />
    </div>
    <div class="box-invitation">
      <p class="sub-title">(❁´◡`❁)</p>
      <div class="box-text">
        <p>오랜 기다림 속에서<br>
          저희 두사람, 한 마음 되어<br>
          참된 사랑의 결실을 맺게 되었습니다.<br>
          <br><br>
          10월의 어느 햇살 고운 날,<br>
          귀한 걸음 하시어 따뜻한 마음으로<br>
          축복해 주시면 더 없는 기쁨이 되겠습니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor'; 

const props = defineProps<{
  designInfo: DesignInfo;
  weddingInfo: WeddingInfo;
}>();

const MainVisualComponent = computed(() => {
  // themeType을 명시적으로 참조하여 반응성 확보
  const themeType = props.designInfo.themeType;
  return defineAsyncComponent(() =>
    import(`@/components/MainVisual/${themeType}.vue`)
  );
});

</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .box-main{
    height: 100%;
    width: 100%;
    background: var(--main-bg-color);
  }
  .box-invitation{
    padding: 48px 0;
    text-align: center;
    .sub-title{
      font-size: 12px;
      color: var(--primary-color);
      font-weight: 600;
      margin-bottom: 16px;
    }
  }
}
</style>
