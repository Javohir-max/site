import { ref } from "vue"
import API from "../Api/api"
import { accessToken } from "./authState"  // импортируем реактивный accessToken

export const posts = ref([])
export const myPosts = ref([])

export function usePosts() {
    const getPosts = async () => {
        try {
            const { data } = await API.get("/posts/all")
            const { msg, status } = data
            if (!status) {
                posts.value = data
                return true
            }
            return { msg, status }
        } catch (err) {
            console.error("Ошибка получения постов:", err)
            return err.response.data
        }
    }
    const createPost = async (myPost) => {
        if (!accessToken.value) return { msg: "Вы не Авторизованный", status: "error" }
        try {
            const { data: { msg, status, post } } = await API.post("/posts/me", myPost, {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            posts.value.push(post) // сразу добавим новый пост в локальный массив
            myPosts.value.push(post) // сразу добавим новый пост в мои посты
            return { msg, status }
        } catch (err) {
            console.error("Ошибка создания поста:", err.message)
            return err.response.data
        }
    }
    const getMyPosts = async () => {
        if (!accessToken.value) return { msg: "Вы не Авторизованный", status: "error" }
        try {
            const { data } = await API.get("/posts/me", {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            const { msg, status } = data
            if (status) {
                myPosts.value = data
                return
            }
            return { msg, status }
        } catch (err) {
            console.error("Ошибка получения моих постов:", err.message)
            return err.response.data
        }
    }
    const deletePost = async (id) => {
        if (!accessToken.value) return { msg: "Вы не Авторизованный", status: "error" }
        try {
            const { data } = await API.delete(`/posts/me/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            return data
        } catch (error) {
            console.error("Ошибка при удалении поста", error)
            return error.response.data
        }
    }
    const deletePosts = async () => {
        if (!accessToken.value) return { msg: "Вы не Авторизованный", status: "error" }
        try {
            const { data } = await API.delete("/posts/all", {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            return data
        } catch (err) {
            console.error("Ошибка при удалении постов", err);
            return err.response.data
        }
    }
    const liked = async (id) => {
        if (!accessToken.value) return { msg: "Вы не Авторизованный", status: "error" }
        try {
            const { data } = await API.post(`/posts/${id}/like`, {
                header: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            return data
        } catch (err) {
            console.error(err)
            return err.response.data
        }
    }
    const comment = async (id, text) => {
        if (!accessToken.value) return { msg: "Вы не Авторизованный", status: "error" }
        try {
            const { data } = await API.post(`/posts/${id}/comment`, {text}, {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            return data
        } catch (error) {
            console.error(error)
            return err.response.data
        }
    }
    const deleteComment = async (postId, commentId) => {
        if (!accessToken.value) return { msg: "Вы не Авторизованный", status: "error" }
        try {
            const { data } = await API.delete(`/posts/${postId}/comment/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken.value}`
                }
            })
            return data
        } catch (error) {
            console.error(error)
            return err.response.data
        }
    }
    return { 
        posts, 
        myPosts, 
        getPosts, 
        createPost, 
        getMyPosts, 
        deletePost, 
        deletePosts,
        liked,
        comment,
        deleteComment
    }
}