<script setup>
import { computed } from 'vue';
const props = defineProps({
    label: String,
    type: {
        type: String,
        default: 'button'
    },
    icon: String,
    iconPos: String,
    rounded: Boolean,
    disabled: Boolean,
    extraClass: String,
    style: [String, Object],
})
const computedIconPos = computed(() => {
    if (props.iconPos === 'right') {
        return 'row-reverse'
    } else if (props.iconPos === 'top') {
        return 'column'
    }else if (props.iconPos === 'bottom') {
        return 'column-reverse'
    }else {
        return 'row'
    }
})
const computedRounded = computed(() => {
    return props.rounded ? '999px' : '5px'
})
const computedGap = computed(() => {
    return (props.label && props.icon) ? '8px' : '0'
})
const computedPadding = computed(() => {
    return (props.icon && !props.label) ? '12px 12px' : '8px 12px'
})
</script>
<template>
    <button 
        :style="[style ,{
            flexDirection: computedIconPos,
            borderRadius: computedRounded,
            gap: computedGap,
            padding: computedPadding
        }]" 
        @click="btn" 
        :type="type"
        :disabled="disabled" 
        :class="extraClass"
    >
        <Icon v-if="icon" :name="icon"/>
        <span>
            {{ label }}
            <slot /> 
        </span>
    </button>
</template>
<style scoped lang="scss">
button {
    background-color: #0d6efd;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .3s;
    &:hover {
        opacity: .8;
    }
}
</style>