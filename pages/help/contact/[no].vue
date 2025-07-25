<template>
  <div class="body">
    <div class="header">
      <h1>문의 상세</h1> 
    </div>
    <div class="content">
      <div class="contact-detail">
        <div class="contact-header">
          <h2>{{ contact.title }}</h2>
          <div class="contact-meta">
            <span class="contact-type">{{ getTypeLabel(contact.type) }}</span>
            <span :class="contact.answer ? 'answered' : 'pending'">
              {{ contact.answer ? '답변완료' : '답변대기' }}
            </span>
          </div>
        </div>
        
        <div class="contact-info">
          <div class="info-item">
            <label>작성자:</label>
            <span>{{ contact.userName }}</span>
          </div>
          <div class="info-item">
            <label>이메일:</label>
            <span>{{ contact.userEmail }}</span>
          </div>
          <div class="info-item" v-if="contact.phoneNumber">
            <label>연락처:</label>
            <span>{{ contact.phoneNumber }}</span>
          </div>
          <div class="info-item">
            <label>작성일:</label>
            <span>{{ transferDate(contact.createdDt) }}</span>
          </div>
        </div>
        
        <div class="contact-content">
          <h3>문의 내용</h3>
          <div class="content-text">
            {{ contact.content }}
          </div>
        </div>
        
        <div class="contact-answer" v-if="contact.answer">
          <h3>답변</h3>
          <div class="answer-text">
            {{ contact.answer }}
          </div>
          <div class="answer-date" v-if="contact.updatedDt">
            답변일: {{ transferDate(contact.updatedDt) }}
          </div>
        </div>
        
        <div class="actions">
          <button @click="goBack" class="btn-back">목록으로</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { Contact } from '~/types/contact'

const route = useRoute()
const contact = ref<Contact>({} as Contact)
const { transferDate } = useDate()

const typeOptions = [
  { value: 'general', label: '일반 문의' },
  { value: 'technical', label: '기술 지원' },
  { value: 'billing', label: '결제 문의' },
  { value: 'account', label: '계정 문의' },
  { value: 'bug', label: '버그 신고' },
  { value: 'suggestion', label: '제안사항' }
]

const getTypeLabel = (type: string) => {
  const option = typeOptions.find(opt => opt.value === type)
  return option ? option.label : type
}

onMounted(async () => {
  try {
    contact.value = await $fetch('/api/help/contact', {
      method: 'GET',
      params: {
        no: route.params.no
      }
    })
  } catch (error) {
    console.error('Contact 조회 실패:', error)
    alert('문의를 불러오는데 실패했습니다.')
    navigateTo('/help/contact')
  }
})

const goBack = () => {
  navigateTo('/help/contact')
}
</script>

<style lang="scss" scoped>
.body {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  margin-bottom: 30px;
  
  h1 {
    font-size: 28px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
}

.content {
  background: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-detail {
  .contact-header {
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    
    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0 0 10px 0;
    }
    
    .contact-meta {
      display: flex;
      gap: 10px;
      
      .contact-type {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        background: #e9ecef;
        color: #6c757d;
      }
      
      .answered {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        background: #d4edda;
        color: #155724;
      }
      
      .pending {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        background: #fff3cd;
        color: #856404;
      }
    }
  }
  
  .contact-info {
    margin-bottom: 30px;
    
    .info-item {
      display: flex;
      margin-bottom: 10px;
      
      label {
        width: 80px;
        font-weight: 500;
        color: #666;
      }
      
      span {
        color: #333;
      }
    }
  }
  
  .contact-content,
  .contact-answer {
    margin-bottom: 30px;
    
    h3 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin-bottom: 15px;
    }
    
    .content-text,
    .answer-text {
      line-height: 1.6;
      color: #555;
      white-space: pre-wrap;
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
    }
    
    .answer-date {
      margin-top: 10px;
      font-size: 14px;
      color: #666;
      text-align: right;
    }
  }
  
  .actions {
    display: flex;
    justify-content: center;
    
    .btn-back {
      padding: 12px 24px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
      
      &:hover {
        background: #0056b3;
      }
    }
  }
}
</style>
