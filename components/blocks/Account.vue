<template>
  <section class="sec-account">
    <div class="wrap-accordion">
      <button class="btn-accordion" @click="toggleAccordion">신랑측</button>
      <div class="box-accordion">
        <div class="box-content">
          <div
            v-if="isAccountDataAvailable(weddingInfo.groom.account)" 
            class="wrap-account"
          >
            <div class="box-account">
              <p class="account-name">{{ weddingInfo.groom.name }}</p>
              <p class="account-number">{{ weddingInfo.groom.account.number }}</p>
              <p class="bank-name">{{ weddingInfo.groom.account.bank }}</p>
            </div>
            <p class="account-kakaopay" v-if="weddingInfo.groom.account.kakaoPay">
              카카오페이: {{ weddingInfo.groom.account.kakaoPay }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useEditorStore } from '~/stores/editor';

const editorStore = useEditorStore();
const { designInfo, weddingInfo } = storeToRefs(editorStore);
onMounted(() => {
  const wrapAccordion = document.querySelectorAll('.wrap-accordion');
  wrapAccordion.forEach((accordion) => {
    if (accordion.classList.contains('active')) {
      const boxAccordion = accordion.querySelector('.box-accordion') as HTMLElement;
      boxAccordion.style.height = `${boxAccordion.scrollHeight}px`;
      boxAccordion.style.opacity = '1';
      boxAccordion.style.pointerEvents = 'auto';
      boxAccordion.style.overflowY = 'visible';
    }
  });
});

const toggleAccordion = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement;
  const box = target.nextElementSibling as HTMLElement;
  const parentElement = target.parentElement as HTMLElement;
  parentElement.classList.toggle('active');
  if (parentElement.classList.contains('active')) {
    box.style.borderTop = '1px solid #dbdbdb';
    box.style.height = `${box.scrollHeight}px`;
    box.style.opacity = '1';
    box.style.pointerEvents = 'auto';
    box.style.overflowY = 'visible';
  } else {
    box.style.borderTop = 'none';
    box.style.height = '0px';
    box.style.opacity = '0';
    box.style.pointerEvents = 'none';
    box.style.overflowY = 'hidden';
  }
};

const isAccountDataAvailable = ( account: { number: string, bank: string, name: string }) => {
  return account && account.number && account.bank && account.name;
};
</script>

<style lang="scss" scoped>
.sec-account{
  padding: 24px;
  background: var(--light-color);
}
</style>
