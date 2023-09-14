<template>
    <slot />
</template>

<script setup lang="ts">

const props = defineProps({
    callBackFunction: {
        type: Function,
    }
})

onMounted(()=>{

});
onUnmounted(()=>{
    
})
</script>