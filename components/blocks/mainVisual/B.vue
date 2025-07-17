<template>
  <div class="box-main">
    <div class="box-img">
      <img :src="designInfo.mainVisual.image" alt="Main Visual" />
    </div>
    <h3>for<br>ever.</h3>
    <p class="left">
      {{ weddingInfo.groom.familyName }}{{ weddingInfo.groom.name }}
    </p>
    <p class="right">
      {{ weddingInfo.bride.familyName }}{{ weddingInfo.bride.name }}
    </p>
  </div>
</template>
<script setup lang="ts">
import type { DesignInfo, WeddingInfo } from '~/types/editor'; 

const props = defineProps<{
  designInfo: DesignInfo;
  weddingInfo: WeddingInfo;
}>();

</script>
<style lang="scss" scoped>
  .box-main{
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
  }
  h3{
    position: absolute;
    bottom: 6vw;
    left: 1vw;
    font-size: 8vw;
    line-height: 0.6;
    text-align: left;
    color: #fff;
  }
  p{
    font-size: 24px;
    color: #fff;
  }
  .left{
    position: absolute;
    bottom: 2vw;
    left: 1vw;
  }
  .right{
    position: absolute;
    bottom: 2vw;
    right: 1vw;
  }
  .box-img{
    height: 100%;
    width: 100%;
    position: relative;
    background: #000;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.8;
    }
  }
</style>