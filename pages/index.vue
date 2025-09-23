<script setup>
import user from '../assets/images/home-user.png'
</script>
<template>
    <div>
        <section>
            <div class="left">
                <h2 class="anton-regular">Hello <Icon name="fluent-emoji-flat:hand-with-fingers-splayed-light"/>, Welcome to my website</h2>
                <h2 class="anton-regular">My name is Javohir</h2>
                <p>I am a Frontend developer</p>
                <NuxtLink to="/about">
                    <CompButton label="About me" style="background-color: dodgerblue;"/>
                </NuxtLink>
            </div>
            <div class="right">
                <CompImage :src="user"/>
            </div>
        </section>
    </div>
</template>
<style scoped lang="scss">
    section {
        width: 1200px;
        display: flex;
        justify-content: space-between;
        margin: 30px auto;
        .left, .right {
            width: 800px;
            background: var(--color-2);
            background: var(--gradient-1);
            border-radius: 12px;
            position: relative;
            z-index: 1;
            &::before {
                content: "";
                position: absolute;
                top: -5px;
                left: -5px;
                right: -5px;
                bottom: -5px;
                background: var(--gradient-1);
                filter: blur(15px);
                z-index: -1;
            }
        }
        .left {
            padding: 60px;
            display: flex;
            flex-direction: column;
            align-items: start;
            gap: 15px;
            h2 {
                font-size: 32px;
                color: var(--color-1);
            }
            p {
                color: var(--color-1);
                font-size: 28px;
            }
        }
        .right {
            width: 350px;
        }
    }
</style>