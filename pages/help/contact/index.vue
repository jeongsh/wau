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
            <td>{{ getTypeLabel(contact.type) }}</td>
            <td>{{ contact.userName }}</td>
            <td>{{ transferDateFormatted(contact.createdDt) }}</td>
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
const { transferDateFormatted } = useDate()
const typeOptions = [
  { value: 'general', label: '일반 문의' },
  { value: 'technical', label: '기술 지원' },
  { value: 'billing', label: '결제 문의' },
  { value: 'account', label: '계정 문의' },
  { value: 'bug', label: '버그 신고' },
  { value: 'suggestion', label: '제안사항' }
]

onMounted(async () => {
  contacts.value = await $fetch('/api/help/contacts')
})

const detailContact = (no: number) => {
  navigateTo(`/help/contact/${no}`)
}

const getTypeLabel = (type: string) => {
  const option = typeOptions.find(opt => opt.value === type)
  return option ? option.label : type
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
        padding: 15px 12px;
        text-align: left;
        font-weight: 600;
        color: #333;
        border-bottom: 2px solid #e0e0e0;
        
        &:first-child {
          width: 60px;
          text-align: center;
        }
        
        &:nth-child(3) {
          width: 100px;
          text-align: center;
        }
        
        &:nth-child(4) {
          width: 120px;
          text-align: center;
        }
        
        &:nth-child(5) {
          width: 120px;
          text-align: center;
        }
        
        &:last-child {
          width: 100px;
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
          padding: 15px 12px;
          color: #555;

          &:first-child {
            text-align: center;
            font-weight: 500;
            color: #666;
          }

          &:nth-child(3) {
            text-align: center;
            font-size: 0.9rem;
            background-color: #f8f9fa;
            font-weight: 500;
          }

          &:nth-child(4) {
            text-align: center;
            color: #666;
          }

          &:nth-child(5) {
            text-align: center;
            color: #888;
            font-size: 0.9rem;
          }

          &:last-child {
            text-align: center;
          }
        }
      }

      // 빈 데이터 행
      tr:has(td[colspan]) {
        td {
          text-align: center;
          color: #999;
          font-style: italic;
          padding: 40px;
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

// 답변 상태 스타일
.answered {
  background-color: #d4edda;
  color: #155724;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid #c3e6cb;
}

.pending {
  background-color: #fff3cd;
  color: #856404;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid #ffeaa7;
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
      font-size: 0.8rem;

      th, td {
        padding: 8px 4px;
      }

      // 모바일에서는 일부 컬럼 숨김
      th:nth-child(3),
      td:nth-child(3),
      th:nth-child(4),
      td:nth-child(4),
      th:nth-child(5),
      td:nth-child(5) {
        display: none;
      }
    }

    .answered,
    .pending {
      font-size: 0.7rem;
      padding: 2px 6px;
    }
  }
}
</style>
