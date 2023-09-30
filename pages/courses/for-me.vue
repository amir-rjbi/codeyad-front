<template>
    <div class="sm:mt-6">

        <Head>
            <Title>دوره ها</Title>
            <Meta content="noindex , nofollow" name="robots" />
        </Head>
        <div :class="['nav-tabs flex justify-center  sm:justify-between sm:!gap-8 sm:hidden', { 'card-loading': pending }]">
            <button name="all" :class="{ active: selected == undefined }" @click="selected = undefined">دوره
                ها</button>
            <button name="inProgress" :class="{ active: selected == CourseProgressStatus.inProgress }"
                @click="selected = CourseProgressStatus.inProgress">درحال
                برگزاری</button>
            <button name="completed" :class="{ active: selected == CourseProgressStatus.completed }"
                @click="selected = CourseProgressStatus.completed">تکمیل
                شده</button>
        </div>
        <div class="container mb-8">
            <BaseSkeletonLoaidng height="250px" v-if="pending" />
            <div v-else-if="(data?.data?.data?.length ?? 0) > 0">
                <div class="flex justify-between">
                    <h3 class="text-h4 font-bold mb-8">آخرین بروزرسانی ها</h3>
                    <BaseButton size="sm" :render-button-tag="false" to="/courses" class="hidden sm:flex" outline>همه رو
                        ببین</BaseButton>
                </div>
                <CoursesSlider :courses="data!.data!.data!" />
            </div>
            <BaseSkeletonLoaidng class="mt-8" height="250px" v-if="byCategoryPending" />
            <div class="mt-8" v-else-if="(byCategory?.data?.data?.length ?? 0) > 0">
                <div class="flex justify-between ">
                    <h3 class="text-h4 font-bold mb-8">دوره های شخصی سازی شده شما</h3>
                    <BaseButton size="sm" :render-button-tag="false" to="/courses?favorite=true" class="hidden sm:flex"
                        outline>همه رو
                        ببین</BaseButton>
                </div>
                <CoursesSlider :courses="byCategory!.data!.data!" />
            </div>
            <BaseSkeletonLoaidng class="mt-8" height="250px" v-if="popularPending" />
            <div class="mt-8" v-else-if="(popular?.data?.data?.length ?? 0) > 0">
                <div class="flex justify-between items-center">
                    <h3 class="text-h4 font-bold mb-8">پیشنهاد کدیاد</h3>
                    <BaseButton size="sm" :render-button-tag="false" to="/courses?orderBy=popular" class="hidden sm:flex"
                        outline>همه رو
                        ببین</BaseButton>
                </div>
                <CoursesSlider :courses="OrderBy(popular!.data!.data!, 'episodeCount', 'desc')" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CourseFilterBy, CourseOrderBy, CourseProgressStatus } from '~/models/courses/CourseFilterData';
import { GetCourseByFilter } from '~/services/course.service';
import OrderBy from "lodash/orderBy";

const selected: Ref<CourseProgressStatus | undefined> = ref(undefined);

const { data, pending,refresh } = useAsyncData("latest-courses", () => GetCourseByFilter({
    take: 8,
    pageId: 1,
    favoriteCategories: false,
    orderBy: CourseOrderBy.latest,
    filterBy: CourseFilterBy.all,
    progressStatus: selected.value

}))
const { data: byCategory, pending: byCategoryPending, refresh: byCategoryRefresh } = useAsyncData("favorite-courses", () => GetCourseByFilter({
    take: 8,
    pageId: 1,
    favoriteCategories: true,
    orderBy: CourseOrderBy.visit,
    filterBy: CourseFilterBy.all,
    progressStatus: selected.value

}))
const { data: popular, pending: popularPending, refresh: popRefresh } = useAsyncData("pop-courses", () => GetCourseByFilter({
    take: 8,
    pageId: 1,
    favoriteCategories: false,
    orderBy: CourseOrderBy.popular,
    filterBy: CourseFilterBy.notFreeCourse,
    progressStatus: selected.value
}))


watch(selected, (val) => {
    popRefresh();
    refresh();
    byCategoryRefresh();
})
</script>
<style scoped lang="scss">
@media screen and (max-width: 768px) {
    h3 {
        font-size: 20px;
    }

    .mt-8 {
        margin-top: 56px;
    }

    a {
        min-width: fit-content;
    }
}
</style>