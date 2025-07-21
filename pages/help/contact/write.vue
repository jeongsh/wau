<template>
  <div class="body">
    <div class="header">
      <h1>1:1 문의 작성</h1>
    </div>
    <div class="content">
      <form @submit.prevent="submitContact">
        <div class="form-group">
          <label for="userName">이름 *</label>
          <input 
            type="text" 
            id="userName" 
            v-model="contact.userName" 
            placeholder="이름을 입력하세요"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="userEmail">이메일 *</label>
          <input 
            type="email" 
            id="userEmail" 
            v-model="contact.userEmail" 
            placeholder="이메일을 입력하세요"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="phoneNumber">연락처</label>
          <input 
            type="tel" 
            id="phoneNumber" 
            v-model="contact.phoneNumber" 
            placeholder="연락처를 입력하세요 (선택사항)"
          >
        </div>
        
        <div class="form-group">
          <label for="type">문의 유형 *</label>
          <select 
            id="type" 
            v-model="contact.type"
            required
          >
            <option value="" disabled>문의 유형을 선택하세요</option>
            <option value="general">일반 문의</option>
            <option value="technical">기술 지원</option>
            <option value="billing">결제 문의</option>
            <option value="account">계정 문의</option>
            <option value="bug">버그 신고</option>
            <option value="suggestion">제안사항</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="title">제목 *</label>
          <input 
            type="text" 
            id="title" 
            v-model="contact.title" 
            placeholder="문의 제목을 입력하세요"
            required
          >
        </div>
        
        <div class="form-group">
          <label for="content">문의 내용 *</label>
          <textarea 
            id="content" 
            v-model="contact.content" 
            placeholder="문의 내용을 상세히 입력하세요"
            rows="10"
            required
          ></textarea>
        </div>
        
        <div class="form-actions">
          <button type="button" @click="goBack" class="btn-cancel">취소</button>
          <button type="submit" class="btn-submit" :disabled="isSubmitting">
            {{ isSubmitting ? '전송 중...' : '문의 전송' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/contact'

const contact = ref<Partial<Contact>>({
  userName: '',
  userEmail: '',
  phoneNumber: '',
  type: '',
  title: '',
  content: ''
})

const isSubmitting = ref(false)

const submitContact = async () => {
  if (isSubmitting.value) return
  
  if (!contact.value.userName?.trim()) {
    alert('이름을 입력해주세요.')
    return
  }
  
  if (!contact.value.userEmail?.trim()) {
    alert('이메일을 입력해주세요.')
    return
  }
  
  if (!contact.value.type) {
    alert('문의 유형을 선택해주세요.')
    return
  }
  
  if (!contact.value.title?.trim()) {
    alert('제목을 입력해주세요.')
    return
  }
  
  if (!contact.value.content?.trim()) {
    alert('문의 내용을 입력해주세요.')
    return
  }
  
  try {
    isSubmitting.value = true
    
    const response = await $fetch('/api/help/contact', {
      method: 'POST',
      body: {
        userName: contact.value.userName.trim(),
        userEmail: contact.value.userEmail.trim(),
        phoneNumber: contact.value.phoneNumber?.trim() || '',
        type: contact.value.type,
        title: contact.value.title.trim(),
        content: contact.value.content.trim()
      }
    })
    
    alert('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.')
    await navigateTo('/help/contact')
    
  } catch (error) {
    console.error('문의 전송 실패:', error)
    alert('문의 전송에 실패했습니다. 다시 시도해주세요.')
  } finally {
    isSubmitting.value = false
  }
}

const goBack = () => {
  if (confirm('작성 중인 내용이 있습니다. 정말 나가시겠습니까?')) {
    navigateTo('/help/contact')
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
  input[type="email"],
  input[type="tel"],
  select,
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
  
  select {
    background: white;
    cursor: pointer;
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
