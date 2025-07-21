<template>
  <div>
    <h3>로그인</h3>
      <div>
      이메일
      <input type="text" placeholder="이메일" v-model="userLogin.email" />
    </div>
    <div>
      비밀번호
      <input type="password" placeholder="비밀번호" v-model="userLogin.password" />
    </div>
    <button type="button" @click="signIn">로그인</button>
  </div>
</template>

<script setup lang="ts">
import { FetchError } from 'ofetch'

interface SignIn {
  email: string,
  password: string,
}

const userLogin = reactive<SignIn>({
  email: '',
  password: '',
})


const signIn = async () => {
  const valid = isValidUser(userLogin)
  if (!valid.result) {
    alert(valid.message)
    return
  }

  try {
    const result = await $fetch('/api/auth/sign-in', {
      method: 'POST',
      body: userLogin,
    })

    if (result.status) {
      location.href='/'
    } else {
      throw new Error(result.message);
    }
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      const errorCode = error.statusCode 
      if (!!errorCode && errorCode >= 400) {
        const errorData = error.data
        const errorMsg = errorData.statusMessage
        alert(errorMsg)
        return
      }
      else if (!!errorCode && errorCode >= 500) {
        const errorData = error.data
        const errorMsg = errorData.statusMessage
        alert(errorMsg)
        return
      }
    }
    else if (error instanceof Error) {
      alert(error.message)
      return
    }
  }
}

// 유저 정보 유효성 검사
const isValidUser = (userLogin: SignIn) => {
  const fields = {
    email: '이메일을 입력해주세요.',
    password: '비밀번호를 입력해주세요.',
  }

  for (const key in fields) {
    if (!userLogin[key as keyof SignIn]) {
      return {
        result: false,
        message: fields[key as keyof typeof fields]
      }
    }
  }

  return {
    result: true,
    message: ''
  }
}
</script>
