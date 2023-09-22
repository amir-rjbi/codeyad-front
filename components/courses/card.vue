<template>
    <div class="course-card flex flex-col gap-3">
        <div class="course-banner">
            <base-img width="350px" height="200px" :src="GetCourseImage(item.imageName)" :alt="item.courseTitle" />
        </div>
        <div class="card-content flex gap-3 flex-col w-full">
            <p class="course-title">{{ item.courseTitle }}</p>
            <div class="details items-center flex justify-between">
                <label>سطح
                    <span v-if="item.courseLevel == CourseLevel.beginner">مقدماتی</span>
                    <span v-if="item.courseLevel == CourseLevel.intermediate">از مقدماتی تا پیشرفته</span>
                    <span v-if="item.courseLevel == CourseLevel.expert">پیشرفته</span>
                </label>
                <div class="flex gap-[6px] items-center">
                    <label dir="ltr">{{ item.duration }}</label>
                    <IconsTime width="15" color="var(--color-gray-300)" />
                </div>
                <div class="flex gap-[6px] items-center">
                    <label>{{ item.episodeCount.toLocaleString() }}</label>
                    <IconsBook color="var(--color-gray-300)" />
                </div>
            </div>
            <div class="footer flex justify-between items-center">
                <p v-if="item.totalPrice > 0">{{ item.totalPrice.toLocaleString() }} تومان</p>
                <p class="text-green font-bold" v-else>رایگان</p>
                <BaseButton :render-button-tag="false" size="md" :to="`/course/${item.slug}`">
                    <div class="flex items-center gap-[6px]">
                        شروع دوره
                        <IconsArrowLeft color="#fff" />
                    </div>
                </BaseButton>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { CourseSearchData, CourseLevel } from '~/models/courses/CourseFilterData';

defineProps<{
    item: CourseSearchData
}>();
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .course-card {
        width: 49% !important;
    }
}

@media screen and (max-width:620px) {
    .course-card {
        width: 100% !important;
    }
}

.course-card {
    background: var(--color-white);
    @apply rounded;
    padding: 7.65px;
    padding-bottom: 1rem;
    box-shadow: 0px 3.0602409839630127px 16.066267013549805px 0px rgba(36, 50, 88, 0.11);

    .course-title {
        font-size: 13.77px;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    label {
        font-size: 9.946px;
    }

    img {
        @apply rounded;
        height: 11.47588rem;
        object-fit: cover;
        width: 100%;
    }

    .footer {
        a {
            padding: 7.65px 12.241px !important;
            border-radius: 7.651px;
        }
    }

    a {
        font-size: 10px;
    }
}
</style>