<script setup>
import { Button } from 'primevue'

const route = useRoute()
const { user } = useAuth()
const { posts, comment, getPosts, deleteComment } = usePosts()
const { formatDate, formatTime, toCapitalize } = useFunc()
const commet = ref("")
const post = ref([])
const toast = useToast()

const sendComment = async () => {
    const txt = commet.value
    commet.value = ""
    const res = await comment(route.params.id, txt)
    post.value = await res.comment.comments.reverse()
}
const delComment = async (id) => {
    const res = await deleteComment(route.params.id, id)
    post.value = await res.comment.comments.reverse()
    toast.add({ severity: res.status, summary: `${toCapitalize(res.status)} Message`, detail: res.msg, life: 5000 });
}
onMounted(async () => {
    const res = await getPosts()
    if (!res || !route.params.id) return
    post.value = posts.value.find(id => id._id === route.params.id).comments.reverse()
})
</script>
<template>
    <div class="comment">
        <h1 class="title">Comment: {{ route.params.id }}</h1>
        <div class="comment__container">
            <div class="scroll">
                <div 
                    v-for="(item, index) in post" 
                    :key="index" 
                    class="comment__box"
                >
                    <div class="flex gap-2">
                        <CompImage 
                            v-if="item.userId" 
                            :src="item.userId.avatar" 
                            width="50px" 
                            height="50px" 
                            style="overflow: hidden; border-radius: 50%;" 
                        />
                        <div>
                            <p>{{ item.text }}</p>
                            <p class="text-sm text-gray-500">
                                {{ formatDate(item.createdAt) }} | {{ formatTime(item.createdAt) }}
                            </p>
                        </div>
                    </div>
                    <Button 
                        v-if="item.userId && item.userId._id === user._id"
                        label="Удалить" 
                        severity="danger" 
                        variant="text"
                        @click="delComment(item._id)" 
                    />
                </div>
            </div>
            <div class="comment__input">
                <input type="text" class="input" placeholder="Write a comment..." v-model="commet" /> 
                <Button label="Отправить" severity="success" variant="text" @click="sendComment" />
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .comment {
        width: 1200px;
        margin: 30px auto;
        padding: 20px;
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
        .title {
            margin-bottom: 20px;
        }
        .comment__container {
            width: 500px;
            height: 600px;
            padding: 8px;
            margin: 0 auto; 
            background-color: white;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .scroll {
                width: 100%;
                height: 520px;
                background-color: rgb(224, 224, 224);
                overflow-y: auto;
                padding: 16px;
                .comment__box {
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    padding-bottom: 4px;
                    margin-bottom: 8px;
                    display: flex;
                    justify-content: space-between;
                }
            }
            .scroll::-webkit-scrollbar {
                width: 0;
            }
            .comment__input {
                width: 100%;
                height: 40px;
                display: flex;
                .input {
                    width: 100%;
                    height: 100%;
                    outline: none;
                    padding: 8px;
                }
            }

        }

    }
</style>