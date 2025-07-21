<template>
  <div class="body">
    공지사항 상세
  </div>
  <div>
    <h1>{{ notice.title }}</h1>
    <p>{{ notice.content }}</p>
    <p>작성일: {{ transferDate(notice.createdDt) }}</p>
    <p>수정일: {{ transferDate(notice.updatedDt) }}</p>
  </div>
  <button @click="navigateTo('/help')">목록으로</button>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { NoticeInfo } from '~/types/notice'
const route = useRoute()
const notice = ref(<NoticeInfo>{})
const { transferDate } = useDate()

onMounted(async () => {
  notice.value = await $fetch('/api/help/notice', {
    method: 'GET',
    params: {
      no: route.params.no
    }
  })
})

</script>

<style lang="scss" scoped>

</style>
