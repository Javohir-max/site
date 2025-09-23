<script setup>
import AddImage from '../../assets/images/add-image.jpg'
const { user, getProfile, updateUser} = useAuth()
const createImage = ref(null)
const newData = ref({
    name: null,
    email: null,
    avatar: null,
    password: null
})

const handleImage = (e) => {
    const file = e.target.files[0]
    newData.value.avatar = file
    const reader = new FileReader()
    reader.onload = (event) => {
        createImage.value = event.target.result
    }
    reader.readAsDataURL(file)
}

const handleSubmit = async () => {
    const data = new FormData()
    Object.keys(newData.value).forEach((key) => {
        if (newData.value[key]) {
            data.append(key, newData.value[key])
        }
    })
    const res = await updateUser(data)
    alert(res ? 'Профил обновлен' : 'Ошибка при обновлении профиля')
    newData.value.name = user.value.name
    newData.value.email = user.value.email
    newData.value.avatar = null
    createImage.value = null
    navigateTo('/projects/profile')
}

onMounted(async () => {
    const res = await getProfile()
    if (!res) {
        alert("Вы не зареистрированы или не вошли в аккаунт")
        navigateTo("/projects/auth")
    }
    if (user.value) {
        newData.value.name = user.value.name
        newData.value.email = user.value.email
    }
})
</script>
<template>
    <div class="edit">
        <form @submit.prevent="handleSubmit">
            <div class="avatars">
                <div class="img">
                    <CompImage 
                        v-if="user" 
                        :src="user.avatar || AddImage" 
                        width="180px" 
                        height="180px" 
                        balance 
                        preview
                    />
                    <span>=></span>
                    <CompImage 
                        :src="createImage || AddImage" 
                        width="180px" 
                        height="180px" 
                        balance 
                        preview
                    />
                </div>
                <input type="file" hidden id="file" @change="handleImage"/>
                <label for="file">New Avatar</label>
            </div>
            <input type="text" v-model="newData.name" placeholder="New Name" name="newName"/>
            <input type="email" v-model="newData.email" placeholder="New Email" name="newEmail"/>
            <input type="password" v-model="newData.password" placeholder="New Password" name="newPassword"/>
            <CompButton 
                label="Save Changes"
                type="submit"
            />
        </form>
    </div>
</template>
<style scoped lang="scss">
    form {
        width: 400px;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        .avatars {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            .img {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                gap: 10px;
                span {
                    font-size: 24px;
                    color: var(--color-2);
                }
            }
            label {
                padding: 8px 16px;
                background: var(--color-2);
                color: white;
                border-radius: 8px;
                cursor: pointer;
                transition: 0.3s;
                &:hover {
                    background: var(--color-2);
                }
            }
        }
        input {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--color-2);
            border-radius: 8px;
            outline: none;
            font-size: 16px;
            transition: .3s;
            &::placeholder {
                color: var(--color-2);
            }
            &:focus {
                border-color: var(--color-3);
            }
        }
    }
</style>