<script setup>
import { useAuth } from "~/composables/useAuth"

const { user, getProfile, logout, deleteUser } = useAuth()

const show = ref({
  data: false,
  hide: "Скрыть данные",
  show: "Показать данные"
})

const handleDelete = async () => {
  if (confirm("Точно удалить аккаунт? 😬")) {
    const ok = await deleteUser()
    if (ok) {
      alert("Аккаунт удалён")
      navigateTo("/projects/auth")
    }
  }
}
const handleLogout = () => {
  logout()
  alert("Вы вышли")
  navigateTo("/projects/auth")
}

onMounted(async () => {
  const res = await getProfile()
  if (!res) {
    alert("Вы не зареистрированы или не вошли в аккаунт")
    navigateTo("/projects/auth")
  }
})
</script>

<template>
  <div v-if="user" class="profile__container">
    <div class="user__box">
      <CompImage 
        :src="user.avatar" 
        width="350px" 
        height="350px" 
        balance 
        preview
      />
      <div class="user__name">
        <h2>Привет, {{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <CompButton 
          :label="show.data ? show.hide : show.show" 
          @click="show.data = !show.data"
        />
        <pre v-if="show.data">data: {{ user }}</pre>
      </div> 
    </div>
    <div class="flex gap-4">
      <CompButton 
        label="Log out" 
        @click="handleLogout"
      />
      <CompButton 
        label="Delete profile" 
        @click="handleDelete" 
        extra-class="!bg-red-500"
      />
      <CompButton 
        label="Edit profile"
        @click="$router.push('/projects/edit')"
        extra-class="!bg-green-500"
      />
      <CompButton 
        label="Create posts"
        @click="$router.push('/projects/posts')"
        extra-class="!bg-yellow-500"
      />
    </div>
  </div>
  <div v-else>
    <p>Загрузка...</p>
  </div>
</template>
<style scoped lang="scss">
.profile__container {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
  .user__box {
    display: flex;
    gap: 20px;
    .user__name {
      display: flex;
      flex-direction: column;
      align-items: start;
      gap: 10px;
    }
  }
}
</style>
