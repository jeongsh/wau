<template>
  <div class="body">
    <div class="header">
      <h1>FAQ 작성</h1>
    </div>
    <div class="content">
      <form @submit.prevent="submitFaq">
        <div class="form-group">
          <label for="title">제목</label>
          <input 
            type="text" 
            id="title" 
            v-model="faq.title" 
            placeholder="제목을 입력하세요"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="content">내용</label>
          <textarea 
            id="content" 
            v-model="faq.content" 
            placeholder="내용을 입력하세요"
            rows="10"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="type">카테고리</label>
          <select 
            id="type" 
            v-model="faq.type"
            required
          >
            <option value="" disabled>선택하세요</option>
            <option value="most">많이하는 질문</option>
            <option value="billing">주문/결제</option>
            <option value="delivery">배송 관련</option>
            <option value="member">회원 관련</option>
            <option value="error">오류/버그</option>
          </select>
        </div>
        <div class="form-group">
          <label>
            <input 
              type="checkbox" 
              v-model="faq.pick"
            >
            중요 FAQ
          </label>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="goBack" class="btn-cancel">취소</button>
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? '저장 중...' : '저장' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FaqInfo } from '~/types/faq'

const faq = ref<Partial<FaqInfo>>({
  title: '',
  content: '',
  type: '',
  pick: false
})

const isSubmitting = ref(false)

const submitFaq = async () => {
  if (isSubmitting.value) return
  
  if (!faq.value.title?.trim()) {
    alert('제목을 입력해주세요.')
    return
  }
  
  if (!faq.value.content?.trim()) {
    alert('내용을 입력해주세요.')
    return
  }
  
  try {
    isSubmitting.value = true
    
    const response = await $fetch('/api/help/faq', {
      method: 'POST',
      body: {
        title: faq.value.title.trim(),
        content: faq.value.content.trim(),
        type: faq.value.type?.trim() || '',
        pick: faq.value.pick || false
      }
    })
    
    alert('FAQ가 등록되었습니다.')
    await navigateTo('/help/faq')
    
  } catch (error) {
    console.error('FAQ 등록 실패:', error)
    alert('FAQ 등록에 실패했습니다.')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  if (confirm('작성 중인 내용이 있습니다. 정말 나가시겠습니까?')) {
    navigateTo('/help/faq')
  }
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

.form-group {
  margin-bottom: 25px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #333;
    font-size: 14px;
  }
  
  input[type="text"],
  textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.5;
    transition: border-color 0.2s;
    
    &:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    &::placeholder {
      color: #999;
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 200px;
    font-family: inherit;
  }
  
  input[type="checkbox"] {
    margin-right: 8px;
  }
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.btn-cancel,
.btn-submit {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.btn-cancel {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
  
  &:hover:not(:disabled) {
    background: #e9ecef;
  }
}

.btn-submit {
  background: #007bff;
  color: white;
  
  &:hover:not(:disabled) {
    background: #0056b3;
  }
}
</style>
