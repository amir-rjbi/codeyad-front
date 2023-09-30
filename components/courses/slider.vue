<template>
    <BaseCarousel :space-between="18" :autoplay="{
        delay: 4000,
        pauseOnMouseEnter: true
    }" :breakpoints="breakpoints" :items="courses" :modules="[SwiperAutoplay]">
        <template #item="{ item }">
            <CoursesCard :item="item" class="w-full"/>
        </template>
    </BaseCarousel>
</template>
<script setup lang="ts">
import { CourseSearchData } from '~/models/courses/CourseFilterData';

defineProps<{
    courses: CourseSearchData[]
}>();

const breakpoints = ref({
    1200: {
        slidesPerView: 4.1,
    },
    1090: {
        slidesPerView: 3.5,
    },
    768: {
        slidesPerView: 2,
    },
    576: {
        slidesPerView: 1.7,
    },
    480: {
        slidesPerView: 1.5,
    },
    0: {
        slidesPerView: 1,
    },
});
</script>