<template>
    <div class="py-5 ">

        <Head>
            <Title>جستجو میان همه دوره های سایت</Title>
        </Head>
        <div :class="['container', { 'card-loading': loading || pending }]">
            <BaseTab v-model="categorySlug" :items="tabData" @change-tab="getNewCourses" />

            <div class="course-wrapper mt-4  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
                <CoursesCard class="w-[24%]  lg:!w-[31.6%] " v-for="item in courses" :key="item.slug" :item="item" />
                <template v-if="pending">
                    <BaseSkeletonLoaidng parentClass="w-[24%]" height="280px" width="100%" class="  lg:!w-[31.6%] "
                        v-for="item in [1, 2, 3, 4]" :key="item" />
                </template>
            </div>

            <div class="flex justify-center mt-5" v-if="(data?.data?.pageCount ?? 1) > pageId">
                <BaseButton class="sm:w-10/12" :loading="pending" @click="pageId += 1">مشاهده بیشتر ...</BaseButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { TabData } from '~/components/base/Tab.vue';
import { CourseFilterBy, CourseSearchData } from '~/models/courses/CourseFilterData';
import { GetCourseByFilter, GetCourseCategories } from '~/services/course.service';
import { useUtilStore } from '~/stores/util.store';

const route = useRoute();
const pageId = ref(1);
const search = ref(route.query.q?.toString());
const categorySlug = ref(route.params.slug[0]);
const filterBy = ref(route.query.filter?.toString());
const favoriteCategory = ref(route.query.favorite?.toString());

const utilStore = useUtilStore();
const loading = ref(false);
const tabData: Ref<TabData[]> = ref([{
    title: 'همه دوره ها',
    value: 'all'
}]);
const router = useRouter();
const { data, pending, refresh } = await useAsyncData('courses', () => GetCourseByFilter({
    pageId: pageId.value,
    take: 12,
    search: search.value,
    categorySlug: categorySlug.value,
    filterBy: (filterBy.value as CourseFilterBy),
    //@ts-ignore
    favoriteCategories: (favoriteCategory.value) ?? null
}));
const courses: Ref<CourseSearchData[]> = ref(data.value?.data?.data ?? []);


const getNewCourses = async (value: string) => {
    courses.value = []
    if (value == 'all') {
        await router.push('/courses');
    } else {
        await router.push('/courses/' + value)
    }
}
watch(data, (val) => {
    val?.data?.data?.forEach(f => {
        courses.value.push(f)
    })
});
watch(pageId, (val) => {
    if (val > 1)
        refresh();
})

onMounted(async () => {
    if (utilStore.courseCategories.length == 0) {
        loading.value = true;
        var res = await GetCourseCategories();
        if (res.isSuccess) {
            utilStore.courseCategories = res.data ?? [];
            res.data?.slice(0, 8).forEach(f => {
                tabData.value.push({
                    title: f.title,
                    value: f.slug
                })
            })
        }
        loading.value = false;
    } else {
        utilStore.courseCategories.slice(0, 8).forEach(f => {
            tabData.value.push({
                title: f.title,
                value: f.slug
            })
        })
    }

})
</script>