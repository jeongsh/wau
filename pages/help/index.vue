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
      {{notices}}
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="notice in notices" :key="notice.id" @click="detailNotice(notice.no)">
            <td>{{ notice.title }}</td>
            <td>{{ $date.toKST(notice.createdDt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const notices = ref([])
const { $date } = useNuxtApp()

onMounted(async () => {
  notices.value = await $fetch('/api/help/notices')
  notices.value.forEach(notice => {
    notice.createdDt = $date.toKST(notice.createdDt)
    notice.updatedDt = $date.toKST(notice.updatedDt)
  })
})

const detailNotice = (no) => {
  navigateTo(`/help/notice/${no}`)
}
</script>