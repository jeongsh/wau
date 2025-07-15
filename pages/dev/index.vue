<template>
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
    <button type="submit" @click="modifyUser(user)">수정</button>
  </div>
</template>

<script setup>
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

  try {
    const created = await $fetch('/api/users/user', {
      method: 'POST',
      body: newUser
    })

    // 서버 응답에 name/email이 없을 경우 수동으로 포함
    const completeUser = {
      id: created.id,
      name: created.name || newUser.name,
      email: created.email || newUser.email
    }

    users.value.push(completeUser)

    // 입력창 초기화
    userName.value = ''
    userEmail.value = ''
  } catch (error) {
    console.error('사용자 추가 실패:', error)
    alert('사용자 추가에 실패했습니다.')
  }
}

const modifyUser = async (user) => {
  const updatedUser = {
    id: user.id,
    name: user.name,
    email: user.email
  }

  try {
    await $fetch('/api/users/user', {
      method: 'PATCH',
      body: updatedUser
    })

    console.log('사용자 수정 성공')
    // users 배열은 v-model로 바인딩되어 있기 때문에 따로 갱신할 필요 없음
  } catch (error) {
    console.error('사용자 수정 실패:', error)
    alert('사용자 수정에 실패했습니다.')
  }
}
</script>