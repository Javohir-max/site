<script setup lang="ts">
import axios from 'axios';
interface ImageItem {
    id: string,
    name: string,
    url: string,
    date: string
}
interface IResponse {
    status: string
    data: ImageItem[]
}
const images = ref<ImageItem[]>([])
const apiUrl = "https://me-backend-qr4x.onrender.com/photos"
const pageLength = ref(1)
const imageSize = ref(10)

const filterImages = computed(() => {
    let max = imageSize.value * pageLength.value
    let min = imageSize.value * (pageLength.value -1)
    return images.value.filter((item, index) => index >= min && index < max )
})
const getImages = async () => {
    try {
        const { status, data } = await $fetch<IResponse>(apiUrl, {
            method: 'GET'
        })
        if (status === 'success') {
            images.value = data
        }
    } catch (error) {
        console.log(error);
    }
}
const download = async (url: string, name: string) => {
    try {
        const response = await fetch(url)
        const blob = await response.blob()
        const downUrl = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = downUrl
        link.download = `${name}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link) 
        URL.revokeObjectURL(downUrl)
    } catch (error) {
        console.log(error)
    } 
}
onMounted(() => {
    getImages()
})
</script>
<template>
    <div>
        <div class="gallery_container">
            <div class="gallery">
                <div v-for="(item, index) in filterImages" :key="index" class="gal_box">
                    <CompImage 
                        :src="item.url" 
                        style="border-radius: 8px; overflow: hidden;"
                        width="290px" 
                        height="290px" 
                        balance 
                        preview
                    />
                    <h2>{{ item.name }}</h2>
                    <CompButton class="btn-grad" label="Скачать" @click="download(item.url, item.name)"/>
                </div>
            </div>
            <div class="pagination">
                <CompPaginator 
                    :totalItems="images.length" 
                    v-model="pageLength"
                    :pageSize="imageSize"
                    query="albumId"
                />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .gallery_container {
        width: 100%;
        padding: 20px 0 0;
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: center;
        .gallery {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 21px;
            .gal_box {
                display: flex;
                flex-direction: column;
                gap: 10px;
                h2 {
                    text-align: center;
                    font-weight: 700;
                    font-size: 18px;
                }
                .btn-grad {
                    background: var(--color-2);
                    background: var(--gradient-1);
                }
            }
        }
    }
</style>