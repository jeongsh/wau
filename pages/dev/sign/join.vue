<template>
  <div>
    <h3>회원 가입</h3>
      <div>
      이메일
      <input type="text" placeholder="이메일" v-model="userEmail" />
    </div>
    <div>
      연락처
      <input type="tel" placeholder="전화번호" v-model="userPhone" />
    </div>
    <div>
      비밀번호
      <input type="password" placeholder="비밀번호" v-model="userPassword" />
    </div>
    <div>
      이름
      <input type="text" placeholder="이름" v-model="userName" />
    </div>
    <div>
      닉네임
      <input type="text" placeholder="닉네임" v-model="nickname" />
    </div>
    <button type="button" @click="signUp">가입하기</button>
  </div>
</template>

<script setup lang="ts">
import type { UserCreateDto } from '~/types/user'


const userEmail = ref('')
const userPhone = ref('')
const userPassword = ref('')
const userName = ref('')
const nickname = ref('')

const signUp = async () => {

  // 유저 정보 유효성 검사
  const valid = isValidUser()
  if (!valid.result) {
    alert(valid.message)
    return
  }

  // 유저정보 객체 생성
  const userObj: UserCreateDto = {
    email: userEmail.value,
    phoneNumber: userPhone.value,
    name: userName.value,
    nickname: nickname.value,
    password: userPassword.value
  }

  try {
    const result = await $fetch('/api/sign/up', {
      method: 'POST',
      body: userObj,
    })

    console.log(result)

    if (result.status === 'success') {
      alert('회원 가입이 완료되었습니다.')
      // Redirect to login or home page
      // window.location.href = '/login'
    } else {
      alert('회원 가입에 실패했습니다: ' + result.message)
    }
  } catch (error) {
    console.error('Error during user registration:', error)
    alert('회원 가입 중 오류가 발생했습니다.')
  }
}

const isValidUser = () => {

  if (userEmail.value === '') {
    return {
      result: false,
      message: '이메일을 입력해주세요.'
    }
  } else if (userPhone.value === '') {
    return {
      result: false,
      message: '전화번호를 입력해주세요.'
    }
  } else if (userPassword.value === '') {
    return {
      result: false,
      message: '비밀번호를 입력해주세요.'
    }
  } else if (userName.value === '') {
    return {
      result: false,
      message: '이름을 입력해주세요.'
    }
  } else if (nickname.value === '') {
    return {
      result: false,
      message: '닉네임을 입력해주세요.'
    }
  }

  return {
    result: true,
    message: ''
  }
}

</script>
