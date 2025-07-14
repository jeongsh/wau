<template>
  <header>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/list/1">List</NuxtLink>
    <NuxtLink to="/editor/1">에디터</NuxtLink>
    <NuxtLink to="/view/1">완성화면</NuxtLink>
    <NuxtLink to="/payment">Payment</NuxtLink>
    
  </header>
  <slot />
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>

</style>
