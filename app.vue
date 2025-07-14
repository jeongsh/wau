<template>
  <!-- <NuxtLayout>
    <NuxtPage />
  </NuxtLayout> -->
  <div>
    [유저 정보 등록]
  </div>
  <input type="text" placeholder="이름" v-model="userName" />
  <input type="email" placeholder="이메일" v-model="userEmail" />
  <button type="submit" @click="addUser">추가</button>
  <div>
    [유저 정보 수정]
  </div>
  <div v-for="user in users" :key="user.id">
    <input type="text" placeholder="이름" v-model="user.name" />
    <input type="email" placeholder="이메일" v-model="user.email" />
    <button type="submit" @click="modifyUser(user.id, user.name, user.email)">수정</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const users = ref([])
const userName = ref('')
const userEmail = ref('')

onMounted(async () => {
  users.value = await $fetch('/api/users/user')
})

const addUser = async () => {
  if (!userName.value || !userEmail.value) {
    alert('이름과 이메일을 입력해주세요.')
    return
  }

  const newUser = {
    name: userName.value,
    email: userEmail.value
  }

  await $fetch('/api/users/user', {
    method: 'POST',
    body: newUser
  })
    .then((result) => {
      console.log('사용자 추가 성공')
      console.log(result)
      location.reload() // 페이지 새로고침
    })
    .catch((error) => {
      console.error('사용자 추가 실패:', error)
      console.log(error)
      alert('사용자 추가에 실패했습니다.')
    })
}

const modifyUser = async (id, userName, userEmail) => {
  const updatedUser = {
    id,
    name: userName,
    email: userEmail
  }

  console.log(updatedUser)

  await $fetch('/api/users/user', {
    method: 'PATCH',
    body: updatedUser
  })
    .then((result) => {
      console.log('사용자 수정 성공')
      console.log(result)
      location.reload() // 페이지 새로고침
    })
    .catch((error) => {
      console.error('사용자 수정 실패:', error)
      alert('사용자 수정에 실패했습니다.')
    })
}

</script>
