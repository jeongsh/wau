<template>
  <div class="body">
    <div class="header">
      <h1>FAQ 상세</h1> 
    </div>
    <div class="content">
      <div class="faq-detail">
        <div class="faq-header">
          <h2>{{ faq.title }}</h2>
          <div class="faq-meta">
            <span class="faq-type" v-if="faq.type">{{ faq.type }}</span>
            <span class="faq-pick" v-if="faq.pick">중요</span>
          </div>
        </div>
        
        <div class="faq-content">
          <div class="content-text">
            {{ faq.content }}
          </div>
        </div>
        
        <div class="faq-footer">
          <p>작성일: {{ transferDate(faq.createdDt) }}</p>
          <p>수정일: {{ transferDate(faq.updatedDt) }}</p>
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
import type { FaqInfo } from '~/types/faq'

const route = useRoute()
const faq = ref<FaqInfo>({} as FaqInfo)
const { transferDate } = useDate()

onMounted(async () => {
  try {
    console.log('Fetching FAQ with ID:', route.params.no)
    faq.value = await $fetch('/api/help/faq', {
      method: 'GET',
      params: {
        no: route.params.no
      }
    })
  } catch (error) {
    console.error('FAQ 조회 실패:', error)
    alert('FAQ를 불러오는데 실패했습니다.')
    navigateTo('/help/faq')
  }
})

const goBack = () => {
  navigateTo('/help/faq')
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

.faq-detail {
  .faq-header {
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
    
    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0 0 10px 0;
    }
    
    .faq-meta {
      display: flex;
      gap: 10px;
      
      .faq-type,
      .faq-pick {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
      }
      
      .faq-type {
        background: #e9ecef;
        color: #6c757d;
      }
      
      .faq-pick {
        background: #fff3cd;
        color: #856404;
      }
    }
  }
  
  .faq-content {
    margin-bottom: 30px;
    
    .content-text {
      line-height: 1.6;
      color: #555;
      white-space: pre-wrap;
    }
  }
  
  .faq-footer {
    margin-bottom: 30px;
    padding-top: 20px;
    border-top: 1px solid #eee;
    
    p {
      margin: 5px 0;
      font-size: 14px;
      color: #666;
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
