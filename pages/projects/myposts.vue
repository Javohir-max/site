<script setup>
const { myPosts, getMyPosts, deletePost } = usePosts()
const { toCapitalize } = useFunc()
const toast = useToast()

const deleteP = async (id) => {
    const data = await deletePost(id)
    toast.add({ severity: data.status, summary: `${toCapitalize(data.status)} Message`, detail: data.msg, life: 5000 });
    await getMyPosts()
}

onMounted(async () => {
    const res = await getMyPosts()
    if (res.status === "error") {
        toast.add({ severity: res.status, summary: 'Error Message', detail: res.msg, life: 5000 });
        navigateTo('/projects/posts')
    }
})
</script>
<template>
    <div>
        <div class="posts__container">
            <div class="post" v-for="item in myPosts" :key="item._id">
                <CompImage 
                    v-if="item.image" 
                    :src="item.image" 
                    width="100%"
                />
                <h2 class="post__title">{{ item.title }}</h2>
                <p class="post__date">{{ item.createdAt }}</p>
                <div class="post__author">
                    <CompImage 
                        v-if="item.userId?.avatar" 
                        :src="item.userId?.avatar" 
                        width="40px" 
                        height="40px" 
                        style="border-radius: 50%; 
                        overflow: hidden;"
                    />
                    <span class="post__author-name">{{ item.userId?.name }}</span>
                </div>
                <CompButton label="Delete" @click="deleteP(item._id)"/>
            </div>
        </div>     
    </div>
</template>
<style scoped lang="scss">
.posts__container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
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
}
</style>