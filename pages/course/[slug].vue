<template>
    <div class="pb-[84px]">
        <div class="course-banner py-[68px] bg-blue sm:py-[48px]">
            <div class="container">
                <div class="flex justify-between gap-[60px] sm:flex-col-reverse sm:gap-[40px]">
                    <div class="info w-[50%] text-white flex flex-col gap-[17px] sm:!w-full sm:gap-[12.23px]">
                        <nuxt-link to="/courses" class="category-tag  text-blue bg-secondary rounded-3xl w-fit p-2">
                            {{ courseData.courseDto.subCategory.title }}
                        </nuxt-link>
                        <h1 class=" text-h3 sm:text-h7">{{ courseData.courseDto.courseTitle }}</h1>
                        <p class="text-h8 ">
                            {{ courseData.courseDto.shortDescription }}
                        </p>
                        <div class="flex justify-between gap-2 py-2 flex-wrap sm:gap-4">
                            <div class="flex gap-2 items-center sm:w-full">
                                <span>آخرین بروزرسانی در تاریخ {{ toPersianDate(new Date(courseData.courseDto.lastModify))
                                }}</span>
                                <IconsCalender color="white" />
                            </div>
                            <div class="flex gap-2 items-center sm:w-full">
                                <span>36 ساعت</span>
                                <IconsTime color="white" />
                            </div>
                            <div class="flex gap-2 items-center sm:w-full">
                                <span>{{ courseData.courseDto.studentCount.toLocaleString() }} دانشجو</span>
                                <icons-users color="white" />
                            </div>
                        </div>
                        <div class="flex justify-between items-center flex-wrap gap-3">
                            <p class="text-h5 text-green-action font-semibold">قیمت دوره : <label
                                    v-if="courseData.courseDto.price == 0">رایگان</label><label v-else>{{
                                        courseData.courseDto.price.toLocaleString() }} تومان </label></p>
                            <BaseButton :render-button-tag="false" to="/course/panel-test" class="sm:w-full" color-white>
                                شروع
                                دوره
                                <template #icon>
                                    <IconsArrowLeft color="var(--primary-color)" />
                                </template>
                            </BaseButton>
                        </div>
                    </div>
                    <div class="cousrse-banner w-[50%] relative flex justify-center items-center  h-[300px] sm:!w-full cursor-pointer sm:h-[183px]"
                        v-tooltip="'نمایش ویدئو معرفی'">
                        <div class="absolute play__back">
                            <IconsPlay width="50px" height="50px" color="white" />
                        </div>
                        <base-img alt="courseTitle" class="w-full h-full rounded-[10px]" style="object-fit: fill;"
                            :src="GetCourseImage(courseData.courseDto.imageName)" />
                    </div>
                </div>
            </div>
        </div>
        <BaseSpyScroll tab-class="sticky top-0 bg-bodyBg z-10 container">
            <template #tabs>
                <div class="tabs sm:overflow-x-auto">
                    <a href="#content" class="active">محتوای دوره</a>
                    <a href="#sections">سرفصل های دوره</a>
                    <a href="#specification">ویژگی های دوره</a>
                    <a href="#comments">نظرات دانشجویان</a>
                </div>
            </template>
            <div class="course-content ">
                <div id="content" class="section container mb-[70px] sm:!mb-3 pt-9">
                    <h2 class="text-h5 font-bold dark:text-white mb-4">توضیحات</h2>
                    <div :class="[{ 'close': isShowMore == false }, { 'open': isShowMore }]">
                        <div v-html="courseData.courseDto.description">

                        </div>
                        <a href="#content" name="show-more" @click="isShowMore = !isShowMore">
                            <IconsArrowLeft />
                            <span v-if="isShowMore == false">مشاهده بیشتر</span>
                            <span v-else>مشاهده کمتر</span>
                        </a>
                    </div>

                </div>
                <CourseLandingSections :data="courseData.courseDto.sections" />
                <div id="specification" class="section container pt-14">
                    <h3 class="text-h5 font-bold dark:text-white text-center mb-[50px]">ویژگی های دوره</h3>
                    <div class="flex justify-between sm:flex-wrap sm:gap-9">
                        <div v-for="item in [1, 2, 3]"
                            class="spec-card w-[28%]
                            md:!w-[32%]
                            text-center flex p-[23px] sm:p-[30px] flex-col items-center justify-center gap-5 bg-secondary rounded-[20px]">
                            <div class="flex flex-col gap-3 items-center justify-center ">
                                <IconsCalenderTime color="var(--primary-color)" />
                                <p>معرفی منابع</p>
                            </div>
                            <p>بر اساس منابع مطرح طراحی می شود و این منابع را در اختیار مهارت آموزان خود نیز قرار می دهد</p>
                        </div>

                    </div>
                </div>

                <div id="comments" class="section pt-2">
                    <HomeSpecialComments title="نظرات دانشجویان" :data="courseData.specialComment" />
                </div>
            </div>
        </BaseSpyScroll>

    </div>
</template>
<script setup lang="ts">
import { GetCourseLanding } from "@/services/course.service";
import { CourseLanding } from "~/models/courses/CourseLanding";
const route = useRoute();
const router = useRouter();
const toast = useToast();
const { data, pending } = await useAsyncData("CourseLanding", () => GetCourseLanding(route.params.slug.toString() ?? ''));
if (!data.value?.data) {
    if (process.server) {
        throw createError({ statusCode: 404, message: 'not found' })
    } else {
        router.push('/courses')
        toast.showToast('دوره مورد نظر یافت نشد', ToastType.warning)
    }
}

const isShowMore = ref(false);
const courseData: Ref<CourseLanding> = ref(data.value!.data!);
definePageMeta({
    layout: 'un-category'
})
</script>
<style scoped lang="scss">
@media screen and (max-width:768px) {
    .spec-card {
        width: 100% !important;
    }
}

.tabs {
    display: flex;

    a {
        padding: 17px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        min-width: fit-content;

        &.active {
            border-bottom: 1.7px solid var(--primary-color);
            color: var(--primary-color);
        }
    }
}

.course-content {
    p {
        color: var(--color-gray-400);
    }
}

.play__back {
    background: rgba(0, 0, 0, 0.658);
    border-radius: 50%;
}

.close {
    height: 300px;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::after {
        position: absolute;
        bottom: 0;
        background: linear-gradient(#eef3f9a2, #EEF3F9);
        width: 100%;
        height: 100px;
        content: " ";
        right: 0;
    }
}

.open {
    position: relative;

    a[name=show-more] {
        bottom: -2rem;

        &:hover {
            bottom: -1.9rem !important;
        }

        svg {
            rotate: 90deg;
        }
    }
}

a[name=show-more] {
    position: absolute;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 1rem;
    transition: all ease .2s;

    svg {
        rotate: -90deg;
    }

    &:hover {
        bottom: 1.9rem;

    }

    font-size: var(--h7-font-size);
    background: white;
    padding: .5rem;
    border-radius: 10px;
    @apply shadow-xl;
    bottom: 2rem;
    z-index: 2;
    left: 50%;
    transform: translate(-50%, 0);
    cursor: pointer;
}
</style>