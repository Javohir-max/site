<script setup lang="ts">
import { ref } from "vue";
import Register from "~/components/Auth/Register.vue";
import LogIn from "~/components/Auth/LogIn.vue";

const loginAdnRegister = ref(false);

</script>
<template>
    <div class="auth_page container">
        <h2>{{ loginAdnRegister ? "Регистратсия" : "Вход" }}</h2>
        <div class="btns">
            <button :class="{'active': loginAdnRegister}" @click="loginAdnRegister = true">Регистратсия</button>
            <button :class="{'active': !loginAdnRegister}" @click="loginAdnRegister = false">Вход</button>
        </div>
        <hr />
        <Register v-if="loginAdnRegister" />
        <LogIn v-else/>
    </div>
</template>
<style lang="scss" scoped>
.auth_page {
    max-width: 400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    h2 {
        text-align: center;
    }
    .btns {
        display: flex;
        justify-content: space-between;
        button {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            background-color: #6c757d;
            color: white;
            border: none;
            border-radius: 4px;
            transition: .3s;
            cursor: pointer;
            &:first-child {
                margin-right: 10px;
            }
            &:hover {
                background-color: #5a6268;
            }
        }
        .active {
            background-color: #007bff;
            &:hover {
                background-color: #0056b3;
            }
        }
    }
    hr {
        margin: 20px 0;
    }
    pre {
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 4px;
        overflow-x: auto;
    }
}
</style>