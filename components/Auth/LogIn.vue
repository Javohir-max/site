<!-- pages/login.vue -->
<script setup>
import useVuelidate from "@vuelidate/core"
import { email, helpers, minLength, required } from "@vuelidate/validators"
import { useAuth } from "~/composables/useAuth"
import CompButton from "../CompButton.vue"

const { login } = useAuth()
const form = reactive({
  email: "",
  password: ""
})

const rules = {
  email: { 
    required: helpers.withMessage('Введите email', required),
    email: helpers.withMessage('Некорректный email', email)
  },
  password: { 
    required: helpers.withMessage('Введите пароль', required),
    minLength: helpers.withMessage('Пароль должен содержать не менее 6 символов', minLength(6)) 
  }
}

const v$ = useVuelidate(rules, form)

const handleLogin = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return alert("Исправь ошибки 😅")
  const ok = await login(form.email, form.password)
  if (ok) {
    alert("Успешный вход! 🎉") 
    navigateTo("/projects/profile")
  } else {
    alert("Ошибка входа! email или пароль неверны 😅")
  }
}
</script>

<template>
  <form @submit.prevent="handleLogin">
    <div class="flex flex-col">
      <input
        type="email"
        placeholder="Email"
        v-model="form.email"
        class="border p-2 rounded"
      />
      <span v-for="err in v$.email.$errors">
        {{ err.$message }}
      </span>
    </div>
    <div class="flex flex-col">
      <input
        type="password"
        placeholder="Пароль"
        v-model="form.password"
        class="border p-2 rounded"
      />
      <span v-for="err in v$.password.$errors">
        {{ err.$message }}
      </span>
    </div>
    <div class="forgot">
      <CompButton 
        type="button" 
        label="Forgot password" 
        @click="navigateTo('/projects/email')" 
        class="!bg-transparent !text-black !p-0"
      />
    </div>
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">Войти</button>
  </form>
</template>
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0 auto;
  .flex {
    span {
      color: red;
      font-size: 12px;
    }
  }
  button {
    margin-top: 10px;
  }
}

</style>
