<script setup>
import CompButton from './CompButton.vue';
import CompImage from './CompImage.vue';

const { user } = useAuth()
const { deletePost, getPosts, liked } = usePosts()
const { notification } = useFunc()
const { post } = defineProps({
    post: {
        type: Object,
        required: true
    }
})
const likeType = computed(() => {
    return (post.likes.includes(user.value._id)) ? 'icon-park-solid:like' : 'icon-park-twotone:like'
})

const changeLike = async (id) => {
    const res = await liked(id)
    if (res.status && res.status === "error") {
        notification(res.status, res.msg)
        return
    }
    post.likes = res
}

const deleteP = async (id) => {
    const data = await deletePost(id)
    notification(data.status, data.msg)
    await getPosts()
}
</script>
<template>
    <div v-if="post" class="post">
        <CompImage 
            v-if="post.image" 
            :src="post.image" 
            width="100%"
        />
        <div class="flex justify-between">
            <CompButton 
                :label="String(post.likes.length)"
                :icon="likeType" 
                class="w-[70px]"
                size-icon="24px"
                icon-pos="right"
                @click="changeLike(post._id)"
            />
            <NuxtLink :to="`/projects/comment/${post._id}`">
                <CompButton 
                    :label="String(post.comments.length)"
                    icon="iconamoon:comment-dots-fill"
                    size-icon="24px"
                    icon-pos="right"
                />
            </NuxtLink>
        </div>
        <h2 class="post__title">{{ post.title }}</h2>
        <p class="post__date">{{ post.createdAt }}</p>
        <div class="post__author">
            <CompImage 
                v-if="post.userId?.avatar" 
                :src="post.userId?.avatar" 
                width="40px" 
                height="40px" 
                style="border-radius: 50%; 
                overflow: hidden;"
            />
            <span class="post__author-name">{{ post.userId?.name }}</span>
        </div>
        <CompButton v-if="post.userId._id === user._id" label="Delete" @click="deleteP(post._id)"/>
    </div>
</template>
<style lang="scss" scoped>
    .post {
        width: 300px;
        background: var(--color-2);
        background: var(--gradient-1);
        border-radius: 8px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        .post__title {
            font-size: 20px;
            color: var(--color-1);
        }
        .post__date {
            font-size: 14px;
            color: var(--color-1);
            opacity: 0.8;
        }
        .post__author {
            display: flex;
            align-items: center;
            gap: 10px;
            .post__author-name {
                font-size: 16px;
                color: var(--color-1);
            }
        }
    }
    
</style>