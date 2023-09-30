<template>
    <div class="container py-12">
        <Head>
            <Title>درباره ما</Title>
        </Head>
        <h1 class="text-h3">درباره ما</h1>
        <hr class="my-5" />

        <BaseSkeletonLoaidng type="three-line" v-if="pending" />
        <div v-html="data?.data?.body" v-else></div>
    </div>
</template>
<script setup lang="ts">
const { data, pending } = useAsyncData("about", () => useFetchWithCache<{ body: string }>("/siteSettings/about-us"));
</script>