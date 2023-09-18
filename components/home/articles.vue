<template>
    <section class="latest-articles container py-[100px] sm:py-[50px]" v-if="data.length > 0">
        <p class="text-22 font-bold sm:">آخرین مقالات</p>
        <div class="mt-[30px] flex gap-8 flex-wrap lg:gap-4 sm:!flex-col-reverse">
            <div class="w-[48%] flex gap-4  flex-col lg:w-[52%] md:!w-[100%]">
                <BlogArticleCard row :item="data[0]" />
                <BlogArticleCard row :item="data[1]" />
            </div>
            <div class="w-[48%] lg:w-[46%] md:!w-[100%]">
                <BlogArticleCard :item="data[2]" />
            </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { Article, ArticleFilterResult } from '~/models/articles/Article';

defineProps<{
    data: Article[]
}>();

</script>
<style scoped lang="scss"></style>