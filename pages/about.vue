<script setup lang="ts">
import UserMe from '../assets/images/about-me.png'
import MyHobby from '../assets/images/my-hobby.png'
</script>
<template>
    <div>
        About
        <section class="about">
            <div class="box">
                <h2>About Me</h2>
                <h3>Hi, my name is <span>Javohir</span>, I am <span>17</span> years old.</h3>
                <h3>I live in <span>Uzbekistan</span>, in the <span>Samarkand</span> region. I work as a <span>Frontend</span> developer, I’ve been in this field for 3 years and I have enough experience.</h3>
                <h3>Thank you for your attention.</h3>
            </div>
            <div class="box">
                <CompImage :src="UserMe" width="100%"/>
            </div>
            <div class="box">
                <CompImage :src="MyHobby" width="100%"/>
            </div>
            <div class="box">
                <h2>My Hobby</h2>
            </div>
        </section>
    </div>
</template>
<style scoped lang="scss">
.about {
    width: 1000px;
    margin: 0 auto;
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(3, 1fr);
    .box {
        background: var(--color-2);
        background: var(--gradient-1);
        position: relative;
        border-radius: 8px;
        &::before {
            content: "";
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background: var(--gradient-1);
            filter: blur(10px);
            z-index: -1;
        }
    }
    .box:nth-child(1) {
        grid-area: 1 / 1 / 2 / 3;
    }
    .box:nth-child(4) {
        grid-area: 2 / 2 / 3 / 4;
        border-color: blue;
    }
    .box:nth-child(1),
    .box:nth-child(4) {
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 10px;
        h2 {
            color: var(--color-1);
            font-size: 32px;
            font-weight: 700;
        }
        h3 {
            color: var(--color-1);
            font-size: 22px;
            font-weight: 400;
            span {
                font-weight: 500;
                color: var(--color-1);
            }
        }
    }
}
    
</style>