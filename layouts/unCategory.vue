<template>
    <div>
        <TheHeader :show-categories="false" />
        <main role="main">
            <slot />
        </main>
        <TheFooter />
    </div>
</template>
<script setup lang="ts">
onMounted(() => {
    window.scrollTo(0, 0)
});
onUnmounted(()=>{
    window.scrollTo(0, 0)
})
</script>