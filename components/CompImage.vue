<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    src: {
        type: String,
        required: true,
    },
    class: {
        type: String
    },
    style: {
        type: [String, Object]
    },
    width: {
        type: String
    },
    height: {
        type: String
    },
    preview: {
        type: Boolean
    },
    balance: {
        type: Boolean
    }
});
const zoomImage = ref(true)
const imgRotate = ref(0)
const imgWidth = ref(0.9)
const showImageStyle = computed(() => ({
    transform: `rotate(${imgRotate.value}deg) scale(${imgWidth.value})`
}))
const computedWidth = computed(() => props.width);
const computedHeight = computed(() => props.height);
const computedClass = computed(() => {
    return props.preview ? `image-container ${props.class}` : props.class
});
const imgRotateDec = () => { 
    imgRotate.value -= 90 
}
const imgRotateInc = () => { 
    imgRotate.value += 90 
}
const imgIncrement = () => {
    if (imgWidth.value < 1.5) {
        imgWidth.value += 0.1
    }
}
const imgDecrement = () => {
    if (imgWidth.value > 0.6) {
        imgWidth.value -= 0.1
    }
}
const hide = () => {
    zoomImage.value = true
    imgWidth.value = 0
    setTimeout(() => {
        imgRotate.value = 0
        imgWidth.value = 0.9
    }, 300);
}
const buttons = ref([
    {click: imgRotateDec, icon: 'material-symbols:rotate-left-rounded', w: '25', h: '25'},
    {click: imgRotateInc, icon: 'material-symbols:rotate-right-rounded', w: '25', h: '25'},
    {click: imgDecrement, icon: 'iconamoon:zoom-out', w: '30', h: '30'},
    {click: imgIncrement, icon: 'iconamoon:zoom-in', w: '30', h: '30'},
    {click: hide, icon: 'line-md:menu-to-close-transition', w: '30', h: '30'}
])
</script>
<template>
    <div 
        :style="[
            style, 
            {width: computedWidth, height: computedHeight}
        ]" 
        :class="computedClass" 
        @click="zoomImage = !preview"
    >
        <img 
            :src="src" 
            alt="Image" 
            :style="{width: computedWidth,height: computedHeight}" 
            :class="{'img_default': !preview, 'balance': balance}"
        >
    </div>
    <div 
        class="img_preview_container" 
        :class="{
            'img_preview_container_active': zoomImage, 
            'img_preview_container_none': !preview}"
        >
        <div class="container_buttons">
            <button 
                type="button" 
                v-for="item in buttons" 
                :key="item.length" 
                class="btn" 
                @click="item.click()"
            >
                <Icon 
                    class="button_icon" 
                    :name="item.icon"
                />
            </button>
        </div>
        <img 
            :src="src" 
            alt="Image" 
            :style="showImageStyle" 
            class="zoom_image"
        >
    </div>
</template>
<style scoped>
.image-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}
.img_default {
    display: block;
    width: 100%;
}
.image-container img {
    display: block;
    width: 100%;
}
.image-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0);
    transition: background-color 0.3s ease;
}
.image-container:hover::before {
    background-color: rgba(0, 0, 0, 0.3);
}
.image-container::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 30px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'%3E%3Cpath fill='white' d='M12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3s3-1.358 3-3s-1.359-3-3-3'/%3E%3Cpath fill='white' d='M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316l-.105-.316C21.927 11.617 19.633 5 12 5m0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5c-.504 1.158-2.578 5-7.926 5'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s ease;
}
.image-container:hover::after {
    opacity: 1;
}
.img_preview_container {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0;
    background: #00000050;
    z-index: 100;
    opacity: 1;
    transition: .3s;
}
.img_preview_container_active {
    opacity: 0;
    z-index: -100 !important;
}
.img_preview_container_none {
    display: none;
}

.container_buttons {
    display: flex; 
    gap: 10px;
    padding: 12px 20px;
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 10;
    border: 1px solid white;
    background: #ffffff90;
    border-radius: 9999px;
    backdrop-filter: blur(4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.btn {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    transition: .3s;
}
.btn:hover {
    background: #ffffff50;
}
.button_icon {
    filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
    color: white;
}
.zoom_image {
    height: 100%;
    transition: .3s;
}
.balance {
    object-fit: cover;
}
@media screen and (max-width: 426px) {
    .zoom_image {
        height: auto;
    }
}

</style>