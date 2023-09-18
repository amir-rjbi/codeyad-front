<template>
    <div>
        <h2 class="text-h5 mb-8 sm:text-h5">محبوب ترین مقالات</h2>
        <template v-if="loading">
            <base-skeleton-loaidng :key="item" v-for="item in [1, 2, 3, 4, 5]" width="100%" height="25px"
                class="bg-white mb-5 p-3 rounded-[12px] pt-4 text-h7" />
        </template>
        <template v-else>
            <nuxt-link :key="index" :to="`/mag/post/${item.slug}`" class="bg-white mb-5 p-3 rounded-[12px] pt-4 text-h7"
                v-for="(item, index) in 
            utilStore.popularArticles">
                {{ item.title }}</nuxt-link>
        </template>
    </div>
</template>
<script setup lang="ts">
import { getPopularArticles } from '~/services/article.service';
import { useUtilStore } from '~/stores/util.store';

useHead({
    script: [
        { src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js' }
    ],
    link: [
        {
            href: '/ckeditor4/ckeditor/plugins/codesnippet/lib/highlight/styles/default.css',
            rel: "stylesheet"
        }
    ]

})
const utilStore = useUtilStore();
const loading = ref(false);
onMounted(async () => {
    if (utilStore.popularArticles.length > 0) {
        return;
    }
    loading.value = true;
    var res = await getPopularArticles();
    utilStore.popularArticles = res.data ?? []
    loading.value = false;
})
</script>