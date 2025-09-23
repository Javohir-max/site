<script setup>
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required, sameAs } from '@vuelidate/validators';

const form = reactive({
    email: "",
    code: "",
    password: "",
    successPass: ""
})
const backCode = ref(null);
const status = ref(false)
const codeStatus = ref(false)
const { resetPassword, changePassword } = useAuth();

const rules = {
    email: {
        required: helpers.withMessage('Введите адрес электронной почты', required),
        email: helpers.withMessage('Некорректный адрес электронной почты', email)
    },
    password: {
        required: helpers.withMessage('Введите пароль', required),
        minLength: helpers.withMessage('Пароль должен содержать не менее 6 символов', minLength(6)) 
    },
    successPass: {
        required: helpers.withMessage('Поля пусто', required),
        sameAsPassword: helpers.withMessage('Пароли не совпадают', sameAs(computed(() => form.password)))
    },
    code: {
        required: helpers.withMessage('Введите код', required),
        minLength: helpers.withMessage('Код содержить 6 цыфр', minLength(6)) 
    }
}
const v$ = useVuelidate(rules, form)

const sendEmail = async () => {
  const data = await resetPassword(form.email);
  if (data) {
    alert(`${data.msg} Проверьте вашу почту для сброса пароля.`);
    backCode.value = data.code;
    codeStatus.value = true
  } else {
    alert("Ошибка при отправке email. Попробуйте снова.");
  }
}
const newPassword = async () => {
    const data = await changePassword(form.email, form.password)
    if (data) {
        alert(data.msg)
        navigateTo('/projects/auth')
    } else {
        alert("Ошибка при смене пароля!")
    }
}
const formSubmit = () => {
    if (status.value === true) {
        v$.value.password.$touch()
        v$.value.successPass.$touch()
        if (v$.value.password.$invalid || v$.value.successPass.$invalid) return alert("Исправь ошибки 😅")
        newPassword()
    } else {
        if (codeStatus.value === true) {
            v$.value.code.$touch()
            if (v$.value.code.$invalid) return alert("Исправь ошибки 😅")
            return successCode()
        } 
        v$.value.email.$touch()
        if (v$.value.email.$invalid) return alert("Исправь ошибки 😅")
        sendEmail()
    }
}
const successCode = () => {
    if (backCode.value == form.code) status.value = true 
    else alert("Код неверный!")
}
</script>
<template>
    <div>
        <form @submit.prevent="formSubmit">
            <div v-if="!status" class="send-email">
                <div v-if="codeStatus" class="flex flex-col">
                    <input 
                        type="text" 
                        placeholder="Введите код" 
                        v-model="form.code"
                    >
                    <span v-for="err in v$.code.$errors" :key="err.$uid">{{ err.$message }}</span>
                </div>
                <div v-else class="flex flex-col">
                    <input 
                        type="email" 
                        placeholder="Введите электронную почту" 
                        v-model="form.email"
                    >
                    <span v-for="err in v$.email.$errors" :key="err.$uid">{{ err.$message }}</span>
                </div>
                <button type="submit">
                    {{ codeStatus ? "Подтвердить код" : "Получить код"  }}
                </button>
            </div>
            <div v-else class="new-password">
                <div class="flex flex-col">
                    <input type="password" placeholder="Введите новый пароль" v-model="form.password">
                    <span v-for="err in v$.password.$errors" :key="err.$uid">
                        {{ err.$message }}
                    </span>
                </div>
                <div class="flex flex-col">
                    <input type="password" placeholder="Повторите пароль" v-model="form.successPass">
                    <span v-for="err in v$.successPass.$errors" :key="err.$uid">
                        {{ err.$message }}
                    </span>
                </div>
                <button type="submit">Сменить пароль</button>
            </div>
        </form>
    </div>
</template>
<style scoped lang="scss">
form {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 8px;
    .send-email,
    .new-password {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        span {
            font-size: 12px;
            color: red;
            padding: 0 0 0 5px;
        }
    }

    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        width: 100%;
        box-sizing: border-box;
    }
    button {
        padding: 10px 20px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;

        &:hover {
            background-color: #0056b3;
        }
    }
}

</style>