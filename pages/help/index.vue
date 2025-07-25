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
            <td>{{ transferDateFormatted(notice.createdDt) }}</td>
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
const { transferDateFormatted } = useDate()

onMounted(async () => {
  notices.value = await $fetch('/api/help/notices')
})

const detailNotice = (no: number) => {
  navigateTo(`/help/notice/${no}`)
}
</script>

<style scoped lang="scss">
.body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
}

.header {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  padding: 5% 0;
  border-bottom: 2px solid #e0e0e0;
  color: #333;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
  padding: 15px 0;
  background-color: #f8f9fa;
  border-radius: 8px;

  a {
    text-decoration: none;
    color: #666;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      background-color: #007bff;
      color: white;
    }

    &.router-link-active {
      background-color: #007bff;
      color: white;
    }
  }
}

.content {
  h1 {
    font-size: 1.5rem;
    margin-bottom: 25px;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 30px;
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;

    thead {
      background-color: #f8f9fa;
      
      th {
        padding: 15px;
        text-align: left;
        font-weight: 600;
        color: #333;
        border-bottom: 2px solid #e0e0e0;
        
        &:first-child {
          width: 80px;
          text-align: center;
        }
        
        &:last-child {
          width: 150px;
          text-align: center;
        }
      }
    }

    tbody {
      tr {
        border-bottom: 1px solid #e0e0e0;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #f5f5f5;
        }

        td {
          padding: 15px;
          color: #555;

          &:first-child {
            text-align: center;
            font-weight: 500;
            color: #666;
          }

          &:last-child {
            text-align: center;
            color: #888;
            font-size: 0.9rem;
          }
        }
      }
    }
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &:active {
      transform: translateY(1px);
    }
  }
}

// 반응형 디자인
@media (max-width: 768px) {
  .body {
    padding: 15px;
  }

  .header {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  .nav {
    flex-direction: column;
    gap: 10px;
    text-align: center;

    a {
      display: block;
      margin: 0 10px;
    }
  }

  .content {
    table {
      font-size: 0.9rem;

      th, td {
        padding: 10px 8px;
      }

      th:last-child,
      td:last-child {
        display: none;
      }
    }
  }
}
</style>