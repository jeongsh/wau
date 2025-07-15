<template>
  <div class="box-main">
    <div class="box-img">
      <img :src="designInfo.mainImage" alt="Main Visual" />
    </div>
    <h3>영어로 뭐라 씨부리기</h3>
    <p>
      {{ weddingInfo.groom.name }} &amp; {{ weddingInfo.bride.name }}
    </p>
    <p>
      결혼식에 초대합니다.
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
  }
  h3{
    font-size: 36px;
    margin: 16px 0 48px;
  }
  p{
    font-size: 24px;
  }
  .box-img{
    height: 40%;
    width: 100%;
    position: relative;
    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      mask-image: linear-gradient(0deg, transparent, rgba(0,0,0,.013) 1.1%,rgba(0,0,0,.049) 2.3%,rgba(0,0,0,.104) 3.58%,rgba(0,0,0,.175) 4.94%,rgba(0,0,0,.259) 6.34%,rgba(0,0,0,.352) 7.78%,rgba(0,0,0,.45) 9.26%,rgba(0,0,0,.55) 10.74%,rgba(0,0,0,.648) 12.22%,rgba(0,0,0,.741) 13.66%,rgba(0,0,0,.825) 15.06%,rgba(0,0,0,.896) 16.42%,rgba(0,0,0,.951) 17.7%,rgba(0,0,0,.987) 18.9%, #000 20%);
    }
  }
</style>