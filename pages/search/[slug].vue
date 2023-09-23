<template>
    <div class="py-5 ">
        <Head>
            <Title>جستجو میان همه اطلاعات سایت</Title>
        </Head>
        <div class="container">
            <p class="text-h5">جستجو برای '{{ searchTitle }}'</p>
            <hr class="my-3" />
            <div v-if="loading == false">
                <BaseTab @changeTab="(item) => selectedTab = item" :items="[{
                    title: 'دوره ها ' + `- ${data?.courses.length ?? 0}`,
                    value: 'course'
                },
                {
                    title: 'مقالات ' + `- ${data?.articles.length ?? 0}`,
                    value: 'articles'
                }]" />
            </div>
            <div v-else class="flex gap-3">
                <BaseSkeletonLoaidng width="90px" height="32px" />
                <BaseSkeletonLoaidng width="90px" height="32px" />
            </div>
            <div v-show="selectedTab == 'course'"
                class="course-wrapper mt-4  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
                <CoursesCard class="w-[24%]  lg:!w-[31.6%] " v-for="item in data?.courses" :key="item.slug" :item="item" />
                <template v-if="loading">
                    <BaseSkeletonLoaidng parentClass="w-[24%]" height="280px" width="100%" class="  lg:!w-[31.6%] "
                        v-for="item in [1, 2, 3, 4]" :key="item" />
                </template>
            </div>
            <div v-show="selectedTab == 'articles'">
                <BlogArticleCard :row="true" v-for="item in data?.articles" :key="item.id" :item="item" class="mb-4" />
                <div v-if="loading">
                    <BaseSkeletonLoaidng class="mb-2" height="300px" v-for="item in [1, 2]" />
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import { SearchFilterResult } from '~/models/SearchFilterResult';
import { SearchAll } from '~/services/search.service';

const route = useRoute();
const loading = ref(true);
const data: Ref<SearchFilterResult | null> = ref(null);
var searchTitle = route.params.slug.toString();
const selectedTab = ref('course');
onMounted(async () => {
    var res = await SearchAll(searchTitle);
    if (res.isSuccess)
        data.value = res.data ?? null
    loading.value = false;
});
</script>
