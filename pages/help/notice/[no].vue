<template>
  <div class="body">
    공지사항 상세
  </div>
  <div>
    <h1>{{ notice.title }}</h1>
    <p>{{ notice.content }}</p>
    <p>작성일: {{ notice.createdDt }}</p>
    <p>수정일: {{ notice.updatedDt }}</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { NoticeInfo } from '~/types/notice'
const { $date } = useNuxtApp()
const route = useRoute()
const notice = ref(<NoticeInfo>{
  no: 0,
  pick: false,
  deletedYn: false,
  title: '',
  content: '',
  createdDt: null,
  updatedDt: null,
})
const createDt = ref('')
const updatedDt = ref('')
onMounted(async () => {
  notice.value = await $fetch('/api/help/notice', {
    method: 'GET',
    params: {
      no: route.params.no
    }
  })
  notice.value.createdDt = $date.toKST(notice.value.createdDt)
  notice.value.updatedDt = $date.toKST(notice.value.updatedDt)
})

</script>

<style lang="scss" scoped>

</style>
