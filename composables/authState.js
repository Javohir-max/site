import { ref } from "vue"

export const user = ref(null)
export const accessToken = ref(process.client ? localStorage.getItem("accessToken") : null)
export const refreshToken = ref(process.client ? localStorage.getItem("refreshToken") : null)
