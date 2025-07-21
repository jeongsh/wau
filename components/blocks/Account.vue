<template>
  <section class="sec-account">
    <UtilsAccordion title="신랑측">
      <div
        v-if="isAccountDataAvailable(weddingInfo.groom.account)" 
        class="wrap-account"
      >
        <div class="box-account">
          <p class="account-name">{{ weddingInfo.groom.account.name }}</p>
          <p class="account-number">{{ weddingInfo.groom.account.bank }} | {{ weddingInfo.groom.account.number }}</p>
        </div>
        <div class="box-btn">
          <button
            v-if="weddingInfo.groom.account.number"
            class="btn-acount-copy"
          >
            <span class="icon-copy"></span>
            <span class="text">복사</span>
          </button>
          <button class="btn-account-kakaopay" v-if="weddingInfo.groom.account.kakaoPay">
            카카오페이 복사하기</button>
        </div>
      </div>

      <div
        v-if="isAccountDataAvailable(weddingInfo.groom.parents[0].account) && weddingInfo.groom.parents[0].isUseAccount" 
        class="wrap-account"
      >
        <div class="box-account">
          <p class="account-name">{{ weddingInfo.groom.parents[0].account.name }}</p>
          <p class="account-number">{{ weddingInfo.groom.parents[0].account.bank }} | {{ weddingInfo.groom.parents[0].account.number }}</p>
        </div>
        <div class="box-btn">
          <button
            v-if="weddingInfo.groom.parents[0].account.number"
            class="btn-acount-copy"
          >
            <span class="icon-copy"></span>
            <span class="text">복사</span>
          </button>
          <button class="btn-account-kakaopay" v-if="weddingInfo.groom.parents[0].account.kakaoPay">
            카카오페이 복사하기
          </button>
        </div>
      </div>
      <div
        v-if="isAccountDataAvailable(weddingInfo.groom.parents[1].account) && weddingInfo.groom.parents[1].isUseAccount" 
        class="wrap-account"
      >
        <div class="box-account">
          <p class="account-name">{{ weddingInfo.groom.parents[1].account.name }}</p>
          <p class="account-number">{{ weddingInfo.groom.parents[1].account.bank }} | {{ weddingInfo.groom.parents[1].account.number }}</p>
        </div>
        <div class="box-btn">
          <button
            v-if="weddingInfo.groom.parents[1].account.number"
            class="btn-acount-copy"
          >
            <span class="icon-copy"></span>
            <span class="text">복사</span>
          </button>
          <button class="btn-account-kakaopay" v-if="weddingInfo.groom.parents[1].account.kakaoPay">
            카카오페이 복사하기
          </button>
        </div>
      </div>
    </UtilsAccordion>
    <UtilsAccordion title="신부측">
      <div
        v-if="isAccountDataAvailable(weddingInfo.bride.account)" 
        class="wrap-account"
      >
        <div class="box-account">
          <p class="account-name">{{ weddingInfo.bride.account.name }}</p>
          <p class="account-number">{{ weddingInfo.bride.account.bank }} | {{ weddingInfo.bride.account.number }}</p>
        </div>
        <div class="box-btn">
          <button
            v-if="weddingInfo.bride.account.number"
            class="btn-acount-copy"
          >
            <span class="icon-copy"></span>
            <span class="text">복사</span>
          </button>
          <button class="btn-account-kakaopay" v-if="weddingInfo.bride.account.kakaoPay">
            카카오페이 복사하기</button>
        </div>
      </div>

      <div
        v-if="isAccountDataAvailable(weddingInfo.bride.parents[0].account) && weddingInfo.bride.parents[0].isUseAccount" 
        class="wrap-account"
      >
        <div class="box-account">
          <p class="account-name">{{ weddingInfo.bride.parents[0].account.name }}</p>
          <p class="account-number">{{ weddingInfo.bride.parents[0].account.bank }} | {{ weddingInfo.bride.parents[0].account.number }}</p>
        </div>
        <div class="box-btn">
          <button
            v-if="weddingInfo.bride.parents[0].account.number"
            class="btn-acount-copy"
          >
            <span class="icon-copy"></span>
            <span class="text">복사</span>
          </button>
          <button class="btn-account-kakaopay" v-if="weddingInfo.bride.parents[0].account.kakaoPay">
            카카오페이 복사하기
          </button>
        </div>
      </div>

      <div
        v-if="isAccountDataAvailable(weddingInfo.bride.parents[1].account) && weddingInfo.bride.parents[1].isUseAccount" 
        class="wrap-account"
      >
        <div class="box-account">
          <p class="account-name">{{ weddingInfo.bride.parents[1].account.name }}</p>
          <p class="account-number">{{ weddingInfo.bride.parents[1].account.bank }} | {{ weddingInfo.bride.parents[1].account.number }}</p>
        </div>
        <div class="box-btn">
          <button
            v-if="weddingInfo.bride.parents[1].account.number"
            class="btn-acount-copy"
          >
            <span class="icon-copy"></span>
            <span class="text">복사</span>
          </button>
          <button class="btn-account-kakaopay" v-if="weddingInfo.bride.parents[1].account.kakaoPay">
            카카오페이 복사하기
          </button>
        </div>
      </div>
    </UtilsAccordion>
  </section>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);
const isAccountDataAvailable = ( account: { number: string, bank: string, name: string }) => {
  return account && account.number && account.bank && account.name;
};
</script>

<style lang="scss" scoped>
.sec-account{
  padding: 24px;
  background: var(--light-color);
}
.wrap-account{
  padding: 16px;
  background: white;
  border: 1px solid #ededed;
  border-radius: 8px;
  margin-bottom: 12px;
  &:last-child{
    margin-bottom: 0;
  }
}
.box-account{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  p{
    font-size: 0.8em;
  }
}
.box-btn{
  display: flex;
  align-items: center;
  gap: 8px;
  button{
    flex: 1;
    border: 1px solid #ededed;
    border-radius: 8px;
    height: 40px;
    font-size: 0.9em;
  }
}
:deep(.wrap-accordion) {
  .btn-accordion{
    height: 36px;
    font-size: 1em;
    padding-top: 4px;
    .accordion-title{
      font-size: 0.8em;
    }
  }
  .box-accordion{
    .box-content{
      padding: 8px 12px 12px 12px;
    }
  }
}
</style>
