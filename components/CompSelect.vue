<script setup>
const props = defineProps({
    option: {
        type: Array,
        required: true
    },
    width: {
        type: String,
        default: '240px'
    },
    height: {
        type: String,
        default: '45px'
    },
    class: {
        type: String
    },
    placeholder: {
        type: String
    },
    validate: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['value'])
const input = ref("")
const selectStatus = ref(true)
const defBlur = ref(null)
const focus = ref(false)
const itemBtn = (item) => {
    input.value = item.name
    selectStatus.value = true
    emit('value', item)
}
function checkInput() {
    selectStatus.value = !selectStatus.value
    selectStatus.value ? close() : defBlur.value = false, focus.value = false
}
function close() {
    setTimeout(() => {
        if (input.value.length > 0) {
            defBlur.value = null
            focus.value = true
        }else {
            defBlur.value = true
            focus.value = false
        }
        selectStatus.value = true
    },100)
}
</script>
<template>
    <div 
        class="Select" 
        :style="{width: width, height: height}"
    >
        <div class="container_input">
            <button 
                @click="checkInput" 
                @blur="close" 
                :class="{
                    'default_color': input.length < 1, 
                    'validate': defBlur || validate, 
                    'onFocus': defBlur === false, 
                    'offFocus': focus}"
                type="button"
            >
                <h2 
                    :class="props.class"
                >
                    {{ input || placeholder }}
                </h2>
                <Icon 
                    name="material-symbols:keyboard-arrow-down"
                    class="default_color"
                    :class="{'validate': defBlur || validate}"
                    style="font-size: 30px;"
                />
            </button>
        </div>
        <div 
            class="container_items" 
            :style="{top: height}" 
            :class="{'container_items_active': selectStatus}"
        >
            <div class="container_popover">
                <h2 
                    v-for="item in option" 
                    :key="item.length" 
                    class="items" 
                    @mousedown="itemBtn(item)"
                >
                    {{ item.name }}
                </h2>
            </div>
        </div>
    </div>
</template>
<style scoped>
.Select {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
}
.Select .container_input {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center !important;
    position: relative;
}
.Select .container_input button {
    position: relative;
    width: 100%;
    height: 100%;
    outline: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(18, 18, 18);
    border: 1px solid #d1d5db;
    border-radius: 5px;
    padding: 4px 8px;
    background-color: white;
    cursor: pointer;
    box-shadow: inset 0 0 1px gray;
    transition: .3s;
}
.Select .default_color {
    color: #9ca3af !important;
}
.Select button:hover {
    border: 1px solid #9ca3af;
}
.Select .container_items {
    width: 100%;
    max-height: 250px;
    padding: 4px;
    margin: 5px 0 0 0;
    position: absolute;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 5px gray;
    z-index: 1;
    transition: .3s;
}
.Select .container_items_active {
    height: 0;
    padding: 0;
    overflow: hidden;
}
.Select .container_popover {
    width: 100%;
    max-height: 210px;
    border-radius: 8px;
    margin: 4px 0 0;
    padding: 0 4px;
    overflow: auto;
}
.Select .container_popover::-webkit-scrollbar {
    width: 8px;
}
.Select .container_popover::-webkit-scrollbar-thumb {
    background-color: lightgray;
    border-radius: 5px;
}
.Select .items {
    margin: 4px 4px 0 0;
    padding: 8px 4px;
    border-radius: 8px;
    cursor: pointer;
    transition: .5s;
}
.Select .items:hover {
    background: #f3f4f6;
}
.Select .validate {
    border-color: red !important;
    color: rgba(255, 0, 0, 0.5) !important;
}
.Select .onFocus {
    border-color: #00b8d7 !important;
    box-shadow: 0 0 5px #00b8d7 !important;
}
.Select .offFocus {
    border-color: #00b8d7 !important;
}
    
</style>