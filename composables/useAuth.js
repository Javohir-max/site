import API from "../Api/api"
import { user, accessToken, refreshToken } from "./authState"

export function useAuth() {
  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", { email, password })

      accessToken.value = data.accessToken
      refreshToken.value = data.refreshToken
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)

      await getProfile()
      return true
    } catch (err) {
      console.error("Ошибка логина:", err)
      return false
    }
  }


  const getProfile = async () => {
    if (!accessToken.value) return null
    try {
      const { data } = await API.get("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken.value}` }
      })
      user.value = data
      return data
    } catch (err) {
      console.error("Ошибка получения профиля:", err)
      logout()
      return null
    }
  }

  const started = async () => {
    try {
      const { data } = await API.get("/start")
      if (data.status) return true          
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const logout = () => {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  }

  const updateUser = async (updates) => {
    if (!accessToken.value) return false
    try {
      const { data } = await API.put("/users/me", updates, {
        headers: { Authorization: `Bearer ${accessToken.value}` }
      })
      user.value = data.user
      return true
    } catch (err) {
      console.error("Ошибка обновления профиля:", err)
      return false
    }
  }

  const deleteUser = async () => {
    if (!accessToken.value) return false
    try {
      await API.delete("/users/me", {
        headers: { Authorization: `Bearer ${accessToken.value}` }
      })
      logout()
      return true
    } catch (err) {
      console.error("Ошибка удаления пользователя:", err)
      return false
    }
  }
  const resetPassword = async (email) => {
    try {
      const { data } = await API.post("/auth/reset-password", { email })
      return data;
    } catch (err) {
      console.error("Ошибка сброса пароля:", err)
      return null
    }
  }
  const changePassword = async (email, newPassword) => {
    try {
      const { data } = await API.put('/auth/change-password', {
        email,
        newPassword
      })
      return data
    } catch (error) {
      console.error(error);
      return null
    }
  }

  return {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    getProfile,
    updateUser,
    deleteUser,
    started,
    resetPassword,
    changePassword
  }
}
