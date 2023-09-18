<template>
    <section class="mt-[100px]" v-if="data != null">
        <div class="flex justify-between sm:flex-wrap sm:gap-[26px]">
            <h4 class="section-title">دوره های پرطرفدار</h4>
            <BaseTab :items="[{
                title: 'همه دوره ها',
                value: 'all'
            }, {
                title: 'بازی',
                value: 'game'
            }, {
                title: 'مارکتینگ',
                value: 'marketing'
            },
            {
                title: 'برنامه نویسی',
                value: 'programming'
            },
            {
                title: 'دیزاین',
                value: 'desing'
            }]" />
        </div>
        <div class="course-wrapper mt-9  flex gap-[18px] xl:gap-[15px] md:!gap-3  flex-wrap md:justify-between">
            <CoursesCard class="w-[24%]  lg:!w-[31.6%] " v-for="item in data" :key="item.id" :item="item" />

        </div>
    </section>
</template>
<script setup lang="ts">
import { CourseFilterData } from '~/models/courses/CourseFilterData';

defineProps<{
    data: CourseFilterData[] | null
}>();
</script>