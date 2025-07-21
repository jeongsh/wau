<template>
  <div>
    <header>
      <div class="container d-flex justify-between align-center">
        <nav class="d-flex ai-center g-16">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/list/1">List</NuxtLink>
          <NuxtLink to="/editor">에디터</NuxtLink>
          <NuxtLink to="/view/1">완성화면</NuxtLink>
          <NuxtLink to="/payment">결제</NuxtLink>
          <NuxtLink to="/help">고객센터</NuxtLink>
          <NuxtLink to="/dev">개발</NuxtLink>
        </nav>
        
      </div>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="css" scoped>
header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 32px;
  height: 56px;
  background: #fff;
  border-bottom: 1px solid #EDEDED;
  z-index: 10;
  .container{
    height: 100%;
  }
  nav{
    a{
      font-size: 16px;
      font-weight: 500;
    }
  }
}
</style>
