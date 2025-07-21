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
      <h1>1:1 문의</h1>
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>제목</th>
            <th>문의유형</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>답변상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="contacts.length === 0">
            <td colspan="6">등록된 문의가 없습니다.</td>
          </tr>
          <tr v-else v-for="(contact, index) in contacts" @click="detailContact(contact.no)" :style="{ cursor: 'pointer' }" :key="contact.no">
            <td>{{ index + 1 }}</td>
            <td>{{ contact.title }}</td>
            <td>{{ contact.type }}</td>
            <td>{{ contact.userName }}</td>
            <td>{{ transferDate(contact.createdDt) }}</td>
            <td>
              <span :class="contact.answer ? 'answered' : 'pending'">
                {{ contact.answer ? '답변완료' : '답변대기' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="navigateTo('/help/contact/write')">문의 하기</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/contact'
const contacts = ref([]) as Ref<Contact[]>
const { transferDate } = useDate()

onMounted(async () => {
  contacts.value = await $fetch('/api/help/contacts')
})

const detailContact = (no: number) => {
  navigateTo(`/help/contact/${no}`)
}
</script>

<style lang="scss" scoped>
.answered {
  color: #28a745;
  font-weight: 500;
}

.pending {
  color: #ffc107;
  font-weight: 500;
}

table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: 600;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }
}

button {
  margin-top: 20px;
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: #0056b3;
  }
}
</style>