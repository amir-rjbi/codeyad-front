<template>
    <nuxt-img :src="src" :alt="alt" placeholder/>
</template>
<script setup lang="ts">
defineProps<{
    src: string,
    alt: string
}>();
</script>