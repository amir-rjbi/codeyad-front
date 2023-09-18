<template>
    <section class="mt-[100px]" v-if="data != null">
        <div class="flex justify-between sm:flex-wrap gap-[26px]">
            <h4 class="section-title min-w-max">آخرین بروزرسانی دوره ها</h4>
            <BaseTab :items="tabData" @change-tab="getNewCourses" />
        </div>
        <div class="course-wrapper mt-9  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
            <CoursesCard class="w-[24%]  lg:!w-[31.6%] " v-for="item in data" :key="item.id" :item="item" />

        </div>
    </section>
</template>
<script setup lang="ts">
import { CourseFilterData } from '~/models/courses/CourseFilterData';
import { useUtilStore } from '~/stores/util.store';
import { TabData } from '../base/Tab.vue';
import { GetCourseCategories } from '~/services/course.service';

const utilStore = useUtilStore();
const tabData: Ref<TabData[]> = ref([{
    title: 'همه',
    value: 'all'
}]);
const emit = defineEmits(['changeCategory'])
const getNewCourses = (category: string) => {
    if (category != 'all') {
        emit('changeCategory', category)
    } else {
        emit('changeCategory', null)
    }
}
const loading = ref(false);
defineProps<{
    data: CourseFilterData[] | null
}>();

onMounted(async () => {
    if (utilStore.courseCategories.length == 0) {
        loading.value = true;
        var res = await GetCourseCategories();
        if (res.isSuccess) {
            utilStore.courseCategories = res.data ?? [];
            res.data?.slice(0, 5).forEach(f => {
                tabData.value.push({
                    title: f.title,
                    value: f.slug
                })
            })
        }
        loading.value = false;
    } else {
        utilStore.courseCategories.slice(0, 5).forEach(f => {
            tabData.value.push({
                title: f.title,
                value: f.slug
            })
        })
    }

})
</script>