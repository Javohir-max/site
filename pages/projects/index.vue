<script setup lang="ts">
import Gallery from '../../assets/images/Gallery.png'
import Auth from '../../assets/images/auth.jpg'
import Profile from '../../assets/images/profile.jpg'
import Edit from '../../assets/images/edit.jpeg'
import Posts from '../../assets/images/posts.png'
import Email from '../../assets/images/email.jpg'
import Document from '../../assets/images/document.jpg'
import MyPosts from '../../assets/images/my-posts.jpg'
const projects = [
    {name: 'Gallery', src: Gallery, page: '/gallery'},
    {name: 'Authorization', src: Auth, page: '/auth'},
    {name: 'Profile', src: Profile, page: '/profile'},
    {name: 'Edit Profile', src: Edit, page: '/edit'},
    {name: 'Posts', src: Posts, page: '/posts'},
    {name: 'Email message', src: Email, page: '/email'},
    {name: 'Documents', src: Document, page: '/document'},
    {name: 'My Posts', src: MyPosts, page: '/myposts'},
]
</script>
<template>
    <div>
        <h2 class="anton-regular title">My Projects</h2>
        <div class="projects">
            <div v-for="(item, index) in projects" :key="index" class="box">
                <CompImage :src="item.src" width="100%" style="border-radius: 8px; overflow: hidden;"/>
                <h2 class="box_h2">{{ item.name }}</h2>
                <NuxtLink :to="`/projects${item.page}`">
                    <CompButton  
                        icon="material-symbols:arrow-right-alt-rounded" 
                        iconPos="right" 
                        extraClass="butto !gap-2 hover:!gap-[15px]"
                        rounded
                    >
                        opne
                    </CompButton>
                </NuxtLink>
            </div>
        </div>
        <!-- <NuxtPage /> -->
    </div>
</template>
<style scoped lang="scss">
    h2.title {
        text-align: center;
        font-size: 34px;
        margin: 30px 0;
        color: rgb(30, 30, 30);
    }
    .projects {
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        justify-content: center;
        .box {
            width: 300px;
            padding: 10px;
            background: var(--color-2);
            background: var(--gradient-1);
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: start;
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
            .box_h2 {
                color: var(--color-1);
            }
        }
    }
    .butto {
        background-color: #0000;
        color: var(--color-1);
        border: 1px solid var(--color-1);
        padding: 2px 8px !important;
    }
</style>