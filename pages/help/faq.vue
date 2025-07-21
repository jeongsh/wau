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
      <h1>FAQ</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="faqs.length === 0">
            <td colspan="3">등록된 FAQ가 없습니다.</td>
          </tr>
          <tr v-else v-for="(faq,index) in faqs" @click="detailFaq(faq.no)" :style="{ cursor: 'pointer' }" :key="faq.no">
            <td>{{ index + 1 }}</td>
            <td>{{ faq.title }}</td>
            <td>{{ transferDate(faq.createdDt) }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="navigateTo('/help/faq/write')">FAQ 작성</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FaqInfo } from '~/types/faq'
const faqs = ref([]) as Ref<FaqInfo[]>
const { transferDate } = useDate()

onMounted(async () => {
  faqs.value = await $fetch('/api/help/faqs')
})

const detailFaq = (no: number) => {
  navigateTo(`/help/faq/${no}`)
}
</script>