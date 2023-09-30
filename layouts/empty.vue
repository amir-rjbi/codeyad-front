<template>
    <main role="main">
        <slot />
    </main>
</template>
<script setup lang="ts">
onMounted(() => {
    window.scrollTo(0, 0)
});
onUnmounted(()=>{
    window.scrollTo(0, 0)
})
</script>