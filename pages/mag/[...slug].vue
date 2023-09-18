<template>
    <div class="container py-[70px] sm:py-6">
        <h1 class="text-center sm:text-h5 sm:!text-right">مقالات</h1>
        <BlogCategories @change-category="ChangeCategory" :selected-category="category" />
        <div class="flex relative justify-between sm:flex-wrap">
            <div class="w-[30%] sticky top-2 h-fit sm:w-full sm:relative sm:mb-11">
                <BlogPopularArticles />
            </div>
            <div class="w-[67%] sm:w-full">
                <h5 class="hidden sm:!block text-[20px] font-semibold mb-4">آخرین مقالات</h5>
                <BlogArticleCard :row="isRowCards" v-for="item in articles" :key="item.id" :item="item" class="mb-4" />
                <div v-if="pending">
                    <BaseSkeletonLoaidng class="mb-2" height="300px" v-for="item in [1, 2]" />
                </div>
                <div class="flex justify-center" v-if="(data?.data?.pageCount ?? 1) > pageId">
                    <BaseButton class="sm:w-10/12" :loading="pending" @click="pageId += 1">مشاهده بیشتر ...</BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { GetArticleByFilter } from '~/services/article.service';
import { useUtilStore } from '~~/stores/util.store';

const route = useRoute();
const utilStore = useUtilStore();
const isRowCards = ref(false);
const pageId = ref(1);
const router = useRouter();
const category = ref(route.query.cTitle?.toString());
const { data, refresh, pending } = await useAsyncData('articles', () => GetArticleByFilter(pageId.value, 10, category.value));
const articles = ref(data.value.data?.articleDtos ?? []);
onMounted(() => {
    if (utilStore.isMobile()) {
        isRowCards.value = true;
    }
});
watch(data, (val) => {
    val?.data?.articleDtos?.forEach(element => {
        articles.value.push(element)
    });
})
watch(pageId, () => {
    refresh()
})
const ChangeCategory = (categorySlug) => {
    articles.value = [];
    if(categorySlug==null){
        router.push('/mag')
    }else{
        router.push('/mag/category?cTitle=' + categorySlug)
    }
    category.value=categorySlug;
    refresh();
}
</script>