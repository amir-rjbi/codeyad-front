<template>
    <div class="pb-[84px]">
        <div class="course-banner py-[68px] bg-blue sm:py-[48px]">
            <BaseModal size="lg" v-model="isOpenVideoModal" mobile-header :title="selectedVideoTitle"
                header-class="dir-rtl">
                <p v-if="videoLoading" class="text-h5 text-center w-full">لطفا منتظر بمانید...</p>
                <BaseVideoPlayer v-else class="!pb-2" :src="selectedVideo" cover />
            </BaseModal>
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
                                <span dir="ltr">{{ courseData.courseDto.duration }}</span>
                                <IconsTime color="white" />
                            </div>
                            <div class="flex gap-2 items-center sm:w-full ">
                                <nuxt-link :to="`/m/${courseData.courseDto.userId}`" class="hover:text-yellow-200">{{
                                    courseData.courseDto.teacherFullName }} </nuxt-link>
                                <icons-user color="white" />
                            </div>
                        </div>
                        <div class="flex justify-between items-center flex-wrap gap-3">
                            <p class="text-h5 text-green-action font-semibold">قیمت دوره : <label
                                    v-if="courseData.courseDto.price == 0">رایگان</label><label v-else>{{
                                        courseData.courseDto.totalPrice.toLocaleString() }} تومان </label></p>
                            <BaseButton :render-button-tag="false" to="/course/panel-test" class="sm:w-full" color-white>
                                شروع
                                دوره
                                <template #icon>
                                    <IconsArrowLeft color="var(--primary-color)" />
                                </template>
                            </BaseButton>
                        </div>
                    </div>
                    <div @click="showDemo"
                        class="cousrse-banner w-[50%] relative flex justify-center items-center  h-[300px] sm:!w-full cursor-pointer sm:h-[183px]"
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
        <BaseSpyScroll tab-class="sticky top-0 bg-bodyBg z-10 container" v-if="loadAgainTabs == false">
            <template #tabs>
                <div class="tabs sm:overflow-x-auto">
                    <a href="#content" class="active">محتوای دوره</a>
                    <a href="#sections">سرفصل های دوره</a>
                    <a href="#specification">ویژگی های دوره</a>
                    <a href="#comments" v-if="courseData.specialComment.length > 0">نظرات دانشجویان</a>
                    <a href="#questions" v-if="courseData.courseDto.faqs.length > 0">سوالات متداول</a>
                </div>
            </template>
        </BaseSpyScroll>
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
            <CourseLandingSections :data="courseData.courseDto.sections" @select-free-episode="showEpisodeVideo" />
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

            <div id="comments" class="section pt-2" v-if="courseData.specialComment.length > 0">
                <HomeSpecialComments title="نظرات دانشجویان" :data="courseData.specialComment" />
            </div>
            <div class="section container pt-14" id="questions" v-if="courseData.courseDto.faqs.length > 0">
                <h3 class="text-center text-black text-h3 sm:text-h4 font-bold mb-10">سوالات متداول</h3>
                <div class="flex flex-col gap-4">
                    <BaseCollapse bg-white v-for="item in courseData.courseDto.faqs" title-class="text-h5 sm:!text-h6"
                        :title="item.title">
                        <template #icon>
                            <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.4517 16.543C8.82338 16.543 9.15376 16.4191 9.40155 16.1713C9.93842 15.6757 9.93842 14.8085 9.40155 14.3129L3.74376 8.61381L9.40155 2.95602C9.93842 2.46045 9.93842 1.5932 9.40155 1.09763C8.90597 0.560756 8.03872 0.560756 7.54315 1.09763L0.935517 7.70526C0.398646 8.20083 0.398646 9.06808 0.935517 9.56366L7.54315 16.1713C7.79094 16.4191 8.12132 16.543 8.4517 16.543Z"
                                    fill="#080808" />
                            </svg>
                        </template>
                        <p class="text-h6 sm:text-h7 mt-2">{{ item.description }}</p>
                    </BaseCollapse>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { GetCourseLanding } from "@/services/course.service";
import { IApiResponse } from "~/models/IApiResponse";
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
const courseData: Ref<CourseLanding> = ref(data.value!.data!);

const selectedVideoTitle = ref('')
const isOpenVideoModal = ref(false);
const selectedVideo = ref('');
const isShowMore = ref(false);
const videoLoading = ref(false);

const showDemo = () => {
    selectedVideo.value = `${DL_DOMAIN_URL}/videos/Courses/Demo/${courseData.value.courseDto.demoFileName}`
    isOpenVideoModal.value = true;
    selectedVideoTitle.value = 'ویدئو معرفی'
}
const showEpisodeVideo = async (eData: any) => {
    console.log(eData);
    selectedVideoTitle.value = eData.title;
    isOpenVideoModal.value = true;
    videoLoading.value = true;
    var res = await $fetch<IApiResponse<string>>(`${BASE_URL}/course/showOnline?token=${eData.token}&courseId=${courseData.value.courseDto.id}`);
    if (res.isSuccess) {
        if (!res.data) {
            toast.showToast('ویدئو مورد نظر یافت نشد', ToastType.warning);
            isOpenVideoModal.value = false;
        } else {
            selectedVideo.value = res.data;
        }
    }
    videoLoading.value = false;
}
watch(isOpenVideoModal, () => {
    if (isOpenVideoModal.value == false) {
        selectedVideo.value = "";
        selectedVideoTitle.value = "";
    }

})
definePageMeta({
    layout: 'un-category'
});

const loadAgainTabs = ref(false);
watch(isShowMore, () => {
    loadAgainTabs.value = true;

    setTimeout(() => {
        loadAgainTabs.value = false
    }, 1);
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