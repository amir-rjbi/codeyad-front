<template>
    <div class="py-5 ">
        <BaseSeoData :meta="{
            indexPage: true,
            metaTitle: utilStore.siteSettings?.siteTitle,
            metaDescription: utilStore.siteSettings?.metaDescription,
        }" />
        <div class="container">
            <HomeLandingBanner :data="data?.data!" />
            <HomeLinks />
            <div class="flex gap-[100px] flex-col">
                <HomePopularCourses :class="{ 'card-loading': loading }" @change-category="getCourseByCategory"
                    :data="courses ?? []" />
                <section class="description text-center flex flex-col justify-center items-center  ">
                    <h6 class="text-blue text-h2">برنامه نویسی رو از کجا شروع کنم؟</h6>
                    <p class="text-h4 text-center sm:text-[13px] mt-7 sm:mt-4 sm:font-bold ">
                        برنامه‌نویسی ابزاری نوین برای تسلط بر جهان تکنولوژی است. بهترین روش برای فراگیری این علم از پایه و
                        به
                        صورت
                        تخصصی، گذراندن دوره‌های آموزش برنامه نویسی زیر نظر مدرسان کارآزموده است. کدیاد، تیمی متشکل از مدرسان
                        متخصص
                        می‌باشد و هدفشان آموزش صفر تا صد برنامه نویسی به علاقه‌مندان است. در ضمن بسیاری از دوره‌های موجود در
                        کدیاد،
                        رایگان بوده و شما می‌توانید نیمی از مسیر را بدون هیچ هزینه‌ای پیش بروید.
                    </p>
                    <BaseButton class="sm:w-full shadow-sm sm:mt-4 mt-14" :render-button-tag="false" to="/courses">بزن بریم
                    </BaseButton>
                </section>
            </div>
        </div>
        <HomeSpecialComments :data="comments" v-if="comments.length > 0" />
        <HomeArticles :data="data?.data?.latestArticles ?? []" />
    </div>
</template>
<script setup lang="ts">
import { GetCourseByFilter } from "~/services/course.service";
import { HomePageData } from "~/models/HomePageData";
import { IApiResponse } from "~/models/IApiResponse";
import { useUtilStore } from "~/stores/util.store";
import { GetComments } from "~/services/comment.service";
import { Comment, CommentType } from "~/models/comments/Comment";

const utilStore = useUtilStore();
const loading = ref(false);
const { data } = await useAsyncData("singlePage", () => useFetchWithCache<HomePageData>('/home'));
const courses = ref(data.value?.data?.latestCourses);
const comments: Ref<Comment[]> = ref([]);
const getCourseByCategory = async (category: string) => {
    loading.value = true;
    var res = await GetCourseByFilter({
        pageId: 1,
        take: 8,
        categorySlug: category
    });
    courses.value = res.data?.data ?? [];
    loading.value = false;
}
onMounted(async () => {
    var res = await GetComments(2021, CommentType.course, 1, 8);
    if (res.isSuccess) {
        comments.value = res.data?.data ?? [];
    }
})
</script>