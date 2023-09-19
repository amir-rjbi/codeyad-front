<template>
    <div class="py-5 ">
        <div :class="['container', { 'card-loading': loading || pending }]">
            <BaseTab v-model="categorySlug" :items="tabData" @change-tab="getNewCourses" />
            <div class="course-wrapper mt-4  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
                <CoursesCard class="w-[24%]  lg:!w-[31.6%] " v-for="item in courses" :key="item.id" :item="item" />
            </div>
            <div class="flex justify-center mt-5" v-if="(data?.data?.pageCount ?? 1) > pageId">
                <BaseButton class="sm:w-10/12" :loading="pending" @click="pageId += 1">مشاهده بیشتر ...</BaseButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { TabData } from '~/components/base/Tab.vue';
import { CourseFilterBy } from '~/models/courses/CourseFilterData';
import { GetCourseByFilter, GetCourseCategories } from '~/services/course.service';
import { useUtilStore } from '~/stores/util.store';

const route = useRoute();
const pageId = ref(1);
const search = ref(route.query.q?.toString());
const categorySlug = ref(route.params.slug[0]);
const filterBy = ref(route.query.filter?.toString());
const utilStore = useUtilStore();
const loading = ref(false);
const tabData: Ref<TabData[]> = ref([{
    title: 'همه دوره ها',
    value: 'all'
}]);
const router = useRouter();

const { data, pending, refresh } = useAsyncData('courses', () => GetCourseByFilter({
    pageId: pageId.value,
    take: 12,
    search: search.value,
    categorySlug: categorySlug.value,
    filterBy: (filterBy.value as CourseFilterBy)
}));
const courses = ref(data.value?.data?.data ?? []);


const getNewCourses = (value: string) => {
    console.log(value)
    if (value == 'all') {
        router.push('/courses');
    } else {
        router.push('/courses/' + value)
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
watch(() => route.query, (val) => {
    search.value = val.q?.toString();
    filterBy.value = val.filter?.toString();
    pageId.value = 1;
    courses.value = []
    refresh();
});

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