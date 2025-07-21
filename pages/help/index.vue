<template>
  <div class="body">
    <div class="header">
      고객센터
    </div>
    <div class="nav">
      <NuxtLink to="/help">공지사항</NuxtLink>
      <NuxtLink to="/help/faq">FAQ</NuxtLink>
      <NuxtLink to="/help/contact">1:1문의</NuxtLink>
    </div>
    <div class="content">
      <h1>공지사항</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(notice,index) in notices" @click="detailNotice(notice.no)" :style="{ cursor: 'pointer' }" :key="notice.no">
            <td>{{ index + 1 }}</td>

            <td v-if="notice.pick === true">중요 {{ notice.title }}</td>
            <td v-else> {{ notice.title }}</td>
            <td>{{ transferDate(notice.createdDt) }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="navigateTo('/help/notice/write')">공지사항 작성</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NoticeInfo } from '~/types/notice'
const notices = ref([]) as Ref<NoticeInfo[]>
const { transferDate } = useDate()

onMounted(async () => {
  notices.value = await $fetch('/api/help/notices')
})

const detailNotice = (no: number) => {
  navigateTo(`/help/notice/${no}`)
}
</script>