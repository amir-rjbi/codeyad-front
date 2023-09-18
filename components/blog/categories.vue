<template>
    <BaseTab v-model="selectedCategory" class="my-10 justify-between  gap-4 sm:mt-4" @change-tab="getNewArticles"
        :items="tabData" />
</template>
<script setup lang="ts">
import { useUtilStore } from '~/stores/util.store';
import { TabData } from '../base/Tab.vue';
import { GetArticleCategories } from '~/services/article.service';

const utilStore = useUtilStore();
const loading = ref(false);
const tabData: Ref<TabData[]> = ref([{
    title: 'همه',
    value: 'all'
}]);
const props = defineProps({
    selectedCategory: {
        type: String,
        default: 'all'
    }
})
const selectedCategory = ref(props.selectedCategory);
const emit = defineEmits(['changeCategory'])
const getNewArticles = (category: string) => {
    if (category != 'all') {
        emit('changeCategory', category)
    } else {
        emit('changeCategory', null)
    }
}


onMounted(async () => {
    if (utilStore.articleCategories.length == 0) {
        loading.value = true;
        var res = await GetArticleCategories();
        if (res.isSuccess) {
            utilStore.articleCategories = res.data ?? [];
            res.data?.slice(0, 6).forEach(f => {
                tabData.value.push({
                    title: f.categoryTitle,
                    value: f.slug
                })
            })
        }
        loading.value = false;
    } else {
        utilStore.articleCategories.slice(0, 6).forEach(f => {
            tabData.value.push({
                title: f.categoryTitle,
                value: f.slug
            })
        })
    }

})
</script>