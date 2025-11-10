<script setup>
import AddImg from '../../assets/images/add-image.jpg'
const { posts, getPosts, createPost, deletePosts, } = usePosts()
const { notification } = useFunc()
const newPosts = ref({
    title: '',
    image: null,
})
const previewImage = ref(null)

const changeImage = (e) => {
    const file = e.target.files[0]
    newPosts.value.image = file

    // для превью
    const reader = new FileReader()
    reader.onload = (event) => {
        previewImage.value = event.target.result
    }
    reader.readAsDataURL(file)
}
const handleSubmit = async () => {
    const data = new FormData()
    Object.keys(newPosts.value).forEach((key) => {
        if (newPosts.value[key]) {
            data.append(key, newPosts.value[key])
        }
    })
    const res = await createPost(data)
    notification(res.status, res.msg)
    newPosts.value.title = ''
    newPosts.value.image = null
    previewImage.value = null
    await getPosts() // обновим список постов
}

const deleteAll = async () => {
    const data = await deletePosts()
    notification(data.status, data.msg)
    await getPosts()
}

onMounted(async () => {
    const res = await getPosts()
    if (res.status === "error") {
        notification(res.status, res.msg)
        navigateTo('/projects/auth')
    }
})
</script>
<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <CompImage :src="previewImage || AddImg" width="250px"/>
            <input type="file" id="newfile" hidden @change="changeImage" />
            <label for="newfile">
                Добавить изображение
            </label>
            <input type="text" v-model="newPosts.title" placeholder="Заголовок" />
            <CompButton 
                label="Создать пост" 
                icon="material-symbols:post-add" 
                icon-pos="right" 
                size-icon="20px" 
                extra-class="!gap-2 bg-green-600 hover:bg-green-500 text-white w-full" 
                rounded
                type="submit" 
            />
        </form>
        <!-- <pre>{{ posts }}</pre> -->
        <CompButton label="Delete All" class="!my-4" @click="deleteAll"/>
        <div class="posts__container">
            <Post 
                v-for="item in posts" 
                :key="item._id"
                :post="item"
            />
            <!-- <div class="post" v-for="item in posts" :key="item._id">
                <CompImage 
                    v-if="item.image" 
                    :src="item.image" 
                    width="100%"
                />
                <CompButton 
                    :label="String(item.likes.length)"
                    :icon="(item.likes.includes(user._id)) ? 'icon-park-solid:like' : 'icon-park-twotone:like'" 
                    class="w-[70px]"
                    size-icon="24px"
                    icon-pos="right"
                />
                <NuxtLink :to="`/projects/comment/${item._id}`">
                    comment
                </NuxtLink>
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
            </div> -->
        </div>
    </div>
</template>
<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 300px;
    margin: 0 auto 30px;
    align-items: center;
    label {
        cursor: pointer;
        width: 100%;
        text-align: center;
        background: var(--color-3);
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        font-size: 16px;

        &:hover {
            opacity: 0.8;
            transition: 0.3s;
        }
    }
    input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        &:focus {
            outline: none;
            border-color: var(--color-3);
            box-shadow: 0 0 5px var(--color-3);
            transition: 0.3s;
        }
        &::placeholder {
            color: #999;
            opacity: 1;
            font-size: 14px;
            font-style: italic;
            padding-left: 4px;
        }
    }
}
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