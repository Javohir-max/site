<script setup lang="ts">

</script>
<template>
    <div>
        <header class="header">
            <div class="container">
                <div class="logo">
                    <img src="../public/Logo.png" alt="">
                </div>
                <nav>
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/about">About Me</NuxtLink></li>
                    <li><NuxtLink to="/projects">Projects</NuxtLink></li>
                    <li><NuxtLink to="/contact">Contact</NuxtLink></li>
                </nav>
                <CompButton label="Dark Fon" rounded/>
            </div>
        </header>
    </div>
</template>
<style scoped lang="scss">
    .header {
        width: 100%;
        height: 80px;
        background: #f2fffe !important;
        background: linear-gradient(44deg, rgba(242, 255, 254, 1) 0%, rgba(181, 255, 255, 1) 50%, rgba(255, 199, 248, 0.9) 100%) !important;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        .container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .logo {
                width: 60px;
                height: 60px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            nav {
                display: flex;
                gap: 35px;
                li {
                    list-style: none;
                    a {
                        font-size: 20px;
                        font-weight: 600;
                        color: rgb(70, 70, 70);
                        transition: .3s;
                        &:hover {
                            color: black;
                        }
                    }
                    a.router-link-active {
                        background: linear-gradient(90deg, #ff0080, #7928ca, #007cf0);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent
                    }
                }
            }
        }
    }
</style>