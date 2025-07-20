<template>
  <div>
    <h3>회원 가입</h3>
      <div>
      이메일
      <input type="text" placeholder="이메일" v-model="user.email" />
    </div>
    <div>
      연락처
      <input type="tel" placeholder="전화번호" v-model="user.phoneNumber" />
    </div>
    <div>
      비밀번호
      <input type="password" placeholder="비밀번호" v-model="user.password" />
    </div>
    <div>
      이름
      <input type="text" placeholder="이름" v-model="user.name" />
    </div>
    <div>
      닉네임
      <input type="text" placeholder="닉네임" v-model="user.nickname" />
    </div>
    <button type="button" @click="signUp">가입하기</button>
  </div>
</template>

<script setup lang="ts">
import type { UserCreateDto } from '~/types/user'

interface SignUpRes {
  status: boolean,
  message: string,
  data?: {}
}

const user = reactive<UserCreateDto>({
  email: '',
  phoneNumber: '',
  password: '',
  name: '',
  nickname: '',
})

const signUp = async () => {
  const userObj: UserCreateDto = { ...user }

  // 유저 정보 유효성 검사
  const valid = isValidUser(userObj)
  if (!valid.result) {
    alert(valid.message)
    return
  }

  try {

    const result = await $fetch<SignUpRes>('/api/auth/sign-up', {
      method: 'POST',
      body: userObj,
    })

    if (result.status) {
      alert('회원 가입이 완료되었습니다.')
      location.href='/'
    } else {
      throw new Error(result.message);
    }
  } catch (error: any) {

    if (error.statusCode >= 500) {
      const errorData = error.data
      const errorMsg = errorData.statusMessage
      alert(errorMsg)
      return
    }

    alert('회원가입에 실패했습니다.')
  }
}

// 유저 정보 유효성 검사
const isValidUser = (userObj: UserCreateDto) => {

  const fields = {
    email: '이메일을 입력해주세요.',
    phoneNumber: '전화번호를 입력해주세요.',
    password: '비밀번호를 입력해주세요.',
    name: '이름을 입력해주세요.',
    nickname: '닉네임을 입력해주세요.',
  }

  for (const key in fields) {
    if (!userObj[key as keyof UserCreateDto]) {
      return {
        result: false,
        message: fields[key as keyof typeof fields]
      }
    }

    // TODO: 전화번호 문자열 검증, 이메일 검증, 비밀번호 재입력 확인 로직 필요
  }

  return {
    result: true,
    message: ''
  }
}

</script>
