import { ref } from "vue"
import API from "../Api/api"
import { accessToken } from "./authState"  // импортируем реактивный accessToken

export const posts = ref([])
export const myPosts = ref([])

export function usePosts() {
    const getPosts = async () => {
        if (!accessToken.value) return false
        try {
        const { data } = await API.get("/posts/all")
        posts.value = data
        return true
        } catch (err) {
            console.error("Ошибка получения постов:", err)
            return false
        }
    }
    const createPost = async (post) => {
        if (!accessToken.value) return false
        try {
            const { data } = await API.post("/posts/me", post, {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            posts.value.push(data) // сразу добавим новый пост в локальный массив
            myPosts.value.push(data) // сразу добавим новый пост в мои посты
            return true
        } catch (err) {
            console.error("Ошибка создания поста:", err)
            return false
        }
    }
    const getMyPosts = async () => {
        if (!accessToken.value) return false
        try {
            const { data } = await API.get("/posts/me", {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            myPosts.value = data
            return true
        } catch (err) {
            console.error("Ошибка получения моих постов:", err)
            return false
        }
    }
    return { posts, myPosts, getPosts, createPost, getMyPosts }
}