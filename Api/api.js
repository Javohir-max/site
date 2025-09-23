import axios from "axios"
import { refreshToken, accessToken } from "../composables/authState"

const API = axios.create({
  baseURL: "https://server-vsa0.onrender.com/api",
  withCredentials: true
})

const refreshAccessToken = async () => {
  if (!refreshToken.value) return false
  try {
    const { data } = await API.post("/auth/refresh", { refreshToken: refreshToken.value })
    accessToken.value = data.accessToken
    localStorage.setItem("accessToken", data.accessToken)
    return true
  } catch (err) {
    console.error("Ошибка refresh токена:", err)
    logout()
    return false
  }
}

// Интерцептор
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshed = await refreshAccessToken()
      if (refreshed) {
        error.config.headers["Authorization"] = `Bearer ${accessToken.value}`
        return API.request(error.config)
      }
    }
    return Promise.reject(error)
  }
)

export default API
