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
      <button @click="changeFaqType('all')">전체</button>
      <button @click="changeFaqType('most')">많이하는 질문</button>
      <button @click="changeFaqType('essential')">필수 확인 질문</button>
      <button @click="changeFaqType('general')">일반 질문</button>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="viewFaqs.length === 0">
            <td colspan="3">등록된 FAQ가 없습니다.</td>
          </tr>
          <tr v-else v-for="(faq,index) in viewFaqs" @click="detailFaq(faq.no)" :style="{ cursor: 'pointer' }" :key="faq.no">
            <td>{{ index + 1 }}</td>
            <td v-if="faq.pick === true">중요 {{ faq.title }}</td>
            <td v-else> {{ faq.title }}</td>
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
const faqType = ref('all')
const viewFaqs = ref([]) as Ref<FaqInfo[]>

onMounted(async () => {
  faqs.value = await $fetch('/api/help/faqs')
  viewFaqs.value = faqs.value
})

const detailFaq = (no: number) => {
  navigateTo(`/help/faq/${no}`)
}

const changeFaqType = async (type: string) => {
  faqType.value = type
  if (type === 'all') {
    viewFaqs.value = faqs.value
  }
  else {
    viewFaqs.value = faqs.value.filter(faq => faq.type === type)
  }
}
</script>