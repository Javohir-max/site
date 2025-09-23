<script setup>
import useVuelidate from '@vuelidate/core'
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators'
import { ref } from 'vue'
import API from '~/Api/api'

const form = reactive({
  name: '',
  email: '',
  password: '',
  repeatPassword: '',
  date: null,
  avatar: null
})
const checkbox = ref(false)

const rules = {
  name: { 
    required: helpers.withMessage('Введите имя', required), 
    minLength: helpers.withMessage('Имя должно содержать не менее 3 символов', minLength(3)) 
  },
  email: { 
    required: helpers.withMessage('Введите email', required), 
    email: helpers.withMessage('Некорректный email', email) 
  },
  password: { 
    required: helpers.withMessage('Введите пароль', required),
    minLength: helpers.withMessage('Пароль должен содержать не менее 6 символов', minLength(6)) 
  },
  repeatPassword: { 
    required: helpers.withMessage('Поля пусто', required), 
    sameAsPassword: helpers.withMessage('Пароли не совпадают', sameAs(computed(() => form.password))) 
  },
  date: {
    required: helpers.withMessage('Введите дату', (value) => {
      if (checkbox.value) {
        return !!value
      }
      return true
    })
  },
}

const v$ = useVuelidate(rules, form)

const imagePreview = ref(null)
const imageChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  form.avatar = file

  // для превью
  const reader = new FileReader()
  reader.onload = (event) => {
    imagePreview.value = event.target.result
  }
  reader.readAsDataURL(file)
}

const handleSubmit = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) {
    return alert('Исправь ошибки 😅')
  }
  const data = new FormData()
  Object.keys(form).forEach((key) => {
    if (form[key] && key !== 'repeatPassword') {
      data.append(key, form[key])
    }
  })
  try {
    const res = await API.post('/auth/register', data)
    alert(res.data.msg)
    form.name = ''
    form.email = ''
    form.password = ''
    form.repeatPassword = ''
    form.date = null
    form.avatar = null
    imagePreview.value = null
    checkbox.value = false
    v$.value.$reset()
  } catch (err) {
    console.error(err)
    alert('Ошибка при регистрации')
  }
}

</script>

<template>
  <form @submit.prevent="handleSubmit" class="w-[400px] flex flex-col gap-2 m-auto">
    <CompImage v-if="imagePreview" :src="imagePreview" width="400px" height="400px" balance preview/>
    <div class="input-group">
      <input v-model="form.name" placeholder="Имя" />
      <span v-for="err in v$.name.$errors">{{ err.$message }}</span>
    </div>

    <div class="input-group">
      <input v-model="form.email" placeholder="Email" />
      <span v-for="err in v$.email.$errors">{{ err.$message }}</span>
    </div>

    <div class="input-group">
      <input v-model="form.password" type="password" placeholder="Пароль" />
      <span v-for="err in v$.password.$errors">{{ err.$message }}</span>
    </div>

    <div class="input-group">
      <input v-model="form.repeatPassword" type="password" placeholder="Повторите пароль" />
      <span v-if="v$.repeatPassword.$dirty && v$.repeatPassword.$invalid">
        {{ v$.repeatPassword.required.$invalid ? v$.repeatPassword.required.$message : v$.repeatPassword.sameAsPassword.$message }}
      </span>
    </div>
    <div class="input-group">
      <input
        type="file"
        @change="imageChange"
        hidden
        name="avatar"
        id="avatar"
      />
      <label for="avatar">Аватар (необязательно)</label>
    </div>
    <div class="input-date">
      <input type="checkbox" v-model="checkbox" id="check"/> 
      <label for="check">День рождения ({{ checkbox ? 'обязательно' : 'необязательно' }})</label>
      <input 
        type="date" 
        v-model="form.date"
        :disabled="!checkbox"
        :class="{
          'input-disabled': !checkbox,
          'input-error': v$.date.$error
        }"
        />
    </div>
    <button type="submit" class="bg-blue-500 text-white p-2 rounded">
      Зарегистрироваться
    </button>
  </form>
</template>
<style scoped lang="scss">
.input-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
      outline: none;
      border-color: #007BFF !important;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
  span {
    color: red;
    font-size: 12px;
  }
  label {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    color: #555;
    cursor: pointer;
    border: 1px solid #ccc;
    text-align: center;
  }
}
.input-date {
  display: flex;
  align-items: center;
  gap: 10px;
  input[type="checkbox"] {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border: 1px solid #ccc;
  }
  input[type="date"] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: .3s;
    &:focus {
    outline: none;
    border-color: #007BFF !important;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  }
  label {
    font-size: 12px;
    color: #555;
  }
  .input-disabled {
    background-color: #f9f9f9;
    color: #ccc;
    cursor: not-allowed;
  }
  .input-error {
    border-color: red !important;
    color: red !important;
  }
}
</style>
