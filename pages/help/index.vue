<template>
  <div class="body">
    <div class="header">
      고객센터
    </div>
    <div class="nav">
      <NuxtLink to="/help">공지사항</NuxtLink>
      <NuxtLink to="/help/faq">FAQ</NuxtLink>
      <NuxtLink to="/help/contact">문의하기</NuxtLink>
    </div>
    <div class="content">
      <h1>공지사항</h1>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notice in noticeList" @click="detailNotice(notice.no)">
            <td>{{ notice.title }}</td>
            <td>{{ notice.createdDt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NoticeInfo } from '~/types/notice'
const notices = ref([]) as Ref<NoticeInfo[]>
const noticeList = ref<{ createdDt: string; updatedDt: string; no: number }[]>([])
const { $date } = useNuxtApp()

onMounted(async () => {
  notices.value = await $fetch('/api/help/notices')
  notices.value.forEach(notice => {
    noticeList.value.push({
      createdDt: $date.toKST(notice.createdDt),
      updatedDt: $date.toKST(notice.updatedDt),
      no: notice.no
    })
  })
})

const detailNotice = (no: number) => {
  navigateTo(`/help/notice/${no}`)
}
</script>