<template>
    <div class="container py-[70px] sm:py-6">
        <h1 class="text-center sm:text-h5 sm:!text-right">مقالات</h1>
        <BlogCategories />
        <div class="flex relative justify-between sm:flex-wrap">
            <div class="w-[30%] sticky top-2 h-fit sm:w-full sm:relative sm:mb-11">
                <BlogPopularArticles />
            </div>
            <div class="w-[67%] sm:w-full">
                <h5 class="hidden sm:!block text-[20px] font-semibold mb-4">آخرین مقالات</h5>
                <BlogArticleCard :row="isRowCards" v-for="item in [1, 2, 3, 4, 5, 6]" :key="item" class="mb-4" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { useUtilStore } from '~~/stores/util.store';

const utilStore = useUtilStore();

const isRowCards = ref(false);

onMounted(() => {
    if (utilStore.isMobile()) {
        isRowCards.value = true;
    }
})
</script>