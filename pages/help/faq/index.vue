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
      <h1>자주 묻는 질문</h1>
      
      <div class="filter-tabs">
        <button 
          @click="changeFaqType('all')" 
          :class="{ active: faqType === 'all' }"
          class="tab-button"
        >
          전체
        </button>
        <button 
          @click="changeFaqType('most')" 
          :class="{ active: faqType === 'most' }"
          class="tab-button"
        >
          많이하는 질문
        </button>
        <button 
          @click="changeFaqType('billing')" 
          :class="{ active: faqType === 'billing' }"
          class="tab-button"
        >
          주문/결제
        </button>
        <button 
          @click="changeFaqType('member')" 
          :class="{ active: faqType === 'member' }"
          class="tab-button"
        >
          회원 관련
        </button>
        <button 
          @click="changeFaqType('delivery')" 
          :class="{ active: faqType === 'delivery' }"
          class="tab-button"
        >
          배송 관련
        </button>
        <button 
          @click="changeFaqType('error')" 
          :class="{ active: faqType === 'error' }"
          class="tab-button"
        >
          오류/버그
        </button>
      </div>

      <div class="faq-list">
        <div v-if="viewFaqs.length === 0" class="empty-message">
          등록된 FAQ가 없습니다.
        </div>
        <div 
          v-else 
          v-for="(faq, index) in viewFaqs" 
          :key="faq.no" 
          class="faq-item"
          :class="{ expanded: expandedItems.includes(faq.no) }"
        >
          <div class="faq-question" @click="toggleExpanded(faq.no)">
            <div class="question-content">
              <span class="question-number">Q{{ index + 1 }}</span>
              <span class="question-text" :class="{ important: faq.pick }">
                <span v-if="faq.pick" class="best-badge">BEST</span>
                {{ faq.title }}
              </span>
            </div>
            <div class="question-meta">
              <span class="date">{{ transferDateFormatted(faq.createdDt) }}</span>
              <i class="expand-icon" :class="{ rotated: expandedItems.includes(faq.no) }">▼</i>
            </div>
          </div>
          <div class="faq-answer" v-show="expandedItems.includes(faq.no)">
            <div class="answer-content">
              <span class="answer-label">A</span>
              <div class="answer-text" v-html="faq.content"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button @click="navigateTo('/help/contact/write')" class="inquiry-button">
          1:1 문의하기
        </button>
        <button @click="navigateTo('/help/faq/write')" class="write-button">
          FAQ 작성
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FaqInfo } from '~/types/faq'
const faqs = ref([]) as Ref<FaqInfo[]>
const { transferDateFormatted } = useDate()
const faqType = ref('all')
const viewFaqs = ref([]) as Ref<FaqInfo[]>
const expandedItems = ref([]) as Ref<number[]>

onMounted(async () => {
  faqs.value = await $fetch('/api/help/faqs')
  viewFaqs.value = faqs.value
})

const changeFaqType = async (type: string) => {
  faqType.value = type
  expandedItems.value = [] // 카테고리 변경 시 모든 아이템 접기
  if (type === 'all') {
    viewFaqs.value = faqs.value
  }
  else {
    viewFaqs.value = faqs.value.filter(faq => faq.type === type)
  }
}

const toggleExpanded = (faqNo: number) => {
  const index = expandedItems.value.indexOf(faqNo)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(faqNo)
  }
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
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #333;
    text-align: center;
    font-weight: 600;
  }

  .filter-tabs {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 40px;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 8px;

    .tab-button {
      background-color: transparent;
      color: #666;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
      transition: all 0.3s ease;
      white-space: nowrap;

      &:hover {
        background-color: #e9ecef;
        color: #333;
      }

      &.active {
        background-color: #007bff;
        color: white;
        font-weight: 600;
      }
    }
  }

  .faq-list {
    .empty-message {
      text-align: center;
      padding: 60px 20px;
      color: #999;
      font-size: 1.1rem;
      background-color: #f8f9fa;
      border-radius: 8px;
      border: 2px dashed #ddd;
    }

    .faq-item {
      background-color: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 8px;
      overflow: hidden;
      transition: all 0.3s ease;

      &:hover {
        border-color: #007bff;
        box-shadow: 0 2px 8px rgba(0, 123, 255, 0.15);
      }

      &.expanded {
        border-color: #007bff;
        box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
      }

      .faq-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        cursor: pointer;
        background-color: #fafafa;
        transition: all 0.3s ease;

        &:hover {
          background-color: #f0f8ff;
        }

        .question-content {
          display: flex;
          align-items: center;
          flex: 1;
          margin-right: 20px;

          .question-number {
            background-color: #007bff;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-right: 12px;
            min-width: 32px;
            text-align: center;
          }

          .question-text {
            font-size: 1rem;
            font-weight: 500;
            color: #333;
            line-height: 1.5;

            &.important {
              color: #d73527;
              font-weight: 600;
            }

            .best-badge {
              display: inline-block;
              background-color: #ff6b35;
              color: white;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 0.75rem;
              font-weight: 600;
              margin-right: 6px;
              vertical-align: top;
            }
          }
        }

        .question-meta {
          display: flex;
          align-items: center;
          gap: 12px;

          .date {
            font-size: 0.85rem;
            color: #888;
          }

          .expand-icon {
            font-size: 0.8rem;
            color: #666;
            transition: transform 0.3s ease;

            &.rotated {
              transform: rotate(180deg);
            }
          }
        }
      }

      .faq-answer {
        border-top: 1px solid #e8f4fd;
        background-color: #f8fcff;

        .answer-content {
          display: flex;
          padding: 24px;
          gap: 12px;

          .answer-label {
            background-color: #28a745;
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 600;
            min-width: 32px;
            text-align: center;
            height: fit-content;
          }

          .answer-text {
            flex: 1;
            line-height: 1.7;
            color: #444;
            font-size: 0.95rem;

            // HTML 내용을 위한 스타일
            p {
              margin-bottom: 12px;
              &:last-child {
                margin-bottom: 0;
              }
            }

            ul, ol {
              margin: 12px 0;
              padding-left: 20px;
            }

            li {
              margin-bottom: 6px;
            }
          }
        }
      }
    }
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 40px;

    .inquiry-button {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        background-color: #218838;
        transform: translateY(-1px);
      }
    }

    .write-button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        background-color: #0056b3;
        transform: translateY(-1px);
      }
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
    padding: 15px 0;
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
    h1 {
      font-size: 1.5rem;
      margin-bottom: 25px;
    }

    .filter-tabs {
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;

      .tab-button {
        padding: 10px 16px;
        font-size: 0.9rem;
        flex: 1;
        min-width: 120px;
      }
    }

    .faq-list {
      .faq-item {
        .faq-question {
          padding: 16px 18px;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;

          .question-content {
            margin-right: 0;

            .question-number {
              margin-right: 8px;
            }

            .question-text {
              font-size: 0.95rem;
            }
          }

          .question-meta {
            align-self: flex-end;
            gap: 8px;

            .date {
              font-size: 0.8rem;
            }
          }
        }

        .faq-answer {
          .answer-content {
            padding: 18px;
            flex-direction: column;
            gap: 12px;

            .answer-label {
              align-self: flex-start;
            }

            .answer-text {
              font-size: 0.9rem;
            }
          }
        }
      }
    }

    .action-buttons {
      flex-direction: column;
      gap: 12px;

      .inquiry-button,
      .write-button {
        padding: 12px 24px;
        font-size: 0.95rem;
      }
    }
  }
}
</style>