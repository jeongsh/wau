<template>
  <div class="body">
    <div>
      [유저 정보 등록]
    </div>
    <!-- <div>
      <input type="text" placeholder="이름" v-model="userName" />
      <input type="email" placeholder="이메일" v-model="userEmail" />
      <input type="tel" placeholder="전화번호" v-model="userPhone" />
      <input type="text" placeholder="닉네임" v-model="nickname" />
      <button type="submit" @click="addUser">추가</button>
    </div> -->
    <div>
      [유저 정보 수정]
      {{ users }}
    </div>
    <table>
      <thead>
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>폰번호</th>
          <th>닉네임</th>
          <th>생성일</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.no">
          <td>
            <input type="text" v-model="user.name">
          </td>
          <td>
            <input type="text" v-model="user.email">
          </td>
          <td>
            <input type="text" v-model="user.phoneNumber">
          </td>
          <td>
            <input type="text" v-model="user.nickname">
          </td>
          <td>
            <input type="text" v-model="user.createdDt">
          </td>
          <td>
            <button type="submit" @click="modifyUser(user)">수정</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup lang="ts">
import { User } from '~/types/user'

const users = ref([])
const userName = ref('')
const userEmail = ref('')
const userPhone = ref('')
const nickname = ref('')
const { $date } = useNuxtApp()

onMounted(async () => {
  users.value = await $fetch('/api/users')
  users.value.forEach((user: User) => {
    user.createdDt = $date.toKST(user.createdDt)
    user.updatedDt = $date.toKST(user.updatedDt)
  })
})

// const addUser = async () => {
//   if (!userName.value || !userEmail.value || !userPhone.value) {
//     alert('이름과 이메일을 입력해주세요.')
//     return
//   }

//   const newUser = {
//     name: userName.value,
//     email: userEmail.value,
//     phoneNumber: userPhone.value
//   }

//   try {
//     const created = await $fetch('/api/users/user', {
//       method: 'POST',
//       body: newUser
//     })

//     // 서버 응답에 name/email이 없을 경우 수동으로 포함
//     const completeUser = {
//       id: created.id,
//       name: created.name || newUser.name,
//       email: created.email || newUser.email
//     }

//     users.value.push(completeUser)

//     // 입력창 초기화
//     userName.value = ''
//     userEmail.value = ''
//   } catch (error) {
//     console.error('사용자 추가 실패:', error)
//     alert('사용자 추가에 실패했습니다.')
//   }
// }

// const modifyUser = async (user) => {

//   const updatedUser = {
//     id: user.no,
//     name: user.name,
//     email: user.email
//   }

//   try {
//     await $fetch('/api/users/user', {
//       method: 'PATCH',
//       body: updatedUser
//     })

//     console.log('사용자 수정 성공')
//     // users 배열은 v-model로 바인딩되어 있기 때문에 따로 갱신할 필요 없음
//   } catch (error) {
//     console.error('사용자 수정 실패:', error)
//     alert('사용자 수정에 실패했습니다.')
//   }
// }
</script>