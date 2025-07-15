<template>
  <div>
    <header>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink to="/list/1">List</NuxtLink>
      <NuxtLink to="/editor/1">에디터</NuxtLink>
      <NuxtLink to="/view/1">완성화면</NuxtLink>
      <NuxtLink to="/payment">결제</NuxtLink>
      <NuxtLink to="/dev">개발</NuxtLink>
    </header>
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="css" scoped>
a{
  margin-right: 10px;
  text-decoration: none;
  color: blue;
}
</style>
